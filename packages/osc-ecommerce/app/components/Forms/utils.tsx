import type { DateValue } from '@react-types/calendar';
import { json } from '@remix-run/node';
import type { Fetcher } from '@remix-run/react/dist/transition';
import {
    Checkbox,
    CheckboxGroup,
    DatePicker,
    RadioGroup,
    RadioItem,
    Select,
    SelectItem,
    TextArea,
    TextInput,
} from 'osc-ui';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';
import { z } from 'zod';
import { assignValidationSchema } from '../../utils/validation';
import type { HubspotFormFieldGroups, HubspotFormFieldTypes } from './types';

/**
 * Take the hubspot form data and returns the form inputs or rich content
 *
 * @param data Hubspot Form data
 * @param formId The Hubspot form ID
 * @param index Index of the array map
 * @param schema The Zod schema
 * @param setValidationErrors A dispatch for setting validation errors
 * @param validationErrors An object containing validation errors from the servers
 * @param styles The styles from hubspot
 * @param themeName Theme name which comes from hubspot, sets styling of inputs, e.g. linear, rounded etc...
 * @returns Form Input or Rich Content
 */
export function getInputOrContent(
    data: HubspotFormFieldGroups,
    formId: string,
    index: number,
    schema: ZodObject<ZodRawShape>,
    setValidationErrors: Dispatch<SetStateAction<any>>,
    validationErrors: Record<any, any>,
    styles?: Record<string, unknown>,
    themeName?: string
) {
    const variants = getVariants({ styles, themeName });
    if (data?.fields?.length > 0) {
        const inputs = data.fields.map((hubspotFields) => {
            switch (hubspotFields.fieldType) {
                case 'textarea':
                    return (
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
                case 'text':
                case 'phonenumber':
                    return (
                        <TextInput
                            errors={validationErrors && validationErrors[hubspotFields.name]}
                            key={index}
                            id={`${hubspotFields.name}_${formId}`}
                            label={hubspotFields.label}
                            inputMode={
                                hubspotFields.fieldType === 'phonenumber' ? 'numeric' : 'text'
                            }
                            name={hubspotFields.name}
                            pattern={
                                hubspotFields.fieldType === 'phonenumber' ? '[0-9]*' : undefined
                            }
                            placeholder={hubspotFields.placeholder}
                            required={hubspotFields.required}
                            schema={schema.pick({ [hubspotFields.name]: true })}
                            setErrors={setValidationErrors}
                            type={hubspotFields.fieldType}
                            variants={variants}
                        />
                    );

                case 'select':
                    return (
                        <Select
                            description={{ label: hubspotFields.label }}
                            errors={validationErrors && validationErrors[hubspotFields.name]}
                            key={index}
                            required={hubspotFields.required}
                            // This should be coming from 'placeholder' attribute, but it's empty and instead
                            // unselectedLabel has the placeholder value. According to Hubspot support the legacy
                            // API continues to use unselectedLabel until future notice
                            placeholder={hubspotFields.unselectedLabel}
                            name={hubspotFields.name}
                            schema={schema.pick({ [hubspotFields.name]: true })}
                            setErrors={setValidationErrors}
                        >
                            {hubspotFields.options.map((option, index) => (
                                <SelectItem key={index} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                    );
                case 'date':
                    const [date, setDate] = useState<DateValue | null>(null);
                    return (
                        <>
                            <input
                                hidden={true}
                                name={hubspotFields.name}
                                value={JSON.stringify({
                                    year: date?.year ? date.year : 0,
                                    month: date?.month ? date.month : 0,
                                    day: date?.day ? date.day : 0,
                                })}
                                readOnly
                            />
                            <DatePicker
                                errors={validationErrors && validationErrors[hubspotFields.name]}
                                label={hubspotFields.label}
                                name={hubspotFields.name}
                                onChange={setDate}
                                isRequired={hubspotFields.required}
                                schema={schema.pick({ [hubspotFields.name]: true })}
                                setErrors={setValidationErrors}
                            />
                        </>
                    );
                case 'radio':
                    return (
                        <RadioGroup
                            description={{ id: hubspotFields.name, value: hubspotFields.label }}
                            defaultValue={
                                Array.isArray(hubspotFields.selectedOptions)
                                    ? hubspotFields.selectedOptions[0]
                                    : undefined
                            }
                            errors={validationErrors && validationErrors[hubspotFields.name]}
                            name={hubspotFields.name}
                            required={hubspotFields.required}
                            schema={schema.pick({ [hubspotFields.name]: true })}
                            setErrors={setValidationErrors}
                        >
                            {hubspotFields.options.map((option) => (
                                <RadioItem
                                    id={`${option.value}_${formId}`}
                                    key={`${option.value}_${formId}`}
                                    name={option.label}
                                    value={option.value}
                                />
                            ))}
                        </RadioGroup>
                    );
                case 'checkbox':
                    return (
                        <CheckboxGroup
                            description={{ value: hubspotFields.label }}
                            errors={validationErrors && validationErrors[hubspotFields.name]}
                            required={hubspotFields.required}
                        >
                            {hubspotFields.options.map((option) => (
                                <Checkbox
                                    key={`${option.value}_${formId}`}
                                    defaultChecked={hubspotFields.selectedOptions.some(
                                        (opt) => opt === option.value
                                    )}
                                    errors={
                                        validationErrors && validationErrors[hubspotFields.name]
                                    }
                                    id={`${option.value}_${formId}`}
                                    name={hubspotFields.name}
                                    setErrors={setValidationErrors}
                                    schema={schema.pick({ [hubspotFields.name]: true })}
                                    value={option.value}
                                />
                            ))}
                        </CheckboxGroup>
                    );
                default:
                    return null;
            }
        });
        return inputs;
    } else if (data?.richText?.content) {
        return (
            <div
                className="c-content"
                dangerouslySetInnerHTML={{ __html: data.richText.content }}
                key={index}
            />
        );
    }
    return null;
}

/**
 * Gets the validation schema for the form fields
 *
 * @param formFields An array of hubspot form fields
 * @returns A Zod object with the validation schema
 */
export const getValidationSchema = (
    formFields: Partial<HubspotFormFieldTypes[] | HubspotFormFieldTypes[][]>
) => {
    const result = flattenResults(formFields).reduce(
        (fields: HubspotFormFieldTypes[], field: HubspotFormFieldTypes) => {
            let validationField = {};
            validationField = assignValidationSchema(field, validationField);
            return {
                ...fields,
                ...validationField,
            };
        },
        {}
    );
    return z.object(result);
};

/**
 * Sets the transition state when a form is submitted
 *
 * @param fetcher Remix Fetcher
 * @returns The isSubmitting and isAdding state
 */
export const transitionStates = (fetcher: Fetcher) => {
    const isSubmitting = fetcher.state === 'submitting';
    const isAdding =
        fetcher.state === 'submitting' &&
        fetcher.submission.formData.get('_action') === 'submitForm';

    return { isSubmitting, isAdding };
};

/**
 * Gets the form fields from the form field group
 *
 * @param formFieldGroups An array of form field groups
 * @returns An array of form fields
 */
export const getFormFields = (formFieldGroups: HubspotFormFieldGroups[]) => {
    const formFields = formFieldGroups
        .filter((formFieldGroup) => formFieldGroup?.fields.length > 0)
        .map((formField) => {
            if (formField.fields.length > 1) {
                return formField.fields.map((field) => field);
            }
            return formField.fields[0];
        });
    if (Array.isArray(formFields[0])) {
        return formFields[0] as HubspotFormFieldTypes[];
    }
    return formFields as HubspotFormFieldTypes[];
};

/**
 * Sets a list of variants based on styles from Hubspot
 *
 * @param styles An object containing list of styles from hubspot
 * @returns An array of variants
 */
const getVariants = ({
    styles,
    themeName,
}: {
    styles?: Record<string, unknown>;
    themeName?: string;
}) => {
    const variants = [];
    if (styles) {
        for (const styleName of Object.keys(styles)) {
            if (styleName === 'labelTextColor' && styles[styleName] === '#FFFFFF') {
                variants.push('is-white');
                break;
            }
        }
    }
    if (themeName === 'linear') variants.push('tertiary');

    return variants;
};

/**
 * Sets an inverseSubmitButton flag if user has set submitButton to white in Hubspot
 *
 * @param styles An object containing list of styles from hubspot
 * @returns A boolean flag
 */
export const inverseSubmitButton = (styles?: Record<string, unknown>) => {
    let inverseSubmitButton = false;
    if (styles) {
        Object.keys(styles).some((styleName) => {
            if (styleName === 'submitColor' && styles[styleName] === '#FFFFFF') {
                inverseSubmitButton = true;
                return true;
            }
            return false;
        });
    }
    return inverseSubmitButton;
};

/**
 * Date needs reshaping in order to be submitted to Hubspot
 *
 * @param dataObj An object containing the date sections as numbers
 * @returns The Date in a UNIX formatted timestamp in milliseconds
 */
export const reshapeDate = (dateObj: Record<string, number>) => {
    const result = [];
    // Get just the dates - e.g. {year:2022, month:02, day:20} = > [2022,02,20]
    for (const key of Object.keys(dateObj)) {
        result.push(dateObj[key]);
    }
    // If first item in array is 0 then date has not been set, so return 0
    if (result[0] === 0) return 0;

    const updateDate = new Date(result.join('-'));
    // "Date properties will only store the date, and must be set to midnight UTC for the date you want" - https://legacydocs.hubspot.com/docs/faq/how-should-timestamps-be-formatted-for-hubspots-apis
    updateDate.setUTCHours(0, 0, 0, 0);
    return updateDate.getTime();
};

export const isJsonString = (input: unknown) => {
    if (typeof input !== 'string') return false;
    try {
        JSON.parse(input);
    } catch (e) {
        return false;
    }
    return true;
};

/**
 * Spreads nested arrays. This can occur when there are inline formInputs from hubspot
 *
 * @param data An array consisting of objects or nested arrays
 * @returns An array consisting only of objects
 */
export const flattenResults = (data: Record<string, any> | [][]) =>
    data.reduce(
        (acc: Record<string, any>[], cur: [] | {}) =>
            Array.isArray(cur) && cur.length > 0 ? [...acc, ...cur] : [...acc, cur],
        []
    );

/**
 * Utility to set form errors and report
 *
 * @param errorCases An empty object containing validationErrors and formErrors objects
 * @param message A message to set against the errors
 * @returns An object with populated errorCases object
 */
export const setFormErrorsAndReport = (
    errorCases: { validationErrors: {}; formErrors: {} },
    messages: {
        loggingMessages?: string[];
        userMessages?: string[];
    }
) => {
    // TODO - Add in error reporting? e.g. Sentry
    console.error(
        'Error submitting form:',
        messages.loggingMessages?.map((msg) => msg)
    );
    errorCases.formErrors = { messages: messages.userMessages?.map((msg) => msg) };

    return json(errorCases);
};

/**
 * Resets alert messages
 *
 * @param dispatch A dispatch function
 * @param time Length of time before reset
 */
export const resetAlert = (dispatch: () => void, time: number) => {
    setTimeout(() => {
        dispatch();
    }, time);
};
