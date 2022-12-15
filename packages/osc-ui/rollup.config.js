import commonjs from '@rollup/plugin-commonjs';
import dotenv from 'dotenv';
import copy from 'rollup-plugin-copy';
import dts from 'rollup-plugin-dts';
import scss from 'rollup-plugin-scss';
import typescript from 'rollup-plugin-typescript2';

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
                exports: 'named',
            },
        ],
        plugins: [
            commonjs(),
            typescript({ check: false }),
            // Copy the fonts into our dist folder
            copy({
                targets: [{ src: 'src/fonts', dest: 'dist' }],
            }),
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
                check: false,
                sourceMap: true,
                failOnError: false,
                verbose: true,
                watch: ['src/styles', 'src/components'],
            }),
        ],
    },
    {
        // path to your declaration files root
        input: 'src/index.tsx',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        external: [/\.scss$/, /\.css$/],
        plugins: [dts()],
    },
];
