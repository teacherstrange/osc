import commonjs from '@rollup/plugin-commonjs';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [commonjs()],
    build: {
        minify: true,
        reportCompressedSize: true,
        lib: {
            entry: path.resolve(__dirname, 'index.js'),
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
    },
});
