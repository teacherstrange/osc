import { Client } from '@hubspot/api-client';

export const hubspotClient = () => {
    return new Client({
        accessToken: process.env.HUBSPOT_DEV_ACCESS_TOKEN,
    });
};

export const hubspotFormsApiRequest = async (method: string, url: string, data: any) => {
    const hubspot = hubspotClient();

    try {
        const result = await hubspot.apiRequest({
            method: method,
            overlapUrl: url,
            body: data,
        });
        return result;
    } catch (error) {
        let message = 'Unknown Error';
        if (error instanceof Error) message = error.message;
        throw new Error(message);
    }
};
