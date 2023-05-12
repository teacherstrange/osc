import { json } from '@remix-run/node';
import type { HubspotFormData, HubspotFormFieldTypes } from '~/components/Forms/types';
import {
    flattenResults,
    getValidationSchema,
    isJsonString,
    reshapeDate,
    setFormErrorsAndReport,
} from '~/components/Forms/utils';
import type { SanityPage, contentMediaModule, formModule } from '~/types/sanity';
import { getHubspotFormData, hubspotFormsApiRequest } from '~/utils/server/hubspot.server';
import { validateAction } from '~/utils/validation';

/**
 * Shapes form data into the shape required for their API - https://legacydocs.hubspot.com/docs/methods/forms/submit_form_v3_authentication
 *
 * @param formFieldsData An array consisting of objects or nested arrays
 * @param formData The submitted form data
 * @returns An array of shaped objects to be submitted to Hubspot
 */
export const shapeHubspotFormData = (
    formFieldsData: Partial<HubspotFormFieldTypes[] | HubspotFormFieldTypes[][]>,
    formData: Record<string, string | number | [] | {}>
) => {
    const shapedData = flattenResults(formFieldsData).map((item: HubspotFormFieldTypes) => {
        if (Array.isArray(formData[item.name])) {
            const formDataNestedArray = formData[item.name] as string[] | number[];
            // If there is an array of data, e.g. for a checkbox, create separate entry for each
            return formDataNestedArray.map((value) => ({
                objectTypeId: item.objectTypeId,
                name: item.name,
                value: value,
            }));
        }

        return {
            objectTypeId: item.objectTypeId,
            name: item.name,
            value:
                item.type === 'date'
                    ? reshapeDate(formData[item.name] as Record<string, number>)
                    : formData[item.name],
        };
    });

    return { fields: flattenResults(shapedData) };
};

interface FormFieldData {
    [key: string]: string | number | string[];
}

/**
 * Validate and submit Hubspot Form
 *
 * @param formfieldData All form field data
 * @param errorCases An error object for validation and form errors
 * @returns Either a success response from hubspot or an error object
 */
export const validateAndSubmitHubspotForm = async (
    formfieldData: FormFieldData,
    errorCases: { validationErrors: {}; formErrors: {} }
) => {
    // Get the hubspot field data [1], form Id [2] and form input data [3]
    const hubspotFormFields: Partial<HubspotFormFieldTypes[] | HubspotFormFieldTypes[][]> =
        JSON.parse(formfieldData.hubspotFieldsData as string); // [1]

    const formId = formfieldData.formId; // [2]

    const formInputData: Record<string, any> = Object.keys(formfieldData).reduce(
        (formFields, formField) => {
            // Exclude following fields as they aren't formInput data
            if (
                formField === 'formId' ||
                formField === 'hubspotFieldsData' ||
                formField === '_action'
            ) {
                return { ...formFields };
            } else {
                return {
                    ...formFields,
                    // If field is JSON string then parse
                    [formField]: isJsonString(formfieldData[formField])
                        ? JSON.parse(formfieldData[formField] as string)
                        : formfieldData[formField],
                };
            }
        },
        {}
    ); // [3]

    // Create the validation schema
    const schema = getValidationSchema(hubspotFormFields);

    // Small utility - When radio button isn't selected it doesn't create a formData entry. This loops over hubspot
    // formfields to check if there are any entries for don't exist on the form data and creates an entry of an empty
    // string for validation purposes if so.
    flattenResults(hubspotFormFields).forEach((result: HubspotFormFieldTypes) => {
        for (const data of Object.keys(formInputData)) {
            if (result.name === data) return;
        }
        formInputData[result.name] = '';
    });

    // Validate the form with Zod
    const { errors } = await validateAction({ formInputData, schema });

    // If any Zod errors then return
    if (errors) {
        errorCases.validationErrors = errors;
        return json(errorCases);
    }

    // If validation is passed - shape the hubspot form data to be submitted to Hubspot
    const hubspotContactData = shapeHubspotFormData(hubspotFormFields, formInputData);

    try {
        const response = await hubspotFormsApiRequest(
            'post',
            `https://api.hsforms.com/submissions/v3/integration/secure/submit/${process.env.HUBSPOT_PORTAL_ID}/${formId}`,
            hubspotContactData
        );
        return response;
    } catch (error: unknown) {
        let message = 'Unknown Error';
        if (error instanceof Error) message = error.message;
        return setFormErrorsAndReport(errorCases, {
            loggingMessages: [message],
            userMessages: [
                'Sorry there was an error submitting your form, please try again or contact us directly.',
            ],
        });
    }
};

/**
 * Get hubspot forms and reshape
 *
 * @param page Sanity Page
 * @returns An array of hubspot forms for the given page
 */
export const getHubspotForms = async (page: SanityPage) => {
    let forms: formModule[] = [];

    // If contentMedia has any forms then push them to forms array
    page.modules.forEach((module) => {
        const mod = module as contentMediaModule;
        if (module._type === 'module.contentMedia') {
            mod.slides[0].media.mediaType.forEach((med) => {
                if (med._type === 'module.forms') {
                    const module = med as formModule;
                    forms.push(module);
                }
            });
        }
    });

    const formModules = page.modules?.filter(
        (module: any) => module._type === 'module.forms'
    ) as formModule[];

    // If there are any forms from contentMedia (that have been pushed into "forms" array)
    // then add to formModules
    if (forms) {
        formModules.push(...forms);
    }

    if (!formModules || formModules.length === 0) {
        return null;
    }
    // Get all hubspot forms
    const formData = (await Promise.all(
        formModules.map(async (formModule) => {
            let formData: HubspotFormData;
            try {
                formData = await getHubspotFormData(formModule.formId);
                const hubspotFormData = {
                    [formModule.formId]: {
                        formFieldGroups: formData?.formFieldGroups,
                        style: formData?.style,
                        submitText: formData?.submitText,
                        themeName: formData?.themeName,
                    } as Partial<HubspotFormData>,
                };
                return hubspotFormData;
            } catch (error) {
                return error;
            }
        })
    )) as formModule[];

    // Reshape into object
    const hubspotForms = formData.reduce((obj, item) => {
        const key = Object.keys(item)[0];
        const value = Object.values(item)[0];
        return { ...obj, ...{ [key]: value } };
    }, {});

    return hubspotForms;
};
