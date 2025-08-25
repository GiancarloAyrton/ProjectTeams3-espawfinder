import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LostPetForm from '../../components/LostPetForm';

jest.mock('axios', () => ({ post: jest.fn() }));
jest.mock('../../components/MapView', () => ({
  __esModule: true,
  default: ({ setFormData }) => {
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

describe('LostPetForm – submit con error backend', () => {
  beforeEach(() => {
    localStorage.setItem('anonymousPostUUID', 'dev-uuid-123');
    Object.defineProperty(window, 'location', { value: { href: '' }, writable: true });
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('no redirige, re-habilita el botón y loguea el error', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network/500'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    render(<LostPetForm />);

    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Busco a Lola' } });
    fireEvent.change(screen.getByLabelText(/^Nombre$/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '0999999999' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'a@a.com' },
    });

    const submitBtn = screen.getByRole('button', { name: /Publicar/i });
    fireEvent.click(submitBtn);

    expect(submitBtn).toBeDisabled();

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });

    expect(
      screen.queryByRole('button', { name: /¡Publicado con éxito!/i }),
    ).not.toBeInTheDocument();
    expect(window.location.href).toBe('');

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
