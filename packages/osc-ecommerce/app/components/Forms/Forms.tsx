import { Form as RemixForm, useActionData, useTransition } from '@remix-run/react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { z } from 'zod';
import type { formModule } from '~/types/sanity';
import { ContactForm } from './ContactForm/ContactForm';
import { contactFormData } from './data';
import { FormContainer } from './FormContainer';
import { contactFormSchema } from './formSchemas';
import type { ContactFormFieldErrors } from './types';

const schema = contactFormSchema;

type FlattenedErrors = z.inferFlattenedErrors<typeof schema>;
interface FormProps {
    form: formModule;
    formErrors: string[] | [];
    formRef: MutableRefObject<HTMLFormElement>;
    isSubmitting: boolean;
    setValidationErrors: Dispatch<SetStateAction<any>>;
    validationErrors: Record<string, any>;
}

const Form = (props: FormProps) => {
    const { form, formRef, formErrors, isSubmitting, setValidationErrors, validationErrors } =
        props;

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
                    <RemixForm ref={formRef} method="post" noValidate>
                        <ContactForm
                            actionText={form.actionText}
                            formErrors={formErrors}
                            formInputs={contactFormData.formInputs}
                            isSubmitting={isSubmitting}
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
    const data = useActionData();

    const fieldErrors = data?.fieldErrors as FlattenedErrors;
    const [validationErrors, setValidationErrors] = useState<FlattenedErrors | {}>([]);
    const [formErrors, setFormErrors] = useState<string[] | []>([]);

    const transition = useTransition();
    const isSubmitting = transition.state === 'submitting';
    let isAdding =
        transition.state === 'submitting' &&
        transition.submission.formData.get('_action') === 'create';

    const formRef = useRef<HTMLFormElement>();

    useEffect(() => {
        // Reset the form when form has finished submitting there is a success response
        if (!isAdding && data?.success) {
            formRef.current?.reset();
        }
    }, [isAdding, data?.success]);

    useEffect(() => {
        // Set errors when present
        if (fieldErrors) {
            setValidationErrors(fieldErrors);
        }
        if (data?.errors) {
            setFormErrors(() => data.errors?.messages.map((message: string) => message));
        }
    }, [fieldErrors, data?.errors]);

    return (
        <Form
            form={module}
            formErrors={formErrors}
            formRef={formRef}
            isSubmitting={isSubmitting}
            setValidationErrors={setValidationErrors}
            validationErrors={validationErrors}
        />
    );
};
