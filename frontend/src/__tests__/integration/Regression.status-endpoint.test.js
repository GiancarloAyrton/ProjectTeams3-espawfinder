import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import LostPetForm from '../../components/LostPetForm';
import FoundPetForm from '../../components/FoundPetForm';
import LookingForMateForm from '../../components/LookingForMateForm';
import SolidarityHelpForm from '../../components/SolidarityHelpForm';

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
  default: () => <div data-testid="mock-filepreview">Files</div>,
}));

const axios = require('axios');

describe('Regresión – status y endpoint', () => {
  beforeEach(() => {
    localStorage.setItem('anonymousPostUUID', 'dev-uuid-123');
    Object.defineProperty(window, 'location', { value: { href: '' }, writable: true });
    jest.useFakeTimers();
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.useRealTimers();
    localStorage.clear();
  });

  const cases = [
    { name: 'LostPetForm', Comp: LostPetForm, status: 'lost', title: 'Busco a Rocky' },
    { name: 'FoundPetForm', Comp: FoundPetForm, status: 'found', title: 'Encontré un perro' },
    {
      name: 'LookingForMateForm',
      Comp: LookingForMateForm,
      status: 'lookingForMate',
      title: 'Busco pareja',
    },
    {
      name: 'SolidarityHelpForm',
      Comp: SolidarityHelpForm,
      status: 'solidarityHelp',
      title: 'Ayuda solidaria',
    },
  ];

  it.each(cases)('%s envía status correcto y endpoint exacto', async ({ Comp, status, title }) => {
    axios.post.mockResolvedValueOnce({ data: { data: { _id: 'ID123' } } });

    render(<Comp />);

    // Mínimos
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: title } });
    fireEvent.change(screen.getByLabelText(/^Nombre$/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '0999999999' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'u@u.com' },
    });

    const submit = screen.getByRole('button', { name: /Publicar/i });
    fireEvent.click(submit);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    const [url, body, config] = axios.post.mock.calls[0];

    // Endpoint exacto (según tu código actual)
    expect(url).toBe('https://espawfinder.com/backend/upload');
    expect(config.headers['Content-Type']).toMatch(/multipart\/form-data/i);
    expect(body.get('status')).toBe(status);
    expect(body.get('deviceId')).toBe('dev-uuid-123');

    // No falla si no subimos archivos (debe manejar files vacíos)
    expect(Array.isArray(body.getAll('files'))).toBe(true);
  });
});
