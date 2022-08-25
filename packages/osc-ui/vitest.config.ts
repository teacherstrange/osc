/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

let packageNames = [];
let viteConfig;
let IIFEcss;

// 将 css 打包到 js 文件中
function libInjectCss() {
    return {
        apply: 'build' as 'build',
        enforce: 'post' as 'post',
        name: 'pack-css',
        configResolved(config) {
            viteConfig = config;
            packageNames = viteConfig.build.lib.formats.map((format) =>
                viteConfig.build.lib.fileName(format)
            );
        },
        generateBundle(_, bundle) {
            const cssFileName = 'style.css';
            const { [cssFileName]: cssBundle } = bundle;
            if (cssBundle) {
                IIFEcss = `(function() {try {var elementStyle = document.createElement('style');elementStyle.innerText = ${JSON.stringify(
                    cssBundle.source
                )};document.head.appendChild(elementStyle);} catch(error) {console.error(error, 'unable to concat style inside the bundled file')}})()`;
                delete bundle[cssFileName];
            }
            packageNames.forEach((packageName) => {
                if (bundle[packageName]) {
                    bundle[packageName].code += IIFEcss;
                }
            });
        }
    };
}

export default defineConfig({
    plugins: [libInjectCss(), react(), tsconfigPaths()],
    test: {
        reporters: ['verbose'],
        globals: true,
        environment: 'happy-dom',
        setupFiles: ['./test/setup-test-env.ts'],
        include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx,}', './src/**/*.{css}']
    }
});
