import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import { peerDependencies } from './package.json';
const glob = require('glob');
const path = require('path');

const bundleCss = () => {
    var config = [];
    var files = glob.sync(path.resolve(__dirname, '**/*.css'));
    files.forEach((file) => {
        var filename = file.substr(file.lastIndexOf('/') + 1, file.length).toLowerCase();
        config.push(
            postcss({
                include: file,
                extract: path.resolve(`dist/${filename}`),
                minimize: true,
                sourceMap: false
            })
        );
    });
    return config;
};

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
        plugins: [...bundleCss(), typescript({ check: false })],
        external: Object.keys(peerDependencies)
    },
    {
        // path to your declaration files root
        input: 'dist/index.js',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        external: [/\.css$/],
        plugins: [dts(), del({ hook: 'buildEnd', targets: './dist/components' })]
    }
];
