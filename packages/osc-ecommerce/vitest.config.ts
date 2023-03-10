/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import 'dotenv/config';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
    // Move back up the directory, out of the package and into the root of the monorepo
    const root = path.join(__dirname, '..', '..');
    // Load env file based on `mode` in the current working directory.
    process.env = { ...process.env, ...loadEnv(mode, root, '') };

    return {
        plugins: [react(), tsconfigPaths()],
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['./__test__/setup-test-env.ts'],
            exclude: ['node_modules', './e2e/**/*'],
        },
    };
});
