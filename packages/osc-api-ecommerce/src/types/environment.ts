import { z } from 'zod';

export const env = z
    .object({
        NODE_ENV: z.enum(['development', 'production']),
        ALGOLIA_APP_ID: z.string(),
        ALGOLIA_SEARCH_KEY: z.string(),
        ALGOLIA_PRODUCT_INDEX: z.string(),
        SHOPIFY_STORE_NAME: z.string(),
        SHOPIFY_API_KEY: z.string(),
        SHOPIFY_SECRET: z.string(),
        SHOPIFY_ACCESS_TOKEN: z.string()
    })
    .parse(process.env);
