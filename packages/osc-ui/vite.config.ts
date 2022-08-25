/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import fs from 'fs';
import { resolve } from 'path';
import type { ResolvedConfig, PluginOption } from 'vite';

const fileRegex = /\.(css)$/;

const injectCode = (code: string) =>
    `function styleInject(css,ref){if(ref===void 0){ref={}}var insertAt=ref.insertAt;if(!css||typeof document==="undefined"){return}var head=document.head||document.getElementsByTagName("head")[0];var style=document.createElement("style");style.type="text/css";if(insertAt==="top"){if(head.firstChild){head.insertBefore(style,head.firstChild)}else{head.appendChild(style)}}else{head.appendChild(style)}if(style.styleSheet){style.styleSheet.cssText=css}else{style.appendChild(document.createTextNode(css))}};styleInject(\`${code}\`)`;
const template = `console.warn("__INJECT__")`;

let viteConfig: ResolvedConfig;
const css: string[] = [];

function libInjectCss(): PluginOption {
    return {
        name: 'lib-inject-css',

        apply: 'build',

        configResolved(resolvedConfig: ResolvedConfig) {
            viteConfig = resolvedConfig;
        },

        transform(code: string, id: string) {
            if (fileRegex.test(id)) {
                css.push(code);
                return {
                    code: ''
                };
            }
            if (
                // @ts-ignore
                id.includes(viteConfig.build.lib.entry)
            ) {
                return {
                    code: `${code}
          ${template}`
                };
            }
            return null;
        },

        async writeBundle(_: any, bundle: any) {
            for (const file of Object.entries(bundle)) {
                const { root } = viteConfig;
                const outDir: string = viteConfig.build.outDir || 'dist';
                const fileName: string = file[0];
                const filePath: string = resolve(root, outDir, fileName);

                try {
                    let data: string = fs.readFileSync(filePath, {
                        encoding: 'utf8'
                    });

                    if (data.includes(template)) {
                        data = data.replace(template, injectCode(css.join('\n')));
                    }

                    fs.writeFileSync(filePath, data);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    };
}

export default defineConfig({
    plugins: [
        libInjectCss(),
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
