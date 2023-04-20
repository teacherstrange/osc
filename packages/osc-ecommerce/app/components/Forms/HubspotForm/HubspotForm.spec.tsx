import { render, screen } from '@testing-library/react';
import { SpritesheetProvider } from 'osc-ui';
import { FormContainer } from '../FormContainer';
import { mockHubspotFormData, validationErrors } from '../mockData';
import { HubspotForm } from './HubspotForm';

const FORM_ID = 'fe5ae92f-faeb-4d04-b8e0-72619d5459f5';

test('should render hubspot form', () => {
    render(
        <SpritesheetProvider>
            <FormContainer>
                <HubspotForm
                    formErrors={[]}
                    formId={FORM_ID}
                    formFieldGroups={mockHubspotFormData.formFieldGroups}
                    setValidationErrors={() => {}}
                    submitText={mockHubspotFormData.submitText}
                    validationErrors={{}}
                />
            </FormContainer>
        </SpritesheetProvider>
    );

    expect(screen.getByRole('textbox', { name: 'First name *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Last name *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Phone number *' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email *' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'interests' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'enquiryorigin' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'call_back_hour' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'call_back_minute' })).toBeInTheDocument();
    expect(
        screen.getByRole('checkbox', { name: 'Call me as soon as possible' })
    ).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Yes' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'No' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enrol Now' })).toBeInTheDocument();
});

test('should render validation errors when present', () => {
    const { container } = render(
        <SpritesheetProvider>
            <HubspotForm
                formErrors={[]}
                formId={FORM_ID}
                formFieldGroups={mockHubspotFormData.formFieldGroups}
                setValidationErrors={() => {}}
                submitText={mockHubspotFormData.submitText}
                validationErrors={validationErrors}
            />
        </SpritesheetProvider>
    );

    expect(container.querySelector(`#firstname_${FORM_ID}-error`)).toBeInTheDocument();
    expect(container.querySelector(`#lastname_${FORM_ID}-error`)).toBeInTheDocument();
    expect(container.querySelector(`#phone_${FORM_ID}-error`)).toBeInTheDocument();
    expect(container.querySelector(`#email_${FORM_ID}-error`)).toBeInTheDocument();
    expect(container.querySelector('#interests-error')).toBeInTheDocument();
    expect(container.querySelector('#enquiryorigin-error')).toBeInTheDocument();
    expect(container.querySelector('#call_back_hour-error')).toBeInTheDocument();
    expect(container.querySelector('#call_back_minute-error')).toBeInTheDocument();
    expect(container.getElementsByClassName('c-checkbox__error-message')[0]).toBeInTheDocument();
    expect(container.getElementsByClassName('c-radio-group__error-message')[0]).toBeInTheDocument();
});
