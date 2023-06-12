import PicoSanity from 'picosanity'; // Tiny Sanity client alternative: https://www.npmjs.com/package/picosanity

import { config } from './config';

// Standard client for fetching data
export const client = (env: string) => {
    return new PicoSanity({
        ...config,
        token: env ?? ``,
    });
};

export const getClient = (env: string) => client(env);
