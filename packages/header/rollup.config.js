import typescript from 'rollup-plugin-typescript2';
import css from 'rollup-plugin-import-css';
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
    plugins: [css(), typescript()],
    external: Object.keys(peerDependencies)
};
