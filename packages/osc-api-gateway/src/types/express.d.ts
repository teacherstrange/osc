declare global {
    namespace Express {
        export interface Request {
            auth?: {
                user: {
                    id: number;
                    permissions: {
                        read: string[];
                        write: string[];
                    };
                };
            };
        }
    }
}

export {};
