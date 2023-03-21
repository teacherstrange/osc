import type { Meta, Story } from '@storybook/react';
import { SpritesheetProvider } from 'osc-ui';
import { useState } from 'react';
import { contactFormData } from '../data';
import type { FormContainerProps } from '../FormContainer';
import { FormContainer } from '../FormContainer';

import type { HubspotFormProps } from './HubspotForm';
import { HubspotForm } from './HubspotForm';
import { textContent } from './textContent';

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
            <div style={{ display: 'flex', justifyContent: 'center', margin: '3em 0' }}>
                <FormContainer
                    slideOut={args.slideOut}
                    slideOutText={args.slideOutText}
                    variant={args.variant}
                >
                    <HubspotForm
                        actionText={args.actionText}
                        formErrors={[]}
                        formFieldGroups={args.formFieldGroups}
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
    formFieldGroups: contactFormData.formFieldGroups,
    slideOut: textContent.slideOut,
    slideOutText: textContent.slideOutText,
    termsAndConditions: textContent.termsAndConditions,
    titleAndDescription: textContent.titleAndDescription,
    variant: textContent.slideDirection,
};

Validation.args = {
    ...Primary.args,
    variant: 'slide-right',
    validationErrors: contactFormData.validationErrors,
};
