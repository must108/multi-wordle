import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Adjust the path according to your project's structure
      },
    },
  test: {
    globals: true,
    setupFiles: './__tests__/setupTests.ts',
    environment: 'jsdom',
  },
});
