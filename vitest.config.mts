import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    clearMocks: true,
    globals: true,
    setupFiles: ['dotenv/config'],
    environment: 'node',
    exclude: ['**/node_modules/**'],
    testTimeout: 10000,
  },
});
