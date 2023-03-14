import { render, screen } from '@testing-library/react';
import { ContactForm } from './ContactForm';
import { contactFormData, termsAndConditions } from '../data';
import { textContent } from './textContent';
import { contactFormSchema } from '../formSchemas';
import { SpritesheetProvider } from 'osc-ui';

test('should render the Contact form', () => {
    render(
        <SpritesheetProvider>
            <ContactForm
                actionText={textContent.actionText}
                formErrors={[]}
                formInputs={data.formInputs}
                schema={contactFormSchema}
                setValidationErrors={() => {}}
                termsAndConditions={textContent.termsAndConditions}
                titleAndDescription={textContent.titleAndDescription}
                validationErrors={{}}
            />
        </SpritesheetProvider>
    );
    expect(screen.getByRole('textbox', { name: 'First Name *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Last Name *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Telephone number *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Enquiry *' })).toBeInTheDocument();
});

test('should render validation errors when present', () => {
    const { container } = render(
        <SpritesheetProvider>
            <ContactForm
                actionText={textContent.actionText}
                formErrors={[]}
                formInputs={data.formInputs}
                schema={contactFormSchema}
                setValidationErrors={() => {}}
                termsAndConditions={textContent.termsAndConditions}
                titleAndDescription={textContent.titleAndDescription}
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
