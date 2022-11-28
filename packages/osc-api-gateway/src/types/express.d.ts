import type { userJWT } from 'osc-api';
declare global {
    namespace Express {
        export interface Request {
            auth?: {
                user: userJWT;
            };
        }
    }
}

export {};
