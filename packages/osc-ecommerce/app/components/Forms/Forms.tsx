import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { formModule, TypesOfForm } from '~/types/sanity';
import { ContactForm } from './ContactForm/ContentForm';
import { contactFormData } from './data';
import { FormContainer } from './FormContainer';
import { contactFormSchema } from './formSchemas';
import type { ContactFormFieldErrors } from './types';

interface FormProps {
    form: TypesOfForm;
    setValidationErrors: Dispatch<SetStateAction<unknown>>;
    validationErrors: Record<string, any>;
}

const Form = (props: FormProps) => {
    const { form, setValidationErrors, validationErrors } = props;

    switch (form._type) {
        case 'form.contactForm':
            const description = form.description[0].children[0].text;
            const termsAndConditions = form.termsAndConditions[0].children[0].text;
            const title = form.title;

            const contactValidationErrors = validationErrors as ContactFormFieldErrors;
            const setContactValidationErrors = setValidationErrors as Dispatch<
                SetStateAction<ContactFormFieldErrors | {}>
            >;
            return (
                <FormContainer variant="slide-out">
                    <ContactForm
                        actionText={contactFormData.actionText}
                        description={description}
                        // This will need updating to a piece of state - should represent any overall form errors
                        // as opposed to server validation errors
                        formErrors={[]}
                        formInputs={contactFormData.formInputs}
                        schema={contactFormSchema}
                        setValidationErrors={setContactValidationErrors}
                        termsAndConditions={termsAndConditions}
                        title={title}
                        validationErrors={contactValidationErrors}
                    />
                </FormContainer>
            );

        default:
            return null;
    }
};

export const Forms = (props: { module: formModule; errors: any }) => {
    const { errors, module } = props;
    const [validationErrors, setValidationErrors] = useState(errors);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {module.form.map((form) => (
                <Form
                    form={form}
                    key={form._key}
                    setValidationErrors={setValidationErrors}
                    validationErrors={validationErrors}
                />
            ))}
        </div>
    );
};
