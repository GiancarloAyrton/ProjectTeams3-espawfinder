import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoundPetForm from '../../components/FoundPetForm';

jest.mock('axios', () => ({ post: jest.fn() }));
jest.mock('../../components/MapView', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-mapview">MapView</div>,
}));
jest.mock('../../components/FilePreview', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-filepreview">Files</div>,
}));

const axios = require('axios');

describe('FoundPetForm – campos obligatorios', () => {
  beforeEach(() => jest.clearAllMocks());

  it('no envía si falta el título', () => {
    render(<FoundPetForm />);
    fireEvent.change(screen.getByLabelText(/^Nombre$/i), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '0998887777' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'ana@ex.com' },
    });

    const submit = screen.getByRole('button', { name: /Publicar/i });
    fireEvent.click(submit);

    expect(axios.post).not.toHaveBeenCalled();
    expect(submit).not.toBeDisabled();
  });

  it('no envía si falta el nombre', () => {
    render(<FoundPetForm />);
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Encontré un perro' } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '0998887777' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'ana@ex.com' },
    });

    const submit = screen.getByRole('button', { name: /Publicar/i });
    fireEvent.click(submit);

    expect(axios.post).not.toHaveBeenCalled();
    expect(submit).not.toBeDisabled();
  });
});
