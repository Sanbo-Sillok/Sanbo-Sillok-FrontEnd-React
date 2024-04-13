import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'gh-pages' ? '/Sanbo-Sillok-FrontEnd-React/' : '/',
    plugins: [react(), tsconfigPaths()],
  };
});
