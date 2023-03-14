import { Form as RemixForm } from '@remix-run/react';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { formModule, TypesOfForm } from '~/types/sanity';
import { ContactForm } from './ContactForm/ContactForm';
import { contactFormData } from './data';
import { FormContainer } from './FormContainer';
import { contactFormSchema } from './formSchemas';
import type { ContactFormFieldErrors } from './types';

interface FormProps {
    form: TypesOfForm;
    formErrors: string[];
    // TODO - Add formRef for resetting the form on submit
    // formRef: MutableRefObject<undefined>;
    // TODO - Add isSubmitting
    // isSubmitting: boolean;
    setValidationErrors: Dispatch<SetStateAction<any>>;
    validationErrors: Record<string, any>;
}

const Form = (props: FormProps) => {
    const { form, formErrors, setValidationErrors, validationErrors } = props;

    switch (form._type) {
        case 'form.contactForm':
            const titleAndDescription = form.titleAndDescription;
            const termsAndConditions = form.termsAndConditions;
            const actionText = form.actionText;

            const contactValidationErrors = validationErrors as ContactFormFieldErrors;
            const setContactValidationErrors = setValidationErrors as Dispatch<
                SetStateAction<ContactFormFieldErrors | {}>
            >;

            return (
                <RemixForm method="post" noValidate>
                    <FormContainer variant="slide-out">
                        <ContactForm
                            actionText={actionText}
                            formErrors={formErrors}
                            formInputs={contactFormData.formInputs}
                            schema={contactFormSchema}
                            setValidationErrors={setContactValidationErrors}
                            termsAndConditions={termsAndConditions}
                            titleAndDescription={titleAndDescription}
                            validationErrors={contactValidationErrors}
                        />
                    </FormContainer>
                </RemixForm>
            );

        default:
            return null;
    }
};

export const Forms = (props: { module: formModule }) => {
    const { module } = props;
    // TODO - validationErrors and formErrors will get pulled in server side with a useActionData and set through a useEffect
    const [validationErrors, setValidationErrors] = useState([]);

    // TODO - form errors (which will be errors on whole form rather than validation, e.g. hubspot down) will come from server side through useActionData
    const formErrors: string[] = [];

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {module.form.map((form) => (
                <Form
                    form={form}
                    formErrors={formErrors}
                    key={form._key}
                    setValidationErrors={setValidationErrors}
                    validationErrors={validationErrors}
                />
            ))}
        </div>
    );
};
