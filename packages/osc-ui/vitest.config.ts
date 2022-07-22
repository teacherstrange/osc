/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import libCss from 'vite-plugin-libcss';
import tsconfigPaths from 'vite-tsconfig-paths';
const { resolve } = require('path');
const fs = require('fs');

export interface PluginOptions {
    [x: string]: string;
}

let viteConfig;

const importCss = (): any => {
    return {
        name: 'importCss',
        apply: 'build',
        enforce: 'post',

        configResolved(resolvedConfig) {
            viteConfig = resolvedConfig;
        },

        writeBundle(bundle) {
            // if (!viteConfig.build || !viteConfig.build.lib) {
            //     // only for lib build
            //     console.warn('vite-plugin-libcss only works in lib mode.');
            //     return;
            // }
            // if (option.format !== 'es') {
            //     // only for es built
            //     return;
            // }
            const files = Object.keys(bundle);
            const cssFile = files.find((v) => v.endsWith('.css'));
            if (!cssFile) {
                return;
            }
            for (const file of files) {
                if (!bundle[file].isEntry) {
                    // only for entry
                    continue;
                }
                const outDir = 'dist';
                const filePath = resolve(viteConfig.root, outDir, file);
                const data = fs.readFileSync(filePath, {
                    encoding: 'utf8'
                });
                fs.writeFileSync(filePath, `import './${cssFile}';\n${data}`);
            }
        }
    };
};

export default defineConfig({
    plugins: [importCss(), react(), tsconfigPaths()],
    test: {
        reporters: ['verbose'],
        globals: true,
        environment: 'happy-dom',
        setupFiles: ['./test/setup-test-env.ts'],
        include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx,css}']
    }
});
