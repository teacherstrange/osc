import { PrismaClient } from '@prisma/client';
import { Client } from '@hubspot/api-client';

import type { GetUserByEmailFn, GetUserByIdFn } from './types';
export * from './types';

const prisma = new PrismaClient();

export const hubspotClient = () => {
    return new Client({
        accessToken: "pat-eu1-851eec57-2705-402e-8a9c-bc407aa77dc2",
    });
};

export const sendEmail = async (token: string, email: string) => {
    const hubspot = hubspotClient();
    const message = {
        "from": "jonathan.hall@openstudycollege.com",
        "to": "jonathan.hall@openstudycollege.com",
        "sendId": "testsend",
        "replyTo": [
            "jonathan.hall@openstudycollege.com"
        ],
        "cc": [
            "jonathan.hall@openstudycollege.com"
        ],
        "bcc": [
            "jonathan.hall@openstudycollege.com"
        ]
    }
    const url = 'https://openstudycollege.com/signin/' + token;
    const customProperties = {
        "name": email,
        "token": token,
        "url": url
    }
    console.log('next step');
    // To Do - Match token to a url link for magic key and add it to the body of the email
    const PublicSingleSendRequestEgg = { emailId: 69147599060, message, customProperties };
    try {
        const apiResponse = await hubspot.marketing.transactional.singleSendApi.sendEmail(PublicSingleSendRequestEgg);
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
