declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            JWT_SECRET: string;
            JWT_AUDIENCE: string;
            AUTH_API_URL: string;
        }
    }
}

export {};
