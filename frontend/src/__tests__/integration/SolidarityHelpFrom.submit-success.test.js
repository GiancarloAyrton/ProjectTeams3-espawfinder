import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SolidarityHelpForm from '../../components/SolidarityHelpForm';

jest.mock('axios', () => ({ post: jest.fn() }));

// Mock liviano para evitar dependencias pesadas (Leaflet, previews)
jest.mock('../../components/MapView', () => ({
  __esModule: true,
  default: ({ setFormData }) => {
    // Simula que el mapa setea lat/long
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

describe('SolidarityHelpForm – submit exitoso', () => {
  beforeEach(() => {
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

  it('envía el formulario, muestra éxito y redirige', async () => {
    axios.post.mockResolvedValueOnce({
      data: { data: { _id: 'HELP321' } },
    });

    render(<SolidarityHelpForm />);

    // Campos mínimos requeridos
    fireEvent.change(screen.getByLabelText(/Título/i), {
      target: { value: 'Ayuda solidaria para cirugía' },
    });
    fireEvent.change(screen.getByLabelText(/^Nombre$/i), { target: { value: 'María' } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '0981112222' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'maria@ex.com' },
    });

    // Subir archivo en #media
    const fileInput = document.getElementById('media');
    const file = new File([new Uint8Array([1, 2, 3])], 'comprobante.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Enviar
    const submitBtn = screen.getByRole('button', { name: /Publicar/i });
    fireEvent.click(submitBtn);

    // Deshabilitado mientras envía
    expect(submitBtn).toBeDisabled();

    // axios.post llamado correctamente
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    const [url, body, config] = axios.post.mock.calls[0];
    expect(url).toBe('https://espawfinder.com/backend/upload');
    expect(config.headers['Content-Type']).toMatch(/multipart\/form-data/i);

    // FormData esperado
    expect(body.get('status')).toBe('solidarityHelp');
    expect(body.get('title')).toBe('Ayuda solidaria para cirugía');
    expect(body.get('deviceId')).toBe('dev-uuid-123');

    const files = body.getAll('files');
    expect(files.length).toBe(1);
    expect(files[0].name).toBe('comprobante.png');

    // Feedback de éxito
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /¡Publicado con éxito!/i })).toBeInTheDocument();
    });

    // Avanza timers del setTimeout(2000)
    jest.runAllTimers();

    // Redirección correcta
    expect(window.location.href).toBe('/publicacion/HELP321');
  });
});
