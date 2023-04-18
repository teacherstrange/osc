import type { Mock } from 'vitest';
import {
    getHubspotForms,
    shapeHubspotFormData,
    validateAndSubmitHubspotForm,
} from './hubspot.helpers';
import { getHubspotFormData, hubspotFormsApiRequest } from './server/hubspot.server';

interface FormFieldData {
    [key: string]: string | number | string[];
}

const formFieldData = {
    formId: '9cf24fde-b8c4-4165-bff6-1a151b83259d',
    hubspotFieldsData:
        '[{"name":"firstname","label":"First name","type":"string","fieldType":"text","description":"","groupName":"contactinformation","displayOrder":-1,"required":true,"selectedOptions":[],"options":[],"validation":{"name":"","message":"","data":"","useDefaultBlockList":false,"blockedEmailAddresses":[]},"enabled":true,"hidden":false,"defaultValue":"","isSmartField":false,"unselectedLabel":"","placeholder":"","dependentFieldFilters":[],"labelHidden":false,"propertyObjectType":"CONTACT","metaData":[],"objectTypeId":"0-1"},{"name":"email","label":"Email","type":"string","fieldType":"text","description":"","groupName":"contactinformation","displayOrder":-1,"required":true,"selectedOptions":[],"options":[],"validation":{"name":"","message":"","data":"","useDefaultBlockList":false,"blockedEmailAddresses":[]},"enabled":true,"hidden":false,"defaultValue":"","isSmartField":false,"unselectedLabel":"","placeholder":"","dependentFieldFilters":[],"labelHidden":false,"propertyObjectType":"CONTACT","metaData":[],"objectTypeId":"0-1"}]',
    firstname: 'Joe',
    email: 'joebloggs@gmail.com',
    _action: 'submitForm',
} as FormFieldData;

const errorCases = { validationErrors: {}, formErrors: {} };

const page = {
    _id: 'home',
    _rev: 'lSp9Mb8VRfq2vc9tSFlskG',
    _type: 'home',
    modules: [
        {
            _key: 'c62cf4cd7b76',
            _type: 'module.forms',
            formNameAndId: 'Newsletter Form, 9cf24fde-b8c4-4165-bff6-1a151b83259d',
            marginBottom: null,
            paddingBottom: null,
            paddingTop: null,
        },
    ],
    title: 'Home',
    seo: {
        canonicalUrl: null,
        description:
            'Want to study from home? Join the 100,000 people who have improved their skills and developed their careers with our home learning courses.',
        image: {
            dimensions: { height: '0', width: '0' },
            url: 'https://cdn.sanity.io/images/v6lebos6/staging/586e498d79a8d15c6799af5409c43db2cff08477-1920x1442.jpg',
        },
        robots: { noIndex: false },
        title: 'The distance learning experts | Online courses',
    },
};

vi.mock('./server/hubspot.server');

describe('validateAndSubmitHubspotForm function', () => {
    let mockData = formFieldData;
    let errorsObj = errorCases;
    let hsFormsApiRequest = hubspotFormsApiRequest as Mock;
    beforeEach(() => {
        mockData = { ...formFieldData };
        errorsObj = { ...errorCases };
        vi.clearAllMocks();
    });

    test('hubspotFormsApiRequest api should be successfully called when data is valid', async () => {
        await validateAndSubmitHubspotForm(mockData, errorsObj);
        expect(hsFormsApiRequest).toHaveBeenCalledTimes(1);
    });
    test('hubspotFormsApiRequest should not be called if data is invalid', async () => {
        mockData.email = '';
        await validateAndSubmitHubspotForm(mockData, errorsObj);
        expect(hsFormsApiRequest).toHaveBeenCalledTimes(0);
    });
    test('should return validationErrors if data is invalid', async () => {
        mockData.email = '';
        mockData.firstname = '';
        const response = await validateAndSubmitHubspotForm(mockData, errorsObj);
        const result = await response.json();
        expect(result.validationErrors.fieldErrors).toEqual({
            email: ['Invalid Entry - Invalid email'],
            firstname: ['Field is required'],
        });
        expect(hsFormsApiRequest).toHaveBeenCalledTimes(0);
    });
    test('should return formErrors if hubspotFormApiRequest throws an error', async () => {
        hsFormsApiRequest.mockImplementationOnce(() => {
            throw new Error('An error has occurred');
        });
        const response = await validateAndSubmitHubspotForm(mockData, errorsObj);
        const result = await response.json();
        expect(result.formErrors).toEqual({
            messages: [
                'Sorry there was an error submitting your form, please try again or contact us directly.',
            ],
        });
        expect(hsFormsApiRequest).toHaveBeenCalledTimes(1);
    });
});

describe('shapeHubspotFormData function', () => {
    test('should correctly shape data to be submitted to hubspot', () => {
        const result = shapeHubspotFormData(JSON.parse(formFieldData.hubspotFieldsData as string), {
            firstname: 'Joe',
            email: 'joebloggs@gmail.com',
        });
        expect(result).toEqual({
            fields: [
                { objectTypeId: '0-1', name: 'firstname', value: 'Joe' },
                {
                    objectTypeId: '0-1',
                    name: 'email',
                    value: 'joebloggs@gmail.com',
                },
            ],
        });
    });
});

describe('getHubspotForms function', () => {
    let mockPage = page;
    beforeEach(() => {
        mockPage = { ...page };
        vi.clearAllMocks();
    });
    test('should call getHubspotFormData when there are form modules', async () => {
        await getHubspotForms(mockPage);
        expect(getHubspotFormData).toHaveBeenCalledTimes(1);
    });
    test('should return null if there are no form modules', async () => {
        mockPage.modules.shift();
        const result = await getHubspotForms(mockPage);
        expect(result).toBe(null);
    });
});
