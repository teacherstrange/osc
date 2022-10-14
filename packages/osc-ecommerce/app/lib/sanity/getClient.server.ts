import PicoSanity from 'picosanity'; // Tiny Sanity client alternative: https://www.npmjs.com/package/picosanity

import { config } from './config';

// Standard client for fetching data
export const client = new PicoSanity({
    ...config,
    token: process.env.SANITY_STUDIO_API_TOKEN ?? ``
});

// Authenticated client for fetching draft documents
export const previewClient = new PicoSanity({
    ...config,
    token: process.env.SANITY_STUDIO_API_TOKEN ?? ``,
    useCdn: false
});

// Helper function to choose the correct client
export const getClient = (usePreview = false) => (usePreview ? previewClient : client);
