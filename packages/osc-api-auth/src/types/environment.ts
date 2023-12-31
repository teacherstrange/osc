import { z } from 'zod';

export const env = z
    .object({
        NODE_ENV: z.enum(['development', 'production']),
        SALT_ROUNDS: z.string().regex(/^\d+$/).transform(Number),
        JWT_SECRET: z.string(),
        JWT_AUDIENCE: z.string(),
        JWT_DURATION: z.string().regex(/^\d+$/).transform(Number),
        JWT_REFRESH_DURATION: z.string().regex(/^\d+$/).transform(Number),
        MAGIC_SECRET: z.string(),
        REG_EMAIL: z.string().regex(/^\d+$/).transform(Number),
        FORGOT_EMAIL: z.string().regex(/^\d+$/).transform(Number),
        TUTOR_CREATE_EMAIL: z.string().regex(/^\d+$/).transform(Number),
    })
    .parse(process.env);
