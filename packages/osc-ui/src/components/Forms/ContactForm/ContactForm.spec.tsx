import { render, screen } from '@testing-library/react';
import React from 'react';
import { ContactForm } from './ContactForm';
import { contactFormData, termsAndConditions } from '../data';
import { contactFormSchema } from '../formSchemas';
import { SpritesheetProvider } from '../../Icon/Icon';

test('should render the Contact form', () => {
    render(
        <SpritesheetProvider>
            <ContactForm
                actionText={data.actionText}
                description={data.description}
                formError={null}
                formInputs={data.formInputs}
                schema={contactFormSchema}
                setValidationErrors={() => {}}
                termsAndConditions={data.termsAndConditions}
                title={data.title}
                validationErrors={{}}
            />
        </SpritesheetProvider>
    );
    expect(screen.getByRole('textbox', { name: 'First Name *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Last Name *' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Telephone number *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Enquiry *' })).toBeInTheDocument();
});

test('should render validation errors when present', () => {
    const { container } = render(
        <SpritesheetProvider>
            <ContactForm
                actionText={data.actionText}
                description={data.description}
                formError={null}
                formInputs={data.formInputs}
                schema={contactFormSchema}
                setValidationErrors={() => {}}
                termsAndConditions={data.termsAndConditions}
                title={data.title}
                validationErrors={data.validationErrors}
            />
        </SpritesheetProvider>
    );
    expect(container.querySelector('#firstname-error')).toBeInTheDocument();
    expect(container.querySelector('#lastname-error')).toBeInTheDocument();
    expect(container.querySelector('#phone-error')).toBeInTheDocument();
    expect(container.querySelector('#email-error')).toBeInTheDocument();
    expect(container.querySelector('#enquiry-error')).toBeInTheDocument();
});

const data = {
    actionText: contactFormData.actionText,
    description: contactFormData.description,
    formInputs: contactFormData.formInputs,
    termsAndConditions: termsAndConditions,
    title: contactFormData.title,
    validationErrors: contactFormData.validationErrors,
};
