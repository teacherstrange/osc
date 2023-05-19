import type { User } from '@prisma/client';

export type userJWT = {
    readonly id: number;
    readonly permissions: {
        read: string[];
        write: string[];
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

type emailData = {
    to: string
    emailId: number
    url: string
}

export type GetUserByIdFn = (id: number) => Promise<UserObject | null>;
export type GetUserByEmailFn = (email: string) => Promise<UserObject | null>;
export type GetEmailData = (input: emailData) => Promise<String>
