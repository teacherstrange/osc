import { z } from 'zod';

export const env = z
    .object({
        NODE_ENV: z.enum(['development', 'production']),
        HUBSPOT_ACCESS_TOKEN: z.string(),
    })
    .parse(process.env);
