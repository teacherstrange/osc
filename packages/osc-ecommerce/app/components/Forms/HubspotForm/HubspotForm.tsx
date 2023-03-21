import type { PortableTextBlock } from '@portabletext/types';
import { Alert, Button, Content } from 'osc-ui';
import type { Dispatch, SetStateAction } from 'react';
import type { HubspotFormFieldGroups } from '../types';
import { getFormFields, getInputType, getValidationSchema } from '../utils';

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
     * Transition state when form is being submitted - used to show pending state on submit button
     */
    isSubmitting?: boolean;
    /**
     * Dispatch used for setting errors client side validation errors
     */
    setValidationErrors: Dispatch<SetStateAction<{} | Record<string, string[]>>>;
    /**
     * Text name for the submit button from Hubspot
     */
    submitText: string;
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
    validationErrors: Record<string, string[]> | {};
}

export const HubspotForm = (props: HubspotFormProps) => {
    const {
        formErrors,
        formFieldGroups,
        isSubmitting = false,
        setValidationErrors,
        submitText,
        termsAndConditions,
        titleAndDescription,
        validationErrors,
    } = props;

    const validationSchema = getValidationSchema(getFormFields(formFieldGroups));

    return (
        <div className="c-form c-form__contact">
            <div className="c-form__inner-container">
                {titleAndDescription ? <Content value={titleAndDescription} /> : null}
                {formFieldGroups?.map((data, index) => {
                    return getInputType(
                        data,
                        index,
                        validationSchema,
                        setValidationErrors,
                        validationErrors
                    );
                })}
                <Button
                    isLoading={isSubmitting}
                    variant="primary"
                    disabled={isSubmitting}
                    name="_action"
                    value="submitHubspotForm"
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
                {termsAndConditions ? <Content value={termsAndConditions} /> : null}
            </div>
        </div>
    );
};
