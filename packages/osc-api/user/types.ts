import type { User, Role } from '@prisma/client';

export type userJWT = {
    readonly id: number;
    permissions: {
        readonly [key: string]: string[];
    };
};
type UserObject = User & {
    crmLink: {
        externalId: number;
    }[];
    lmsLink: {
        externalId: string;
    }[];
};

export type GetUserByIdFn = (id: number) => Promise<UserObject | null>;
export type GetRoleByIdFn = (id: number) => Promise<Role | null>;
export type GetRoleByTitleFn = (title: string) => Promise<Role | null>;
export type GetUserByEmailFn = (email: string) => Promise<UserObject | null>;
