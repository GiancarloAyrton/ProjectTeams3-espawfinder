import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
// ❗ Ajusta la ruta si tu archivo está en otra carpeta
// @ts-ignore
import LookingForMateForm from '../../components/LookingForMateForm.js';

jest.mock('axios', () => ({ post: jest.fn() }));

// Mock de MapView y FilePreview para evitar dependencias pesadas (Leaflet, etc.)
jest.mock('../../components/MapView', () => ({
  __esModule: true,
  default: ({ setFormData }: any) => {
    // Simula que el mapa setea lat/long
    setTimeout(
      () => setFormData((prev: any) => ({ ...prev, latitude: '-2.17', longitude: '-79.90' })),
      0,
    );
    return <div data-testid="mock-mapview">MapView</div>;
  },
}));
jest.mock('../../components/FilePreview', () => ({
  __esModule: true,
  default: ({ files }: any) => (
    <div data-testid="mock-filepreview">Files: {files?.length ?? 0}</div>
  ),
}));

const axios = require('axios');

describe('LookingForMateForm – submit exitoso', () => {
  beforeEach(() => {
    localStorage.setItem('anonymousPostUUID', 'dev-uuid-123');

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
    // Respuesta fake del backend
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { data: { _id: 'MATE123' } },
    });

    render(<LookingForMateForm />);

    fireEvent.change(screen.getByLabelText(/Título/i), {
      target: { value: 'Busco pareja para Rocky' },
    });
    fireEvent.change(screen.getByLabelText(/^Nombre$/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '0999999999' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'a@a.com' },
    });

    // Subir 1 archivo (dummy con Uint8Array para Jest)
    if (await screen.findByLabelText(/Cargar imágenes o videos/i).catch(() => null)) {
      // Si el label funciona para abrir, de todas formas setea por input directo:
    }
    const fileInput = document.getElementById('media') as HTMLInputElement;
    const file = new File([new Uint8Array([1, 2, 3])], 'foto.png', { type: 'image/png' });
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

    const [url, body, config] = (axios.post as jest.Mock).mock.calls[0];
    // URL esperada (tu componente usa sin slash final)
    expect(url).toBe('https://espawfinder.com/backend/upload');
    // Headers multipart
    expect(config.headers['Content-Type']).toMatch(/multipart\/form-data/i);

    // Podemos inspeccionar algunos campos del FormData
    // @ts-ignore: FormData en jsdom permite get()
    expect(body.get('status')).toBe('lookingForMate');
    // @ts-ignore
    expect(body.get('title')).toBe('Busco pareja para Rocky');
    // @ts-ignore
    expect(body.get('deviceId')).toBe('dev-uuid-123');
    // @ts-ignore
    const files = body.getAll('files') as File[];
    expect(files.length).toBe(1);
    expect(files[0].name).toBe('foto.png');

    // Muestra éxito
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /¡Publicado con éxito!/i })).toBeInTheDocument();
    });

    // Avanza timers del setTimeout(2000)
    jest.runAllTimers();

    // Redirección correcta
    expect(window.location.href).toBe('/publicacion/MATE123');
  });
});
