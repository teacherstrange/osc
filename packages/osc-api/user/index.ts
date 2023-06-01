import { PrismaClient } from '@prisma/client';
import { Client } from '@hubspot/api-client';
import { v4 as uuidv4 } from 'uuid';

import type { GetEmailData, GetUserByEmailFn, GetUserByIdFn, GetRoleByIdFn, GetRoleByTitleFn } from './types';
export * from './types';

const prisma = new PrismaClient();

export const hubspotClient = () => {
    return new Client({
        accessToken: "pat-eu1-851eec57-2705-402e-8a9c-bc407aa77dc2",
    });
};

export const sendEmail: GetEmailData = async (emailData) => {
    const hubspot = hubspotClient();
    const message = {
        "to": emailData.to,
        "sendId": uuidv4(),
    }
    const customProperties = {
        "name": emailData.to,
        "url": emailData.url
    }
    // To Do - Format cod eto allow email function to be reusable 
    const PublicSingleSendRequestEgg = { emailId: emailData.emailId, message, customProperties };
    try {
        const apiResponse = await hubspot.marketing.transactional.singleSendApi.sendEmail(PublicSingleSendRequestEgg);
        console.log(JSON.stringify(apiResponse, null, 2));
        return 'Email request sent to HubSpot';
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

export const getRoleById: GetRoleByIdFn = async (id) => {
    return await prisma.role.findUnique({
        where: {
            id,
        }
    })
}

export const getRoleByTitle: GetRoleByTitleFn = async (title) => {
    return await prisma.role.findFirst({
        where: {
            title
        }
    })
}

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
