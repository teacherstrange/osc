import type { DateValue } from '@react-types/calendar';
import type { Fetcher } from '@remix-run/react/dist/transition';
import { DatePicker, Select, SelectItem, TextArea, TextInput } from 'osc-ui';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';
import { z } from 'zod';
import type { HubspotFormFieldGroups, HubspotFormFieldTypes } from './types';

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
    let formInput: JSX.Element[] = [];

    let content: JSX.Element;

    const variants = getVariants({ styles, themeName });
    if (data?.fields?.length > 0) {
        const inputs = data.fields.map((hubspotFields) => {
            // If there are formFields then return correct form input type
            switch (hubspotFields.fieldType) {
                case 'textarea':
                    formInput.push(
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
                    formInput.push(
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
                    break;
                case 'select':
                    formInput.push(
                        <Select
                            description={{ label: hubspotFields.label }}
                            errors={validationErrors && validationErrors[hubspotFields.name]}
                            key={index}
                            required={hubspotFields.required}
                            // TODO - this should be coming from 'placeholder' attribute, but it's empty and instead unselectedLabel has the placeholder value. According to their API docs this is deprecated 🤷‍♂️ Have raised a ticket with hubspot
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
                    break;
                case 'date':
                    const [date, setDate] = useState<DateValue | null>(null);
                    formInput.push(
                        <>
                            <input
                                hidden={true}
                                name={hubspotFields.name}
                                defaultValue={JSON.stringify({
                                    year: date?.year ? date.year : 0,
                                    month: date?.month ? date.month : 0,
                                    day: date?.day ? date.day : 0,
                                })}
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
                    break;
                default:
                    return null;
            }
            return formInput;
        });
        return inputs[0];
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
        } else if (field.type === 'enumeration') {
            validationField = {
                [field.name]: field.required
                    ? z.string().refine(
                          (val) =>
                              field.options
                                  .map((value) => {
                                      return value.value;
                                  })
                                  .includes(val),
                          {
                              message: 'Please select an option',
                          }
                      )
                    : z.string(),
            };
        } else if (field.type === 'date') {
            validationField = {
                [field.name]: field.required
                    ? z.object({
                          year: z
                              .number({
                                  invalid_type_error: 'Invalid data',
                              })
                              .min(1, {
                                  message: 'Please select a date',
                              }),
                          month: z
                              .number({
                                  invalid_type_error: 'Invalid data',
                              })
                              .min(1, {
                                  message: 'Please select a date',
                              }),
                          day: z
                              .number({
                                  invalid_type_error: 'Invalid data',
                              })
                              .min(1, {
                                  message: 'Please select a date',
                              }),
                      })
                    : z.object({
                          year: z.number({
                              invalid_type_error: 'Invalid data',
                          }),
                          month: z.number({
                              invalid_type_error: 'Invalid data',
                          }),
                          day: z.number({
                              invalid_type_error: 'Invalid data',
                          }),
                      }),
            };
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

export const isJsonString = (str: any) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};
