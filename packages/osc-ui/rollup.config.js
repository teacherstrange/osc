import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import { peerDependencies } from './package.json';

export default {
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
};
