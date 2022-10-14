/// <reference types="vitest" />
/// <reference types="vite/client" />

import 'dotenv/config';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig(({ mode }) => {
    // Move back up the directory, out of the package and into the root of the monorepo
    const root = path.join(__dirname, '..', '..');
    // Load env file based on `mode` in the current working directory.
    process.env = { ...process.env, ...loadEnv(mode, root, '') };

    return {
        plugins: [react(), tsconfigPaths()],
        test: {
            globals: true,
            environment: 'happy-dom',
            setupFiles: ['./test/setup-test-env.ts'],
            exclude: ['./e2e/**/*']
        }
    };
});
