import { render, screen } from '@testing-library/react';
import { SpritesheetProvider } from 'osc-ui';
import { hubspotFormData, validationErrors } from '../mockData';
import { HubspotForm } from './HubspotForm';
import { textContent } from './textContent';

test('should render the Contact form', () => {
    render(
        <SpritesheetProvider>
            <HubspotForm
                formErrors={[]}
                formFieldGroups={hubspotFormData.formFieldGroups}
                setValidationErrors={() => {}}
                submitText={textContent.submitText}
                validationErrors={{}}
            />
        </SpritesheetProvider>
    );

    expect(
        screen.getByRole('heading', {
            name: /Contact Us/i,
        })
    ).toBeInTheDocument();
    expect(
        screen.getByText(/Our student advisors are eager to help - call us now on/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /0330 8222686./i })).toBeInTheDocument();
    expect(
        screen.getByText(/Alternatively fill out the form below and we'll get back to you./i)
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'First name *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Last name *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Phone number *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Message *' })).toBeInTheDocument();
    expect(
        screen.getByText(
            /By completing this form you are expressing interest in Open Study College. We will send you information about our courses and any special offers we think will be useful to you. You will be able to unsubscribe at anytime. See/i
        )
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Privacy Policy/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Enquiry/i })).toBeInTheDocument();
});

test('should render validation errors when present', () => {
    const { container } = render(
        <SpritesheetProvider>
            <HubspotForm
                formErrors={[]}
                formFieldGroups={hubspotFormData.formFieldGroups}
                setValidationErrors={() => {}}
                submitText={textContent.submitText}
                validationErrors={validationErrors}
            />
        </SpritesheetProvider>
    );

    expect(container.querySelector('#firstname-error')).toBeInTheDocument();
    expect(container.querySelector('#lastname-error')).toBeInTheDocument();
    expect(container.querySelector('#phone-error')).toBeInTheDocument();
    expect(container.querySelector('#email-error')).toBeInTheDocument();
    expect(container.querySelector('#message-error')).toBeInTheDocument();
});
