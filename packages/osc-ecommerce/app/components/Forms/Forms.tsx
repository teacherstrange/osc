import { Form as RemixForm } from '@remix-run/react';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { formModule } from '~/types/sanity';
import { ContactForm } from './ContactForm/ContactForm';
import { contactFormData } from './data';
import { FormContainer } from './FormContainer';
import { contactFormSchema } from './formSchemas';
import type { ContactFormFieldErrors } from './types';

interface FormProps {
    form: formModule;
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

    switch (form.formId) {
        case 'contact-form':
            const contactValidationErrors = validationErrors as ContactFormFieldErrors;
            const setContactValidationErrors = setValidationErrors as Dispatch<
                SetStateAction<ContactFormFieldErrors | {}>
            >;

            return (
                <FormContainer
                    slideOut={form.slideOut}
                    slideOutText={form.slideOutText}
                    variant={form.slideDirection}
                >
                    <RemixForm method="post" noValidate>
                        <ContactForm
                            actionText={form.actionText}
                            formErrors={formErrors}
                            formInputs={contactFormData.formInputs}
                            schema={contactFormSchema}
                            setValidationErrors={setContactValidationErrors}
                            termsAndConditions={form.termsAndConditions}
                            titleAndDescription={form.titleAndDescription}
                            validationErrors={contactValidationErrors}
                        />
                    </RemixForm>
                </FormContainer>
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
        <Form
            form={module}
            formErrors={formErrors}
            setValidationErrors={setValidationErrors}
            validationErrors={validationErrors}
        />
    );
};
