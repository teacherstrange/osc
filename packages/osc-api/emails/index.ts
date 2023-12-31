import { Client } from '@hubspot/api-client';
import { v4 as uuidv4 } from 'uuid';

import type {
    GetEmailData,
    GetRegEmailData,
    GetForgotEmailData,
    GetTutorCreateEmailData,
} from './types';
export * from './types';

export const hubspotClient = () => {
    return new Client({
        accessToken: 'pat-eu1-851eec57-2705-402e-8a9c-bc407aa77dc2',
    });
};

export const sendEmail: GetEmailData = async (emailData) => {
    const hubspot = hubspotClient();
    const PublicSingleSendRequestEgg = {
        emailId: emailData.emailId,
        message: emailData.message,
        contactProperties: emailData.contactProperties,
        customProperties: emailData.customProperties,
    };
    try {
        const apiResponse = await hubspot.marketing.transactional.singleSendApi.sendEmail(
            PublicSingleSendRequestEgg
        );
        console.log(JSON.stringify(apiResponse, null, 2));
        return true;
    } catch (error: unknown) {
        console.error('Error in transactionEmailRequest', error);
        let message = 'Uknown Error';
        if (error instanceof Error) message = error.message;
        throw new Error(message);
    }
};

export const sendRegistrationEmail: GetRegEmailData = async (regEmailData) => {
    const message = {
        to: regEmailData.to,
        sendId: uuidv4(),
    };
    const customProperties = {
        name: regEmailData.firstName,
        url: regEmailData.url,
    };
    const contactProperties = {
        firstname: regEmailData.firstName,
        lastname: regEmailData.lastName,
    };
    const emailData = {
        emailId: regEmailData.emailId,
        message: message,
        contactProperties: contactProperties,
        customProperties: customProperties,
    };
    return await sendEmail(emailData);
};

export const sendForgotPasswordEmail: GetForgotEmailData = async (forgotEmailData) => {
    const message = {
        to: forgotEmailData.to,
        sendId: uuidv4(),
    };
    const customProperties = {
        name: forgotEmailData.firstName,
        url: forgotEmailData.url,
    };
    const contactProperties = {
        firstname: forgotEmailData.firstName,
        lastname: forgotEmailData.lastName,
    };
    const emailData = {
        emailId: forgotEmailData.emailId,
        message: message,
        contactProperties: contactProperties,
        customProperties: customProperties,
    };
    return await sendEmail(emailData);
};

export const sendTutorCreateEmail: GetTutorCreateEmailData = async (tutorCreateData) => {
    const message = {
        to: tutorCreateData.to,
        sendId: uuidv4(),
    };
    const customProperties = {
        name: tutorCreateData.firstName,
        url: tutorCreateData.url,
    };
    const contactProperties = {
        firstname: tutorCreateData.firstName,
        lastname: tutorCreateData.lastName,
    };
    const emailData = {
        emailId: tutorCreateData.emailId,
        message: message,
        customProperties: customProperties,
        contactProperties: contactProperties,
    };
    return await sendEmail(emailData);
};
