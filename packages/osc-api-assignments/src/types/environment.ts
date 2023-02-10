import { z } from 'zod';

export const env = z
    .object({
        NODE_ENV: z.enum(['development', 'production']),
        S3_BUCKET: z.string(),
        S3_KEY: z.string(),
    })
    .parse(process.env);
