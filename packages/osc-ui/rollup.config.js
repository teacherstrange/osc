import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import scss from 'rollup-plugin-scss';
import { peerDependencies } from './package.json';
import dotenv from 'dotenv';
const transpileCss = require('./bin/utils/helpers');
const path = require('path');
dotenv.config();

export default [
    {
        input: ['src/index.tsx'],
        output: [
            {
                dir: 'dist',
                entryFileNames: '[name].js',
                format: 'cjs',
                exports: 'named'
            }
        ],
        plugins: [
            typescript({ check: false }),
            scss({
                output: async function (style, styleNodes) {
                    Object.entries(styleNodes).map(async (node) => {
                        var file = node[0];
                        var filename = path.relative(process.cwd(), file);
                        await transpileCss(
                            file,
                            'dist/' + filename.replaceAll('/', '-').replaceAll('scss', 'css')
                        );
                    });
                },
                sourceMap: true,
                failOnError: true,
                verbose: true,
                watch: ['src']
            })
        ],
        external: Object.keys(peerDependencies)
    },
    {
        // path to your declaration files root
        input: 'dist/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        external: [/\.scss$/],
        plugins: [dts(), del({ hook: 'buildEnd', targets: './dist/components' })]
    }
];
