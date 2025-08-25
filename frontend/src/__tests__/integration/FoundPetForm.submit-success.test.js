import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoundPetForm from '../../components/FoundPetForm';

jest.mock('axios', () => ({ post: jest.fn() }));

// Mock liviano de MapView y FilePreview
jest.mock('../../components/MapView', () => ({
  __esModule: true,
  default: ({ setFormData }) => {
    // Simula seteo de lat/long desde el mapa
    setTimeout(
      () => setFormData((prev) => ({ ...prev, latitude: '-2.17', longitude: '-79.90' })),
      0,
    );
    return <div data-testid="mock-mapview">MapView</div>;
  },
}));

jest.mock('../../components/FilePreview', () => ({
  __esModule: true,
  default: ({ files }) => <div data-testid="mock-filepreview">Files: {files?.length ?? 0}</div>,
}));

const axios = require('axios');

describe('FoundPetForm – submit exitoso', () => {
  beforeEach(() => {
    // UUID anónimo simulado
    localStorage.setItem('anonymousPostUUID', 'dev-uuid-123');

    // Hacer location.href asignable
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('envía, muestra éxito y redirige', async () => {
    axios.post.mockResolvedValueOnce({
      data: { data: { _id: 'FOUND999' } },
    });

    render(<FoundPetForm />);

    // Campos mínimos requeridos
    fireEvent.change(screen.getByLabelText(/Título/i), {
      target: { value: 'Encontré a un perrito' },
    });
    fireEvent.change(screen.getByLabelText(/^Nombre$/i), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '0998887777' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'ana@ex.com' },
    });

    // Subir archivo al input #media
    const fileInput = document.getElementById('media');
    const file = new File([new Uint8Array([1, 2, 3])], 'hallado.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Enviar
    const submitBtn = screen.getByRole('button', { name: /Publicar/i });
    fireEvent.click(submitBtn);

    // Deshabilitado mientras envía
    expect(submitBtn).toBeDisabled();

    // axios.post llamado una vez
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    const [url, body, config] = axios.post.mock.calls[0];
    expect(url).toBe('https://espawfinder.com/backend/upload');
    expect(config.headers['Content-Type']).toMatch(/multipart\/form-data/i);

    // Verifica algunos campos del FormData
    // (jsdom permite .get() / .getAll() en FormData en tests)
    expect(body.get('status')).toBe('found');
    expect(body.get('title')).toBe('Encontré a un perrito');
    expect(body.get('deviceId')).toBe('dev-uuid-123');
    const files = body.getAll('files');
    expect(files.length).toBe(1);
    expect(files[0].name).toBe('hallado.png');

    // Feedback de éxito
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /¡Publicado con éxito!/i })).toBeInTheDocument();
    });

    // Avanza timers del setTimeout(2000)
    jest.runAllTimers();

    // Redirección correcta
    expect(window.location.href).toBe('/publicacion/FOUND999');
  });
});
