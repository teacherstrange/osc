/// <reference types="vitest" />
/// <reference types="vite/client" />

import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        {
            enforce: 'pre',
            transform(code, id) {
                if (id.endsWith('.css')) return '';
            }
        } as PluginOption
    ],
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: ['./test/setup-test-env.ts']
    }
});
