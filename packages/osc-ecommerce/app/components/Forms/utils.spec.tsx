import type { Fetcher } from '@remix-run/react';
import type { HubspotFormData } from './types';
import { mockHubspotFormData, validationErrors } from './mockData';
import {
    flattenResults,
    getFormFields,
    getInputOrContent,
    getValidationSchema,
    getVariants,
    inverseSubmitButton,
    isJsonString,
    resetAlert,
    reshapeDate,
    setFormErrorsAndReport,
    transitionStates,
} from './utils';
import { waitFor } from '@testing-library/react';

describe('transitionStates function', () => {
    let form = new FormData();
    afterEach(() => {
        form = new FormData();
    });

    test('should return isSubmitting and isAdding as true when fetcher state is submitting and there is a form data action "submitHubspotForm"', () => {
        form.append('_action', 'submitForm');
        const result = transitionStates({
            state: 'submitting',
            submission: { formData: form },
        } as Fetcher);
        expect(result.isAdding).toBe(true);
        expect(result.isSubmitting).toBe(true);
    });
    test('should return isSubmitting true and isAdding as false when fetcher state is submitting and there is a form data action which is not "submitHubspotForm"', () => {
        form.append('_action', 'differentAction');
        const result = transitionStates({
            state: 'submitting',
            submission: { formData: form },
        } as Fetcher);
        expect(result.isAdding).toBe(false);
        expect(result.isSubmitting).toBe(true);
    });
    test('should return isSubmitting false and isAdding as false when fetcher state is not submitting', () => {
        form.append('_action', 'differentAction');
        const result = transitionStates({
            state: 'loading',
            submission: { formData: form },
        } as Fetcher);
        expect(result.isAdding).toBe(false);
        expect(result.isSubmitting).toBe(false);
    });
});

describe('flattenResults function', () => {
    test('should take an array of objects with nested array of objects and return single array of objects', () => {
        const fields = [
            {
                name: 'firstname',
            },
            {
                name: 'lastname',
            },
            [{ name: 'phone' }, { name: 'email' }, { name: 'email' }],
            { name: 'contactus' },
        ];
        expect(fields.length).toEqual(4);
        expect(flattenResults(fields).length).toEqual(6);
    });
    test('should take an array of objects with no nested array and return the same single array', () => {
        const fields = [
            {
                name: 'firstname',
            },
            {
                name: 'lastname',
            },
            { name: 'contactus' },
        ];
        expect(fields.length).toEqual(3);
        expect(flattenResults(fields).length).toEqual(3);
    });
});

describe('getFormFields function', () => {
    test('should only return "fields" array from "formFieldsGroup" array', () => {
        const result = flattenResults(getFormFields(mockHubspotFormData.formFieldGroups));
        for (const field of result) {
            // formFields should contain a fieldType, so check this is true
            expect(Boolean(field.fieldType)).toBe(true);
        }
    });
});

describe('getValidationSchema function', () => {
    test('should return a Zod Object', () => {
        const formFields = getFormFields(mockHubspotFormData.formFieldGroups);
        const result = getValidationSchema(formFields);
        expect(result._def?.typeName).toBe('ZodObject');
    });
});

describe('getVariants function', () => {
    test('should return array with correct value when "labelTextColor" is white', () => {
        const result = getVariants({ styles: { labelTextColor: '#FFFFFF' } });
        expect(result.length).toBe(1);
        expect(result[0]).toBe('is-white');
    });
    test('should return array with correct value when "themeName" is linear', () => {
        const result = getVariants({ themeName: 'linear' });
        expect(result.length).toBe(1);
        expect(result[0]).toBe('tertiary');
    });
    test('should return variant array with multiple entries when criteria is met', () => {
        const result = getVariants({ styles: { labelTextColor: '#FFFFFF' }, themeName: 'linear' });
        expect(result.length).toBe(2);
        expect(result[0]).toBe('is-white');
        expect(result[1]).toBe('tertiary');
    });
    test('should return empty variant array when no criteria is met', () => {
        const result = getVariants({ styles: { labelTextColor: '#000000' }, themeName: 'rounded' });
        expect(result.length).toBe(0);
    });
});
describe('inverseSubmitButton function', () => {
    test('should return true if submitColor is white', () => {
        const result = inverseSubmitButton({
            submitColor: '#FFFFFF',
            display: 'flex',
            border: '1px solid #FFFFFF',
        });
        expect(result).toBe(true);
    });
    test('should return false if submitColor is not white', () => {
        const result = inverseSubmitButton({
            submitColor: '#000000',
            display: 'flex',
            border: '1px solid #FFFFFF',
        });
        expect(result).toBe(false);
    });
    test('should return false if submitColor is not a present', () => {
        const result = inverseSubmitButton({ border: '1px solid #FFFFFF', display: 'flex' });
        expect(result).toBe(false);
    });
});

