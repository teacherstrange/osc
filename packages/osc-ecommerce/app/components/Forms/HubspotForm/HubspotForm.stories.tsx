import type { Meta, Story } from '@storybook/react';
import { SpritesheetProvider } from 'osc-ui';
import { useState } from 'react';
import type { FormContainerProps } from '../FormContainer';
import { FormContainer } from '../FormContainer';
import { hubspotFormData, sanityFormData, validationErrors } from '../mockData';
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
            <div className={`c-form__contact-form`} style={{ margin: '3em 0' }}>
                <FormContainer
                    slideOut={args.slideOut}
                    slideOutText={args.slideOutText}
                    variant={args.variant}
                >
                    <HubspotForm
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
    formFieldGroups: hubspotFormData.formFieldGroups,
    slideOut: sanityFormData.slideOut,
    slideOutText: sanityFormData.slideOutText,
    submitText: hubspotFormData.submitText,
    variant: sanityFormData.slideDirection,
};

Validation.args = {
    ...Primary.args,
    variant: 'slide-left',
    validationErrors: validationErrors,
};
