import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './__tests__/e2e',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:3000', // AJUSTA al puerto de tu app
    headless: true,
  },
});
