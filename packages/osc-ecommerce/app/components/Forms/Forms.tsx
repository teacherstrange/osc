import { useFetcher, useLoaderData } from '@remix-run/react';
import { Alert } from 'osc-ui';
import type { Dispatch } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { z } from 'zod';
import type { formModule } from '~/types/sanity';
import { FormContainer } from './FormContainer';
import { HubspotForm } from './HubspotForm/HubspotForm';
import type { HubspotFormData, HubspotFormFieldGroups } from './types';
import { getFormFields, getValidationSchema, resetAlert, transitionStates } from './utils';

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
     * Parsed list of styles from Hubspot
     */
    styles: Record<string, unknown>;
    /**
     * Text name for the submit button from Hubspot
     */
    submitText: string;
    /**
     * Success content if submission is successful
     */
    successContent?: string;
    /**
     * Denotes styling options on inputs e.g. Round, Linear, Canvas
     */
    themeName: string;
    /**
     * Validation errors, initially from server, but that can be updated client side
     */
    validationErrors: Record<string, string[]> | {};
}

const Form = (props: FormProps) => {
    const {
        form,
        formErrors,
        formFieldGroups,
        isSubmitting,
        setValidationErrors,
        styles,
        submitText,
        successContent,
        themeName,
        validationErrors,
    } = props;

    // Filter out the form fields (formFieldGroups can also contain RichText only entries)
    const formFields = getFormFields(formFieldGroups);
    const formClassName = form?.formName?.toLowerCase().split(' ').join('-');

    const variants = [formClassName];

    return (
        <FormContainer variants={variants.length > 0 ? variants : undefined}>
            {/* Hidden Inputs added in order to get the form ID and hubspot form field data on submission */}
            <input type="hidden" value={form.formId} name="formId" />
            <input type="hidden" value={JSON.stringify(formFields)} name="hubspotFieldsData" />
            <HubspotForm
                formErrors={formErrors}
                formFieldGroups={formFieldGroups}
                formId={form.formId}
                isSubmitting={isSubmitting}
                setValidationErrors={setValidationErrors}
                styles={styles}
                submitText={submitText}
                successContent={successContent}
                themeName={themeName}
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

    const [successContent, setSuccessContent] = useState<string | undefined>(undefined);

    const [validationErrors, setValidationErrors] = useState<FlattenedErrors | {}>([]);
    const [formErrors, setFormErrors] = useState<string[] | []>([]);
    const [key, setKey] = useState(Date.now());

    const { isAdding, isSubmitting } = transitionStates(fetcher);

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        // Reset the form when form has finished submitting there is a success response
        if (!isAdding && data?.success) {
            if (data.inlineMessage) {
                setSuccessContent(data.inlineMessage);
                // If success message doesn't contain a link then reset after given time period
                if (!data.inlineMessage.includes('href')) {
                    resetAlert(() => setSuccessContent(undefined), 5000);
                }
            }
            formRef.current?.reset();
            setKey(Date.now());
        }
    }, [isAdding, data?.success, data]);

    useEffect(() => {
        // Set errors when present
        if (serverValidationErrors) {
            setValidationErrors(serverValidationErrors);
        }
        if (serverErrors) {
            setFormErrors(() => serverErrors.messages?.map((message: string) => message));
            resetAlert(() => setFormErrors([]), 10000);
        }
    }, [serverValidationErrors, serverErrors]);

    if (!hubspotFormData || !Object.keys(hubspotFormData).length) {
        return <Alert status="error">Unable to load form!</Alert>;
    }

    // Get the form data that matches module formId
    const formData = hubspotFormData[module.formId] as HubspotFormData;

    const schema = getValidationSchema(getFormFields(formData.formFieldGroups));
    type FlattenedErrors = z.inferFlattenedErrors<typeof schema>;

    return (
        <fetcher.Form action="/actions/hubspot" method="post" ref={formRef} noValidate>
            <Form
                form={module}
                formErrors={formErrors}
                formFieldGroups={formData.formFieldGroups}
                isSubmitting={isSubmitting}
                key={key}
                setValidationErrors={setValidationErrors}
                styles={JSON.parse(formData.style)}
                submitText={formData.submitText}
                successContent={successContent}
                themeName={formData.themeName}
                validationErrors={validationErrors}
            />
        </fetcher.Form>
    );
};
