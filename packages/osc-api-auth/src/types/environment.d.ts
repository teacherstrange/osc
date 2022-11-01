import type { Secret } from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            SALT_ROUNDS: number;
            JWT_SECRET: Secret;
            JWT_AUDIENCE: string;
        }
    }
}

export {};
