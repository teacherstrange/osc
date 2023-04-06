import type { ActionFunction } from '@remix-run/node';
import { validateAndSubmitHubspotForm } from '~/utils/hubspot.helpers';
import { json } from '@remix-run/node';
import { flattenResults } from '~/components/Forms/utils';
import { setFormErrorsAndReport } from '~/components/Forms/utils';

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    const formfieldData = Object.fromEntries(formData.entries()) as Record<
        string,
        string | string[] | number
    >;

    // Create errors object
    const errorCases = { validationErrors: {}, formErrors: {} };

    if (!formfieldData.hubspotFieldsData || !formfieldData.formId)
        return setFormErrorsAndReport(errorCases, {
            loggingMessages: !formfieldData.hubspotFieldsData
                ? ['No hubspot field data!']
                : ['No form Id!'],
            userMessages: [
                'Sorry there was an error submitting your form, please try again or contact us directly.',
            ],
        });

    const hubspotFormFields = JSON.parse(formfieldData.hubspotFieldsData as string);

    // If fieldType is checkbox we need to check for multiple values. Object.fromEntries() will only
    // return one value per property so using getAll and reassigning the formFieldData value to this
    for (const field of flattenResults(hubspotFormFields)) {
        if (field.fieldType === 'checkbox') {
            formfieldData[field.name] = formData.getAll(field.name) as string[];
        }
    }

    if (formfieldData._action === 'submitHubspotForm') {
        let response;
        try {
            response = await validateAndSubmitHubspotForm(formfieldData, errorCases);
        } catch (error) {
            let message = 'Unknown Error';
            if (error instanceof Error) message = error.message;
            return json({ formErrors: { messages: [message] } });
        }

        if (!response?.ok) {
            return setFormErrorsAndReport(errorCases, {
                loggingMessages: [
                    `Error submitting form! Status: ${response.status}. StatusText: ${response.statusText}`,
                ],
                userMessages: [
                    'Sorry there was an error submitting your form, please try again or contact us directly.',
                ],
            });
        }

        const result = await response.json();
        if (result.validationErrors || result.formErrors) {
            result.success = false;
        } else {
            result.success = true;
        }

        return result;
    }
    // If action isn't 'submitForm' then return error
    return setFormErrorsAndReport(errorCases, {
        loggingMessages: [`"${formfieldData._action}" is an invalid action!`],
        userMessages: [
            'Sorry there was an error submitting your form, please try again or contact us directly.',
        ],
    });
};
