import { z } from 'zod';

export const env = z
    .object({
        NODE_ENV: z.enum(['development', 'production']),
        JWT_SECRET: z.string(),
        JWT_AUDIENCE: z.string(),
        AUTH_API_URL: z.string(),
        CRM_API_URL: z.string(),
        ECOMMERCE_API_URL: z.string(),
    })
    .parse(process.env);
