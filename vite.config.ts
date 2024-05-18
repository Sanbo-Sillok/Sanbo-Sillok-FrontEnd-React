import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'scripts/vitest-setup.js',
    coverage: {
      include: ['src/**'],
      exclude: [
        'src/assets',
        'src/App.tsx',
        'src/main.tsx',
        'src/components/MarkdownToHTML.tsx',
        'src/components/Wiki/TOC.tsx',
        'src/components/common/DefaultMetaTag.tsx',
        'src/components/common/ISOMetaTag.tsx',
      ],
      reportsDirectory: '.cache/coverage',
    },
  },
});
