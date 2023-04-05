import type { HubspotFormData } from './types';

export const hubspotFormData = {
    formFieldGroups: [
        {
            fields: [],
            default: true,
            isSmartGroup: false,
            richText: {
                content: '<h3>Contact Us</h3>',
                type: 'TEXT',
            },
            isPageBreak: false,
        },
        {
            fields: [],
            default: true,
            isSmartGroup: false,
            richText: {
                content:
                    '<p style="font-size: 16px;">Our student advisors are eager to help - call us now on <a href="tel:0330 8222686" rel="noopener">0330 8222686.</a> Alternatively fill out the form below and we\'ll get back to you.</p>',
                type: 'TEXT',
            },
            isPageBreak: false,
        },
        {
            fields: [
                {
                    name: 'email',
                    label: 'Email',
                    type: 'string',
                    fieldType: 'text',
                    description: '',
                    groupName: 'contactinformation',
                    displayOrder: -1,
                    required: true,
                    selectedOptions: [],
                    options: [],
                    validation: {
                        name: '',
                        message: '',
                        data: '',
                        useDefaultBlockList: false,
                        blockedEmailAddresses: [],
                    },
                    enabled: true,
                    hidden: false,
                    defaultValue: '',
                    isSmartField: false,
                    unselectedLabel: '',
                    placeholder: 'Your email address',
                    dependentFieldFilters: [],
                    labelHidden: false,
                    propertyObjectType: 'CONTACT',
                    metaData: [],
                    objectTypeId: '0-1',
                },
            ],
            default: true,
            isSmartGroup: false,
            richText: {
                content: '',
                type: 'TEXT',
            },
            isPageBreak: false,
        },
        {
            fields: [
                {
                    name: 'firstname',
                    label: 'First name',
                    type: 'string',
                    fieldType: 'text',
                    description: '',
                    groupName: 'contactinformation',
                    displayOrder: -1,
                    required: true,
                    selectedOptions: [],
                    options: [],
                    validation: {
                        name: '',
                        message: '',
                        data: '',
                        useDefaultBlockList: false,
                        blockedEmailAddresses: [],
                    },
                    enabled: true,
                    hidden: false,
                    defaultValue: '',
                    isSmartField: false,
                    unselectedLabel: '',
                    placeholder: 'Your first name',
                    dependentFieldFilters: [],
                    labelHidden: false,
                    propertyObjectType: 'CONTACT',
                    metaData: [],
                    objectTypeId: '0-1',
                },
            ],
            default: true,
            isSmartGroup: false,
            richText: {
                content: '',
                type: 'TEXT',
            },
            isPageBreak: false,
        },
        {
            fields: [
                {
                    name: 'lastname',
                    label: 'Last name',
                    type: 'string',
                    fieldType: 'text',
                    description: '',
                    groupName: 'contactinformation',
                    displayOrder: -1,
                    required: true,
                    selectedOptions: [],
                    options: [],
                    validation: {
                        name: '',
                        message: '',
                        data: '',
                        useDefaultBlockList: false,
                        blockedEmailAddresses: [],
                    },
                    enabled: true,
                    hidden: false,
                    defaultValue: '',
                    isSmartField: false,
                    unselectedLabel: '',
                    placeholder: 'Your last name',
                    dependentFieldFilters: [],
                    labelHidden: false,
                    propertyObjectType: 'CONTACT',
                    metaData: [],
                    objectTypeId: '0-1',
                },
            ],
            default: true,
            isSmartGroup: false,
            richText: {
                content: '',
                type: 'TEXT',
            },
            isPageBreak: false,
        },
        {
            fields: [
                {
                    name: 'phone',
                    label: 'Phone number',
                    type: 'string',
                    fieldType: 'phonenumber',
                    description: '',
                    groupName: 'contactinformation',
                    displayOrder: -1,
                    required: true,
                    selectedOptions: [],
                    options: [],
                    validation: {
                        name: '',
                        message: '',
                        data: '7:20:true',
                        useDefaultBlockList: false,
                        blockedEmailAddresses: [],
                    },
                    enabled: true,
                    hidden: false,
                    defaultValue: '',
                    isSmartField: false,
                    unselectedLabel: '',
                    placeholder: 'Your phone number',
                    dependentFieldFilters: [],
                    labelHidden: false,
                    propertyObjectType: 'CONTACT',
                    metaData: [],
                    objectTypeId: '0-1',
                },
            ],
            default: true,
            isSmartGroup: false,
            richText: {
                content: '',
                type: 'TEXT',
            },
            isPageBreak: false,
        },
        {
            fields: [
                {
                    name: 'message',
                    label: 'Message',
                    type: 'string',
                    fieldType: 'textarea',
                    description: '',
                    groupName: 'contact_activity',
                    displayOrder: -1,
                    required: true,
                    selectedOptions: [],
                    options: [],
                    validation: {
                        name: '',
                        message: '',
                        data: '',
                        useDefaultBlockList: false,
                        blockedEmailAddresses: [],
                    },
                    enabled: true,
                    hidden: false,
                    defaultValue: '',
                    isSmartField: false,
                    unselectedLabel: '',
                    placeholder: '',
                    dependentFieldFilters: [],
                    labelHidden: false,
                    propertyObjectType: 'CONTACT',
                    metaData: [],
                    objectTypeId: '0-1',
                },
            ],
            default: true,
            isSmartGroup: false,
            richText: {
                content: '',
                type: 'TEXT',
            },
            isPageBreak: false,
        },
        {
            fields: [],
            default: true,
            isSmartGroup: false,
            richText: {
                content:
                    '<p class="p1"><span class="s1">By completing this form you are expressing interest in Open Study College. We will send you information about our courses and any special offers we think will be useful to you. You will be able to unsubscribe at anytime. See <a href="https://www.openstudycollege.com/privacy-policy" rel="noopener">Privacy Policy</a>.</span></p>',
                type: 'TEXT',
            },
            isPageBreak: false,
        },
    ],
    submitText: 'Send Enquiry',
} as Partial<HubspotFormData>;

export const validationErrors = {
    email: ['Invalid Email'],
    firstname: ['Field is required'],
    lastname: ['Field is required'],
    phone: ['Field is required'],
    message: ['Field is required'],
};

interface SanityFormData {
    formNameAndId: string;
}

export const sanityFormData: SanityFormData = {
    formNameAndId: 'Contact Form, b6aca185-96b6-416f-9b03-9ce8f894ea44',
};
