import { z } from 'zod';

export const env = z
    .object({
        NODE_ENV: z.enum(['development', 'production']),
        S3_BUCKET: z.string(),
        S3_KEY_ID: z.string(),
        S3_KEY_SECRET: z.string(),
    })
    .parse(process.env);