describe('reshapeDate function', () => {
    test('should return date UNIX formatted timestamp in milliseconds', () => {
        const result = reshapeDate({ day: 1, month: 12, year: 2022 });
        expect(result).toBe(1641945600000);
    });
    test('should return 0 if day is set to 0', () => {
        const result = reshapeDate({ day: 0, month: 0, year: 0 });
        expect(result).toBe(0);
    });
});

describe('isJsonString function', () => {
    test('should return true if input in a valid JSON string', () => {
        const input = '{"firstname": "Jonny", "lastname": "five"}';
        const result = isJsonString(input);
        expect(result).toBe(true);
    });
    test('should return false if input is an invalid JSON string', () => {
        const input = "{'firstname': 'Jonny', 'lastname': 'five'}";
        const result = isJsonString(input);
        expect(result).toBe(false);
    });
    test('should return false if input is not a string', () => {
        const nonStrings = [false, {}, [], 1];
        for (const nonString of nonStrings) {
            expect(isJsonString(nonString)).toBe(false);
        }
    });
});

describe('setFormErrorsAndReport function', () => {
    test('should return form errors in an array', async () => {
        const result = await setFormErrorsAndReport(
            {
                validationErrors: {},
                formErrors: {},
            },
            {
                loggingMessages: ['Invalid hubspot FormId!'],
                userMessages: ['Invalid Id', 'Invalid Format'],
            }
        );

        const response = await result.json();
        expect(response).toEqual({
            validationErrors: {},
            formErrors: { messages: ['Invalid Id', 'Invalid Format'] },
        });
    });
});
describe('resetAlert function', () => {
    test('should call alert function after set time', async () => {
        const resetTime = 500;
        const alertFunction = vi.fn();
        resetAlert(alertFunction, resetTime);
        await waitFor(() => expect(alertFunction).toHaveBeenCalledTimes(1));
    });
});
describe('getInputOrContent function', () => {
    const validationSchema = getValidationSchema(
        getFormFields(mockHubspotFormData.formFieldGroups)
    );
    test('should return the correct content', () => {
        const result = getInputOrContent(
            mockHubspotFormData.formFieldGroups[0],
            '123',
            0,
            validationSchema,
            () => {},
            validationErrors,
            {}
        ) as JSX.Element;

        expect(result.type).toBe('div');
        expect(result.props.className).toBe('c-content');
        expect(result.props.dangerouslySetInnerHTML).toEqual({
            __html: '<h2>Book a call back</h2>',
        });
    });
    test('should return TextInput component', () => {
        const result = getInputOrContent(
            mockHubspotFormData.formFieldGroups[2],
            '123',
            0,
            validationSchema,
            () => {},
            validationErrors,
            {}
        ) as JSX.Element[];

        expect(result[0].type.displayName).toBe('TextInput');
    });
    test('should return null if there are no fields', () => {
        const noFields = {
            formFieldGroups: [{}],
        } as Pick<HubspotFormData, 'formFieldGroups'>;
        const result = getInputOrContent(
            noFields.formFieldGroups[0],
            '123',
            0,
            validationSchema,
            () => {},
            validationErrors,
            {}
        );
        expect(result).toBe(null);
    });
});
