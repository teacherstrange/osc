import { PrismaClient } from '@prisma/client';
import { Client } from '@hubspot/api-client';

import type { GetUserByEmailFn, GetUserByIdFn } from './types';
export * from './types';

const prisma = new PrismaClient();

export const hubspotClient = () => {
    return new Client({
        accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
    });
};

export const sendEmail = async (token: string, email: string) => {
    const hubspot = hubspotClient();
    const message = {
        "from": "email_from",
        "to": email,
        "sendId": "sendId",
        "replyTo": [
            "replyTo"
        ],
        "cc": [
            "cc"
        ],
        "bcc": [
            "bcc"
        ]
    }
    const customProperties = {
        "name": email,
        "token": token
    }
    // To Do - Match token to a url link for magic key and add it to the body of the email
    const PublicSignleSendRequestEgg = { emailId: 69147599060, message, customProperties };
    try {
        const apiResponse = await hubspot.marketing.transactional.singleSendApi.sendEmail(PublicSignleSendRequestEgg);
        console.log(JSON.stringify(apiResponse, null, 2));
        return apiResponse;
    } catch (error: unknown) {
        console.error('Error in transactionEmailRequest', error);
        let message = 'Uknown Error';
        if (error instanceof Error) message = error.message;
        throw new Error(message);
    }
}

export const getUserById: GetUserByIdFn = async (id) => {
    return await prisma.user.findUnique({
        where: {
            id,
        },
        include: userInclude(),
    });
};

export const getUserByEmail: GetUserByEmailFn = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email,
        },
        include: userInclude(),
    });
};

const userInclude = () => {
    return {
        crmLink: {
            select: {
                externalId: true,
            },
        },
        lmsLink: {
            select: {
                externalId: true,
            },
        },
    };
};
