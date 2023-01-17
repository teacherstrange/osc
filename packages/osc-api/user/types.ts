import type { User } from '@prisma/client';

export type userJWT = {
    readonly id: number;
    readonly permissions: {
        read: string[];
        write: string[];
    };
};

export type GetUserByIdFn = (id: number) => Promise<User | null>;
export type GetUserByEmailFn = (email: string) => Promise<User | null>;
