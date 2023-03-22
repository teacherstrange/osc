import { json } from '@remix-run/node';
import { getValidationSchema } from '~/components/Forms/utils';
import { hubspotFormsApiRequest, getHubspotFormData } from '~/utils/server/hubspot.server';
import { validateAction } from '~/utils/validation';
import type { formModule } from '~/types/sanity';
import type { HubspotFormData } from '~/components/Forms/types';

export const shapeHubspotFormData = (
    formFieldsData: Record<any, string>[],
    formData: Record<any, string>
) => {
    const shapedData = formFieldsData.map((item) => {
        return {
            objectTypeId: item.objectTypeId,
            name: item.name,
            value: formData[item.name],
        };
    });
    return { fields: shapedData };
};

interface FormFieldData {
    [key: string]: FormDataEntryValue;
}

/**
 * Validate and submit Hubspot Form
 *
 * @param formfieldData All form field data
 * @returns Response from Hubspot or error(s)
 */
export const validateAndSubmitHubspotForm = async (formfieldData: FormFieldData) => {
    // Create errors object
    let errorCases = { validationErrors: {}, formErrors: {} };

    // Return if there is no hubspot field data, or a formId
    if (!formfieldData.hubspotFieldsData) {
        // TODO - Add in error reporting? e.g. Sentry
        console.error('No hubspot field data!');
        errorCases.formErrors = { messages: ['There was a problem, please try again'] };
        return json(errorCases);
    }
    if (!formfieldData.formId) {
        // TODO - Add in error reporting? e.g. Sentry
        console.error('No form Id!');
        errorCases.formErrors = { messages: ['There was a problem, please try again'] };
        return json(errorCases);
    }

    // Get the hubspot field data, form Id and the form input data
    const hubspotFormFields = JSON.parse(formfieldData.hubspotFieldsData as string);
    const formId = formfieldData.formId;
    // All other fields (apart from formId, hubsportFieldsdata and _action) should be form input data
    const formInputData = Object.keys(formfieldData).reduce((formFields, formField) => {
        if (
            formField === 'formId' ||
            formField === 'hubspotFieldsData' ||
            formField === '_action'
        ) {
            return { ...formFields };
        } else {
            return {
                ...formFields,
                [formField]: formfieldData[formField],
            };
        }
    }, {});

    // Create the validation schema
    const schema = getValidationSchema(hubspotFormFields);

    // Validate the form with Zod
    const { validatedFormInputData, errors } = await validateAction({ formInputData, schema });

    // If any errors then return
    if (errors) {
        errorCases.validationErrors = errors;
        return json(errorCases);
    }

    // If validation is passed - shape the hubspot form data to be submitted to Hubspot
    const hubspotContactData = shapeHubspotFormData(hubspotFormFields, validatedFormInputData);

    try {
        const response = await hubspotFormsApiRequest(
            'post',
            `https://api.hsforms.com/submissions/v3/integration/secure/submit/${process.env.HUBSPOT_PORTAL_ID}/${formId}`,
            hubspotContactData
        );
        return response;
    } catch (error: unknown) {
        // TODO - Add in error reporting? e.g. Sentry
        let message = 'Unknown Error';
        if (error instanceof Error) message = error.message;
        console.error('Error submitting form:', message);
        errorCases.formErrors = { messages: ['There was a problem, please try again'] };
        return json(errorCases);
    }
};

export const getHubspotForm = async (page: any) => {
    const formModule = page.modules.find(
        (module: any) => module._type === 'module.forms'
    ) as formModule;

    if (!formModule) {
        return null;
    }

    const formId = formModule.formNameAndId.split(', ')[1];

    let formData: HubspotFormData;
    try {
        formData = await getHubspotFormData(formId);
    } catch (error) {
        return error;
    }

    const hubspotFormData: Partial<HubspotFormData> = {
        formFieldGroups: formData?.formFieldGroups,
        submitText: formData?.submitText,
    };
    return hubspotFormData;
};
