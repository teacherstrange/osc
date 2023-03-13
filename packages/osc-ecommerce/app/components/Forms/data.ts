import type { ContactFormFieldErrors, TextInputType, TextAreaType } from './types';

export const termsAndConditions = `
    By completing this form you are expressing interest in Open Study College. We
    will send you information about our courses and any special offers we think will
    be useful to you. You will be able to unsubscribe at anytime. See our Privacy
    Policy.`;

export const contactFormData = {
    actionText: 'Send Enquiry',
    description: `Our student advisors are eager to help – call us now on 0330 822 2686.
                Alternatively fill out the form below and we’ll get back to you.`,
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
            name: 'Telephone number',
            placeholder: 'Your phone number',
            required: true,
            type: 'number',
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
    title: 'Contact us',
    validationErrors: {
        email: ['Invalid Email'],
        firstname: ['Field is required'],
        lastname: ['Field is required'],
        phone: ['Field is required'],
        enquiry: ['Field is required'],
    } as ContactFormFieldErrors,
};
