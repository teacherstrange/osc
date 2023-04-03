import { Alert, Button } from 'osc-ui';
import type { Dispatch, SetStateAction } from 'react';
import type { HubspotFormFieldGroups } from '../types';
import {
    getFormFields,
    getInputOrContent,
    getValidationSchema,
    inverseSubmitButton,
} from '../utils';

export interface HubspotFormProps {
    /**
     * Errors on the whole form, such as failure to submit due to network failure
     */
    formErrors: string[] | [];
    /**
     * Form fields data from Hubspot, e.g. firstname, email etc...
     */
    formFieldGroups: HubspotFormFieldGroups[];
    /**
     * Hubspot form Id
     */
    formId: string;
    /**
     * Transition state when form is being submitted - used to show pending state on submit button
     */
    isSubmitting?: boolean;
    /**
     * Dispatch used for setting errors client side validation errors
     */
    setValidationErrors: Dispatch<SetStateAction<{} | Record<string, string[]>>>;
    /**
     * Parsed list of styles from Hubspot
     */
    styles?: Record<string, any>;
    /**
     * Text name for the submit button from Hubspot
     */
    submitText: string;
    /**
     * Denotes styling options on inputs e.g. Round, Linear, Canvas
     */
    themeName?: string;
    /**
     * A list of validation errors
     */
    validationErrors: Record<string, string[]> | {};
}

export const HubspotForm = (props: HubspotFormProps) => {
    const {
        formErrors,
        formFieldGroups,
        formId,
        isSubmitting = false,
        setValidationErrors,
        styles,
        submitText,
        themeName,
        validationErrors,
    } = props;

    const validationSchema = getValidationSchema(getFormFields(formFieldGroups));

    const inversedSubmitButton = inverseSubmitButton(styles);

    const formFields = formFieldGroups?.map((data, index) =>
        getInputOrContent(
            data,
            formId,
            index,
            validationSchema,
            setValidationErrors,
            validationErrors,
            styles,
            themeName
        )
    );

    const hubspotForm = formFields.map((field, index) => {
        if (!field) return null;
        // Inputs will be in an array, but content will not be, so check for array
        if (Array.isArray(field) && field.length > 0) {
            return (
                <div key={index} className="c-form__inputs-container">
                    {field.map((field, fieldIndex) => (
                        <div className="c-form__input" key={fieldIndex}>
                            {field}
                        </div>
                    ))}
                </div>
            );
        }
        return (
            <div key={index} className="c-form__content-container">
                {field}
            </div>
        );
    });

    return (
        <div className="c-form c-form__hubspot">
            <div className="c-form__inner-container">
                {hubspotForm}
                <Button
                    isLoading={isSubmitting}
                    loadingText="Submitting"
                    variant="primary"
                    disabled={isSubmitting}
                    name="_action"
                    value="submitHubspotForm"
                    isInversed={!!inversedSubmitButton}
                >
                    {submitText}
                </Button>
                {formErrors && formErrors.length > 0
                    ? formErrors.map((error, index) => (
                          <Alert key={index} status="error">
                              {error}
                          </Alert>
                      ))
                    : null}
            </div>
        </div>
    );
};
