import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import pluginChecker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), pluginChecker({ typescript: true })],
  define: {
    'process.env': {},
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['setupTests.ts'],

    coverage: {
      exclude: [...configDefaults.exclude, '**/__generated__/**', '**/*.js', '**/*.ts'],
    },
  },
});
