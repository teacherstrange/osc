import type { Fetcher } from '@remix-run/react/dist/transition';
import { TextArea, TextInput } from 'osc-ui';
import type { Dispatch, InputHTMLAttributes, SetStateAction, TextareaHTMLAttributes } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';
import { z } from 'zod';
import type { HubspotFormFieldGroups, HubspotFormFieldTypes } from './types';

export function getInputType(
    data: HubspotFormFieldGroups,
    formId: string,
    index: number,
    schema: ZodObject<ZodRawShape>,
    setValidationErrors: Dispatch<SetStateAction<any>>,
    validationErrors: Record<any, any>
) {
    let formInput:
        | InputHTMLAttributes<HTMLInputElement>
        | TextareaHTMLAttributes<HTMLTextAreaElement>;

    let content: JSX.Element;

    // If there are formFields then return correct form input type
    if (data?.fields?.length > 0) {
        const hubspotFields = data.fields[0];
        switch (data.fields[0].fieldType) {
            case 'textarea':
                formInput = (
                    <TextArea
                        errors={validationErrors && validationErrors[hubspotFields.name]}
                        id={`${hubspotFields.name}_${formId}`}
                        label={hubspotFields.label}
                        key={index}
                        name={hubspotFields.name}
                        required={hubspotFields.required}
                        schema={schema.pick({ [hubspotFields.name]: true })}
                        setErrors={setValidationErrors}
                    />
                );
                break;
            case 'text':
            case 'phonenumber':
                formInput = (
                    <TextInput
                        errors={validationErrors && validationErrors[hubspotFields.name]}
                        key={index}
                        id={`${hubspotFields.name}_${formId}`}
                        label={hubspotFields.label}
                        inputMode={hubspotFields.fieldType === 'phonenumber' ? 'numeric' : 'text'}
                        name={hubspotFields.name}
                        pattern={hubspotFields.fieldType === 'phonenumber' ? '[0-9]*' : undefined}
                        placeholder={hubspotFields.placeholder}
                        required={hubspotFields.required}
                        schema={schema.pick({ [hubspotFields.name]: true })}
                        setErrors={setValidationErrors}
                        type={hubspotFields.fieldType}
                    />
                );
                break;
            default:
                return null;
        }
        return formInput;
    } else if (data?.richText?.content) {
        content = (
            <div
                className="c-content"
                dangerouslySetInnerHTML={{ __html: data.richText.content }}
                key={index}
            />
        );
        return content;
    }
    return null;
}

export const getValidationSchema = (formFields: HubspotFormFieldTypes[]) => {
    const res = formFields.reduce((fields, field) => {
        let validationField = {};
        if (field.type === 'string') {
            if (field.name !== 'email') {
                validationField = {
                    [field.name]: field.required
                        ? z.string().trim().min(1, { message: 'Field is required' })
                        : z.string(),
                };
            } else if (field.name === 'email') {
                validationField = {
                    email: z.string().email(),
                };
            }
        }

        return {
            ...fields,
            ...validationField,
        };
    }, {});

    return z.object(res);
};

export const transitionStates = (fetcher: Fetcher) => {
    const isSubmitting = fetcher.state === 'submitting';
    const isAdding =
        fetcher.state === 'submitting' &&
        fetcher.submission.formData.get('_action') === 'submitHubspotForm';

    return { isSubmitting, isAdding };
};

// Filter out the form fields (formFieldGroups can also contain RichText only entries)
export const getFormFields = (formFieldGroups: HubspotFormFieldGroups[]) =>
    formFieldGroups
        .filter((formFieldGroup) => formFieldGroup?.fields.length > 0)
        .map((formField) => formField.fields[0]);
