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
    } catch (error: unknown) {
        console.error('Error in hubspotFormsApiRequest', error);
        let message = 'Unknown Error';
        if (error instanceof Error) message = error.message;
        throw new Error(message);
    }
};

export const getHubspotFormData = async (formId: string) => {
    const hubspot = hubspotClient();

    try {
        const response = await hubspot.apiRequest({
            method: 'GET',
            path: `/forms/v2/forms/${formId}`,
        });
        if (!response.ok) {
            throw new Error(
                `Unable to retrieve form data, Status:${response?.status}, StatusText: ${response?.statusText}`
            );
        }
        const result = await response.json();
        return result;
    } catch (error: unknown) {
        console.error('Error in getHubspotForm', error);
        let message = 'Unknown Error';
        if (error instanceof Error) message = error.message;
        throw new Error(message);
    }
};
