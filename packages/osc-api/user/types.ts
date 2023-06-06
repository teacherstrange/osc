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

type regEmailData = {
    to: string;
    url: string;
};

type message = {
    to: string;
    from?: string;
    sendId: string;
    cc?: string[];
    bcc?: string[];
    replyTo?: string[];
};

type emailData = {
    emailId: number;
    message: message;
    customProperties: {};
};

export type GetUserByIdFn = (id: number) => Promise<UserObject | null>;
export type GetRoleByIdFn = (id: number) => Promise<Role | null>;
export type GetRoleByTitleFn = (title: string) => Promise<Role | null>;
export type GetUserByEmailFn = (email: string) => Promise<UserObject | null>;
export type GetEmailData = (input: emailData) => Promise<String>;
export type GetRegEmailData = (input: regEmailData) => Promise<String>;
