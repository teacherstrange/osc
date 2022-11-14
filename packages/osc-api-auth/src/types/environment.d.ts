declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            SALT_ROUNDS: number;
            JWT_SECRET: string;
            JWT_AUDIENCE: string;
            JWT_DURATION: number;
            JWT_REFRESH_DURATION: number;
        }
    }
}

export {};
