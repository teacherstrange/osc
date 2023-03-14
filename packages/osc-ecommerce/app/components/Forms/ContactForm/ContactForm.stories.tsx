import type { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { contactFormData } from '../data';
import { FormContainer } from '../FormContainer';
import { contactFormSchema } from '../formSchemas';
import type { ContactFormFieldErrors } from '../types';
import type { ContactFormProps } from './ContactForm';
import { ContactForm } from './ContactForm';
import { SpritesheetProvider } from 'osc-ui';
import { textContent } from './textContent';

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
        <SpritesheetProvider>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '3em 0' }}>
                <FormContainer variant="slide-out">
                    <ContactForm
                        actionText={args.actionText}
                        formErrors={[]}
                        formInputs={args.formInputs}
                        schema={contactFormSchema}
                        setValidationErrors={setValidationErrors}
                        termsAndConditions={args.termsAndConditions}
                        titleAndDescription={args.titleAndDescription}
                        validationErrors={validationErrors}
                    />
                </FormContainer>
            </div>
        </SpritesheetProvider>
    );
};

export const Primary = Template.bind({});
export const Validation = Template.bind({});

Primary.args = {
    actionText: textContent.actionText,
    formInputs: contactFormData.formInputs,
    termsAndConditions: textContent.termsAndConditions,
    titleAndDescription: textContent.titleAndDescription,
};

Validation.args = {
    ...Primary.args,
    validationErrors: contactFormData.validationErrors,
};
