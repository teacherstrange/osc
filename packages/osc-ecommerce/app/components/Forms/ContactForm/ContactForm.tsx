import type { Dispatch, SetStateAction } from 'react';

import { Alert, Button } from 'osc-ui';
import type { contactFormSchema } from '../formSchemas';

// import '../forms.scss';
import { getFormInput } from '../utils';

import type { ContactFormFieldErrors, TextAreaType, TextInputType } from '../types';

type FormInputs = TextInputType | TextAreaType;

export interface ContactFormProps {
    /**
     * Sets the text for the form button
     */
    actionText: string;
    /**
     * Sets a description for the form
     */
    description?: string;
    /**
     * An array of the Form Inputs
     */
    formInputs: FormInputs[];
    /**
     * Errors on the whole form, such as failure to submit due to network failure
     */
    formErrors: string[];
    /**
     * Transition state when form is being submitted - used to show pending state on submit button
     */
    isSubmitting?: boolean;
    /**
     * The schema used for validating the form
     */
    schema: typeof contactFormSchema;
    /**
     * Dispatch used for setting errors client side validation errors
     */
    setValidationErrors: Dispatch<SetStateAction<{} | ContactFormFieldErrors>>;
    /**
     * Terms and conditions for the form
     */
    termsAndConditions?: string;
    /**
     * Title of the form
     */
    title?: string;
    /**
     * A list of validation errors
     */
    validationErrors: ContactFormFieldErrors | {};
}

export const ContactForm = (props: ContactFormProps) => {
    const {
        actionText,
        description,
        formInputs,
        formErrors,
        isSubmitting = false,
        schema,
        setValidationErrors,
        termsAndConditions,
        title,
        validationErrors,
    } = props;

    return (
        <div className="c-form c-form__contact">
            <h3>{title}</h3>
            <div className="c-form__inner-container">
                <p className="c-form__description">{description}</p>
                {formInputs?.map((data, index) => {
                    return getFormInput(data, index, schema, setValidationErrors, validationErrors);
                })}
                <Button
                    isLoading={isSubmitting}
                    variant="primary"
                    disabled={isSubmitting}
                    name="_action"
                    value="create"
                >
                    {actionText}
                </Button>
                {formErrors && formErrors.length > 0
                    ? formErrors.map((error, index) => (
                          <Alert key={index} status="error">
                              {' '}
                              {error}
                          </Alert>
                      ))
                    : null}

                <p className="c-form__terms"> {termsAndConditions}</p>
            </div>
        </div>
    );
};
