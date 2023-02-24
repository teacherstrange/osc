import { z } from 'zod';

export const env = z
    .object({
        NODE_ENV: z.enum(['development', 'production']),
        LMS_URL: z.string(),
        LMS_API_KEY: z.string(),
    })
    .parse(process.env);
