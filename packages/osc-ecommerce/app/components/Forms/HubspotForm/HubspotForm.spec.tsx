import { render, screen } from '@testing-library/react';
import { SpritesheetProvider } from 'osc-ui';
import { contactFormData } from '../data';
import { HubspotForm } from './HubspotForm';
import { textContent } from './textContent';

test('should render the Contact form', () => {
    render(
        <SpritesheetProvider>
            <HubspotForm
                actionText={textContent.actionText}
                formErrors={[]}
                formFieldGroups={contactFormData.formFieldGroups}
                setValidationErrors={() => {}}
                termsAndConditions={textContent.termsAndConditions}
                titleAndDescription={textContent.titleAndDescription}
                validationErrors={{}}
            />
        </SpritesheetProvider>
    );
    expect(screen.getByRole('textbox', { name: 'First name *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Last name *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Phone number *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Message *' })).toBeInTheDocument();
});

test('should render validation errors when present', () => {
    const { container } = render(
        <SpritesheetProvider>
            <HubspotForm
                actionText={textContent.actionText}
                formErrors={[]}
                formFieldGroups={contactFormData.formFieldGroups}
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
    expect(container.querySelector('#message-error')).toBeInTheDocument();
});
