/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import libCss from 'vite-plugin-libcss';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [libCss(), react(), tsconfigPaths()],
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: ['./test/setup-test-env.ts'],
        include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx,css}']
    }
});
