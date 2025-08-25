// __tests__/unit/buildFormData.lost.test.ts
function buildFormData(formData: any, userId: string | null, deviceId: string | null) {
  const data = new FormData();
  Object.keys(formData).forEach((key) => {
    if (key === 'files') {
      formData.files.forEach((file: File | Blob) => data.append('files', file));
    } else {
      data.append(key, (formData as any)[key] ?? '');
    }
  });
  if (userId) data.append('userId', userId);
  if (deviceId) data.append('deviceId', deviceId);
  return data;
}

describe('FormData en LostPetForm', () => {
  it('incluye campos, archivos y metadatos', () => {
    const fakeFile = new File([new Uint8Array([1, 2, 3])], 'foto.png', { type: 'image/png' });

    const form = { title: 'Busco a Rocky', files: [fakeFile], status: 'lost', ownerName: 'Juan' };
    const data = buildFormData(form, 'u123', 'd-abc');

    expect(data.get('title')).toBe('Busco a Rocky');
    expect(data.get('status')).toBe('lost');
    expect(data.get('ownerName')).toBe('Juan');
    expect(data.get('userId')).toBe('u123');
    expect(data.get('deviceId')).toBe('d-abc');

    const files = data.getAll('files') as File[];
    expect(files.length).toBe(1);
    expect(files[0].name).toBe('foto.png');
  });
});
