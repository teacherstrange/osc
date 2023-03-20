import { render, screen } from '@testing-library/react';
import { SpritesheetProvider } from 'osc-ui';
import { contactFormData } from '../data';
import { contactFormSchema } from '../formSchemas';
import { HubspotForm } from './HubspotForm';
import { textContent } from './textContent';

test('should render the Contact form', () => {
    render(
        <SpritesheetProvider>
            <HubspotForm
                actionText={textContent.actionText}
                formErrors={[]}
                formInputs={contactFormData.formInputs}
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
            <HubspotForm
                actionText={textContent.actionText}
                formErrors={[]}
                formInputs={contactFormData.formInputs}
                schema={contactFormSchema}
                setValidationErrors={() => {}}
                termsAndConditions={textContent.termsAndConditions}
                titleAndDescription={textContent.titleAndDescription}
                validationErrors={contactFormData.validationErrors}
            />
        </SpritesheetProvider>
    );
    expect(container.querySelector('#firstname-error')).toBeInTheDocument();
    expect(container.querySelector('#lastname-error')).toBeInTheDocument();
    expect(container.querySelector('#phone-error')).toBeInTheDocument();
    expect(container.querySelector('#email-error')).toBeInTheDocument();
    expect(container.querySelector('#enquiry-error')).toBeInTheDocument();
});
