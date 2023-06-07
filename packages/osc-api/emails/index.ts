import { Client } from '@hubspot/api-client';
import { v4 as uuidv4 } from 'uuid';

import type { GetEmailData, GetRegEmailData } from './types';
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
        return 'Email request sent to HubSpot';
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
        name: regEmailData.name,
        url: regEmailData.url,
    };
    const contactProperties = {
        name: regEmailData.name,
    };
    const emailData = {
        emailId: 69285064430,
        message: message,
        contactProperties: contactProperties,
        customProperties: customProperties,
    };
    return await sendEmail(emailData);
};
