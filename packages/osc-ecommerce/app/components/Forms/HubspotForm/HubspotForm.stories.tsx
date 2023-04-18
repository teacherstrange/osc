import type { Meta, Story } from '@storybook/react';
import { SpritesheetProvider } from 'osc-ui';
import { useState } from 'react';
import type { FormContainerProps } from '../FormContainer';
import { FormContainer } from '../FormContainer';
import { mockHubspotFormData, validationErrors } from '../mockData';
import type { HubspotFormProps } from './HubspotForm';
import { HubspotForm } from './HubspotForm';

export default {
    title: 'osc-ecommerce/Forms/HubspotForm',
    component: HubspotForm,
    parameters: {
        docs: {
            description: {
                component: 'OSC Hubspot Form',
            },
        },
    },
    argTypes: {
        children: {
            description: 'The actual form which is passed through the FormContainer',
        },
        slideOut: {
            description: 'Sets whether the form will slide out and adds the slide out button',
        },
        variant: {
            description:
                'Determines which side the button will be on depending on whether it will slide our from right or left',
        },
    },
} as Meta;

const Template: Story<HubspotFormProps & FormContainerProps> = (args) => {
    const [validationErrors, setValidationErrors] = useState(args.validationErrors);

    return (
        <SpritesheetProvider>
            <div style={{ margin: '3em 0' }}>
                <FormContainer variants={args.variants}>
                    <HubspotForm
                        formId="fe5ae92f-faeb-4d04-b8e0-72619d5459f5"
                        formErrors={[]}
                        formFieldGroups={args.formFieldGroups}
                        setValidationErrors={setValidationErrors}
                        submitText={args.submitText}
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
    formFieldGroups: mockHubspotFormData.formFieldGroups,
    submitText: mockHubspotFormData.submitText,
    variants: ['callback-form'],
};

Validation.args = {
    ...Primary.args,
    variants: ['callback-form'],
    validationErrors: validationErrors,
};
