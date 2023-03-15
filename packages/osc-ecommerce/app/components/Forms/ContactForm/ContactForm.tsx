import type { PortableTextBlock } from '@portabletext/types';
import { Alert, Button, Content } from 'osc-ui';
import type { Dispatch, SetStateAction } from 'react';
import type { contactFormSchema } from '../formSchemas';
import { getFormInput } from '../utils';

import type { ContactFormFieldErrors, TextAreaType, TextInputType } from '../types';

export type FormInputs = Partial<TextInputType | TextAreaType>;

export interface ContactFormProps {
    /**
     * Sets the text for the form button
     * @default 'Send Enquiry'
     */
    actionText: string;
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
    termsAndConditions?: PortableTextBlock[];
    /**
     * Title and description for the form
     */
    titleAndDescription?: PortableTextBlock[];
    /**
     * A list of validation errors
     */
    validationErrors: ContactFormFieldErrors | {};
}

export const ContactForm = (props: ContactFormProps) => {
    const {
        actionText = 'Send Enquiry',
        titleAndDescription,
        formInputs,
        formErrors,
        isSubmitting = false,
        schema,
        setValidationErrors,
        termsAndConditions,
        validationErrors,
    } = props;

    return (
        <div className="c-form c-form__contact">
            <div className="c-form__inner-container">
                {titleAndDescription ? <Content value={titleAndDescription} /> : null}
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
                              {error}
                          </Alert>
                      ))
                    : null}
                {termsAndConditions ? <Content value={termsAndConditions} /> : null}
            </div>
        </div>
    );
};
