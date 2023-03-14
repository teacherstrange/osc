import type { ContactFormFieldErrors, TextInputType, TextAreaType } from './types';

export const contactFormData = {
    formInputs: [
        {
            inputType: 'TEXT_INPUT',
            id: 'firstname',
            name: 'First Name',
            placeholder: 'Your first name',
            required: true,
        } as TextInputType,
        {
            inputType: 'TEXT_INPUT',
            id: 'lastname',
            name: 'Last Name',
            placeholder: 'Your last name',
            required: true,
        } as TextInputType,
        {
            inputType: 'TEXT_INPUT',
            id: 'phone',
            inputMode: 'numeric',
            name: 'Telephone number',
            pattern: '[0-9]*',
            placeholder: 'Your phone number',
            required: true,
        } as TextInputType,
        {
            inputType: 'TEXT_INPUT',
            id: 'email',
            name: 'Email',
            placeholder: 'Your email address',
            required: true,
        } as TextInputType,
        {
            inputType: 'TEXT_AREA',
            id: 'enquiry',
            name: 'Enquiry',
            required: true,
        } as TextAreaType,
    ],
    validationErrors: {
        email: ['Invalid Email'],
        firstname: ['Field is required'],
        lastname: ['Field is required'],
        phone: ['Field is required'],
        enquiry: ['Field is required'],
    } as ContactFormFieldErrors,
};
