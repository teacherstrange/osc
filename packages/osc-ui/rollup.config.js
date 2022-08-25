import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import { peerDependencies } from './package.json';

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
            postcss({
                sourceMap: false,
                extract: true
            }),
            typescript({ check: false })
        ],
        external: Object.keys(peerDependencies)
    },
    {
        // path to your declaration files root
        input: 'dist/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        external: [/\.css$/],
        plugins: [dts(), del({ hook: 'buildEnd', targets: './dist/components' })]
    }
];
