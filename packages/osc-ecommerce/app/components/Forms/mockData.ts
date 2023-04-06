import type { HubspotFormData } from './types';

export const hubspotFormData = {
    formFieldGroups: [
        {
            fields: [],
            default: true,
            isSmartGroup: false,
            richText: {
                content: '<h2>Book a call back</h2>',
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
                    '<p>Our education specialists can help you find the right course for your requirements. Fill in the form below and one of them will give you a call back at the time requested.</p>',
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
            fields: [
                {
                    name: 'interests',
                    label: 'Course Interests',
                    type: 'enumeration',
                    fieldType: 'select',
                    description: '',
                    groupName: 'contactinformation',
                    displayOrder: -1,
                    required: true,
                    selectedOptions: [],
                    options: [
                        {
                            label: 'A levels',
                            value: 'A levels',
                            displayOrder: 1,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: 'Accounting',
                            value: 'Accounting',
                            displayOrder: 2,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: 'Business',
                            value: 'Business',
                            displayOrder: 3,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: 'Computers & IT',
                            value: 'Computers & IT',
                            displayOrder: 4,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: "GCSE's",
                            value: "GCSE's",
                            displayOrder: 5,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: 'Hair Beauty & Nails',
                            value: 'Hair Beauty & Nails',
                            displayOrder: 6,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: 'Health Fitness & Nutrition',
                            value: 'Health Fitness & Nutrition',
                            displayOrder: 7,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                    ],
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
            fields: [
                {
                    name: 'enquiryorigin',
                    label: 'Enquiry Origin',
                    type: 'enumeration',
                    fieldType: 'select',
                    description: '',
                    groupName: 'contactinformation',
                    displayOrder: -1,
                    required: true,
                    selectedOptions: [],
                    options: [
                        {
                            label: 'Through a friend',
                            value: 'friend',
                            displayOrder: -1,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: 'Through a website',
                            value: 'website',
                            displayOrder: -1,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: 'Through Social Media',
                            value: 'social-media',
                            displayOrder: -1,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                    ],
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
            fields: [
                {
                    name: 'preferred_call_back_date',
                    label: 'Preferred call back date',
                    type: 'date',
                    fieldType: 'date',
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
                    placeholder: '',
                    dependentFieldFilters: [],
                    labelHidden: false,
                    propertyObjectType: 'CONTACT',
                    metaData: [
                        {
                            name: 'format',
                            value: 'MM-DD-YYYY',
                        },
                        {
                            name: 'separator',
                            value: '/',
                        },
                    ],
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
                    name: 'call_back_hour',
                    label: 'Hour',
                    type: 'enumeration',
                    fieldType: 'select',
                    description: '',
                    groupName: 'contactinformation',
                    displayOrder: -1,
                    required: true,
                    selectedOptions: [],
                    options: [
                        {
                            label: '08',
                            value: '0800',
                            displayOrder: 0,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: '09',
                            value: '0900',
                            displayOrder: 1,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: '10',
                            value: '10',
                            displayOrder: 2,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: '11',
                            value: '11',
                            displayOrder: 3,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: '12',
                            value: '12',
                            displayOrder: 4,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: '13',
                            value: '13',
                            displayOrder: 5,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: '14',
                            value: '14',
                            displayOrder: 6,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: '15',
                            value: '15',
                            displayOrder: 7,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: '16',
                            value: '16',
                            displayOrder: 8,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: '17',
                            value: '17',
                            displayOrder: 9,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: '18',
                            value: '18',
                            displayOrder: 10,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: '19',
                            value: '19',
                            displayOrder: 11,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                    ],
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
                {
                    name: 'call_back_minute',
                    label: 'Minute',
                    type: 'enumeration',
                    fieldType: 'select',
                    description: '',
                    groupName: 'contactinformation',
                    displayOrder: -1,
                    required: true,
                    selectedOptions: [],
                    options: [
                        {
                            label: '00',
                            value: '00',
                            displayOrder: 0,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: '15',
                            value: '15',
                            displayOrder: 1,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: '30',
                            value: '30',
                            displayOrder: 2,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: '45',
                            value: '45',
                            displayOrder: 3,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                    ],
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
            fields: [
                {
                    name: 'call_sooner',
                    label: 'Call sooner',
                    type: 'enumeration',
                    fieldType: 'checkbox',
                    description: '',
                    groupName: 'contactinformation',
                    displayOrder: -1,
                    required: true,
                    selectedOptions: [],
                    options: [
                        {
                            label: 'Call me as soon as possible',
                            value: 'Call me as soon as possible',
                            displayOrder: 0,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                    ],
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
                {
                    name: 'current_student',
                    label: 'Current student',
                    type: 'enumeration',
                    fieldType: 'radio',
                    description: '',
                    groupName: 'contactinformation',
                    displayOrder: -1,
                    required: true,
                    selectedOptions: [],
                    options: [
                        {
                            label: 'Yes',
                            value: 'Yes',
                            displayOrder: 0,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                        {
                            label: 'No',
                            value: 'No',
                            displayOrder: 1,
                            doubleData: 0,
                            hidden: false,
                            description: '',
                            readOnly: false,
                        },
                    ],
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
    ],
    submitText: 'Enrol Now',
} as Pick<HubspotFormData, 'formFieldGroups' | 'submitText'>;


export const validationErrors = {
    firstname: ['Field is required'],
    lastname: ['Field is required'],
    phone: ['Field is required'],
    email: ['Invalid Entry - Invalid email'],
    interests: ['Please select an option'],
    enquiryorigin: ['Please select an option'],
    preferred_call_back_date: [
        'Please select a date',
        'Please select a date',
        'Please select a date',
    ],
    call_back_hour: ['Please select an option'],
    call_back_minute: ['Please select an option'],
    call_sooner: ['Please select an option'],
    current_student: ['Please select an option'],
};

interface SanityFormData {
    formNameAndId: string;
}

export const sanityFormData: SanityFormData = {
    formNameAndId: 'Contact Form, b6aca185-96b6-416f-9b03-9ce8f894ea44',
};
