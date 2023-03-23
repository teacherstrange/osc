import type { ActionFunction } from '@remix-run/node';
import { validateAndSubmitHubspotForm } from '~/utils/hubspot.helpers';
import { json } from '@remix-run/node';

export const action: ActionFunction = async ({ request }) => {
    const formfieldData = Object.fromEntries(await request.formData());

    if (formfieldData._action === 'submitHubspotForm') {
        let response;
        try {
            response = await validateAndSubmitHubspotForm(formfieldData);
        } catch (error) {
            let message = 'Unknown Error';
            if (error instanceof Error) message = error.message;
            return json({ formErrors: { messages: [message] } });
        }

        if (!response?.ok) {
            console.error(
                `Error submitting form! Status: ${response.status}. StatusText: ${response.statusText}`
            );
            return {
                formErrors: {
                    statusText: response?.statusText,
                    messages: ['There was a problem, please try again'],
                    status: response?.status,
                },
            };
        }

        const result = await response.json();
        if (result.validationErrors || result.formErrors) {
            result.success = false;
        } else {
            result.success = true;
        }

        return result;
    }
};
