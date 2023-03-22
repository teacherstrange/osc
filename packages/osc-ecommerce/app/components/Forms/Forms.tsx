import { useFetcher, useLoaderData } from '@remix-run/react';
import { Alert } from 'osc-ui';
import type { Dispatch } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { z } from 'zod';
import type { formModule } from '~/types/sanity';
import { FormContainer } from './FormContainer';
import { HubspotForm } from './HubspotForm/HubspotForm';
import type { HubspotFormFieldGroups } from './types';
import { getFormFields, getValidationSchema, transitionStates } from './utils';

interface FormProps {
    /**
     * Data from Sanity, e.g. Description, Title etc...
     */
    form: formModule;
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
    isSubmitting: boolean;
    /**
     * Dispatch used for setting errors client side validation errors
     */
    setValidationErrors: Dispatch<{} | Record<string, string[]>>;
    /**
     * Text name for the submit button from Hubspot
     */
    submitText: string;
    /**
     * Validation errors, initially from server, but that can be updated client side
     */
    validationErrors: Record<string, string[]> | {};
}

const Form = (props: FormProps) => {
    const {
        form,
        formFieldGroups,
        formErrors,
        isSubmitting,
        setValidationErrors,
        submitText,
        validationErrors,
    } = props;

    // Filter out the form fields (formFieldGroups can also contain RichText only entries)
    const formFields = getFormFields(formFieldGroups);

    return (
        <FormContainer
            slideOut={form.slideOut}
            slideOutText={form.slideOutText}
            variant={form.slideDirection}
        >
            {/* Hidden Inputs added in order to get the form ID and hubspot form field data on submission */}
            <input type="hidden" value={form.formId} name="formId" />
            <input type="hidden" value={JSON.stringify(formFields)} name="hubspotFieldsData" />
            <HubspotForm
                formErrors={formErrors}
                formFieldGroups={formFieldGroups}
                isSubmitting={isSubmitting}
                setValidationErrors={setValidationErrors}
                submitText={submitText}
                validationErrors={validationErrors}
            />
        </FormContainer>
    );
};

export const Forms = (props: { module: formModule }) => {
    // Module data coming from Sanity
    const { module } = props;
    // Data coming back when the form has been submitted - e.g. transition state and any server errors
    const fetcher = useFetcher();
    const data = fetcher.data;

    // Form field data from hubspot which gets loaded through the route
    const { hubspotFormData } = useLoaderData();

    const serverValidationErrors = data?.validationErrors?.fieldErrors as FlattenedErrors;
    const serverErrors = data?.formErrors;

    const [validationErrors, setValidationErrors] = useState<FlattenedErrors | {}>([]);
    const [formErrors, setFormErrors] = useState<string[] | []>([]);

    const { isAdding, isSubmitting } = transitionStates(fetcher);

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        // Reset the form when form has finished submitting there is a success response
        if (!isAdding && data?.success) {
            formRef.current?.reset();
        }
    }, [isAdding, data?.success]);

    useEffect(() => {
        // Set errors when present
        if (serverValidationErrors) {
            setValidationErrors(serverValidationErrors);
        }
        if (serverErrors) {
            setFormErrors(() => serverErrors.messages?.map((message: string) => message));
        }
    }, [serverValidationErrors, serverErrors]);

    if (!hubspotFormData || !Object.keys(hubspotFormData).length) {
        return <Alert status="error">Unable to load form!</Alert>;
    }

    const schema = getValidationSchema(hubspotFormData[module.formId].formFieldGroups);

    type FlattenedErrors = z.inferFlattenedErrors<typeof schema>;

    const formClassName = module?.formName?.toLowerCase().split(' ').join('-');

    return (
        <div className={`c-form__${formClassName}`}>
            <fetcher.Form action="/actions/hubspot" method="post" ref={formRef} noValidate>
                <Form
                    form={module}
                    formErrors={formErrors}
                    formFieldGroups={
                        hubspotFormData[module.formId].formFieldGroups as HubspotFormFieldGroups[]
                    }
                    isSubmitting={isSubmitting}
                    setValidationErrors={setValidationErrors}
                    submitText={hubspotFormData[module.formId].submitText}
                    validationErrors={validationErrors}
                />
            </fetcher.Form>
        </div>
    );
};
