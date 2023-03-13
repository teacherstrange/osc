import type { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { contactFormData, termsAndConditions } from '../data';
import { FormContainer } from '../FormContainer';
import { contactFormSchema } from '../formSchemas';
import type { ContactFormFieldErrors } from '../types';
import type { ContactFormProps } from './ContentForm';
import { ContactForm } from './ContentForm';

export default {
    title: 'osc-ecommerce/Forms/ContactForm',
    component: ContactForm,
    parameters: {
        docs: {
            description: {
                component: 'OSC Contact Form',
            },
        },
    },
} as Meta;

const Template: Story<ContactFormProps> = (args) => {
    const [validationErrors, setValidationErrors] = useState<ContactFormFieldErrors | {}>(
        args.validationErrors
    );

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '3em 0' }}>
            <FormContainer variant="slide-out">
                <ContactForm
                    actionText={args.actionText}
                    description={args.description}
                    formErrors={[]}
                    formInputs={args.formInputs}
                    schema={contactFormSchema}
                    setValidationErrors={setValidationErrors}
                    termsAndConditions={args.termsAndConditions}
                    title={args.title}
                    validationErrors={validationErrors}
                />
            </FormContainer>
        </div>
    );
};

export const Primary = Template.bind({});
export const Validation = Template.bind({});

Primary.args = {
    actionText: contactFormData.actionText,
    description: contactFormData.description,
    formInputs: contactFormData.formInputs,
    termsAndConditions: termsAndConditions,
    title: contactFormData.title,
};

Validation.args = {
    ...Primary.args,
    validationErrors: contactFormData.validationErrors,
};
