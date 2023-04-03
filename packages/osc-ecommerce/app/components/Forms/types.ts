// ---------------------------------------------
// Hubspot Types
// ---------------------------------------------

// See https://legacydocs.hubspot.com/docs/methods/forms/forms_overview for examples of each property
export interface HubspotFormData {
    /**
     * Read-only; The Hub ID that the form belongs to.
     */
    readonly portalId: number;
    /**
     * Read-only; The internal ID of the form
     */
    readonly guid: string;
    /**
     * The name of the form
     */
    name: string;
    /**
     * @deprecated - This field is no longer used.
     */
    action: string;
    /**
     * Read-only; This will always be POST
     */
    readonly method: string;
    /**
     * The default css classes added to the form when embedded.
     * Can be overridden when embedding the form using the 'cssClass' option.
     */
    cssClass: string;
    /**
     * The URL that the visitor will be redirected to after filling out the form.
     */
    redirect: string;
    /**
     * The text used for the submit button.
     */
    submitText: string;
    /**
     * @deprecated - This field is no longer used.
     */
    //
    followUpId: string;
    /**
     * A comma-separated list of user IDs that should receive submission notifications.
     * Email addresses will be returned for individuals who aren't users.
     */
    notifyRecipients: string;
    /**
     * @deprecated - this field is no longer used.
     */
    leadNurturingCampaignId: string;
    /**
     * A list of field groups. Each group represents a group of fields
     * (displayed as a row when the form is embedded)
     */
    formFieldGroups: HubspotFormFieldGroups[];
    /**
     * Read-only; A Unix timestamp (in milliseconds) for when the form was created.
     */
    readonly createdAt: number;
    /**
     * Read-only; A Unix timestamp (in milliseconds) for when the form was last modified.
     */
    readonly updatedAt: number;
    /**
     *  @deprecated - this field is not used.
     */
    performableHtml: string;
    /**
     * @deprecated - this field is not used.
     */
    migratedFrom: string;
    /**
     * If true, the form will pre-populate fields with known values for know contacts.
     */
    ignoreCurrentValues: boolean;
    /**
     * @deprecated - this field is not used.
     */
    metaData: [];
    /**
     * If false, the form is a system form (such as a blog comment or subscription form) and cannot be deleted.
     * This will default to true and should also be set to true for forms created through the API.
     */
    deletable: boolean;
    /**
     * A thank you message to display on the page after the form is submitted.
     */
    inlineMessage: string;
    /**
     * @deprecated - This field is no longer used.
     */
    tmsId: string;
    /**
     * Will be set to true for forms with captcha enabled.
     * If you're submitting form data through the API, this should be set to false, and any captcha
     * or other spam protection should be implemented in your form before sending the data to HubSpot
     */
    captchaEnabled: boolean;
    /**
     *  @deprecated - this field is not used.
     */
    campaignGuid: string;
    /**
     * Whether or not the form can be cloned. Forms created through the API should
     * leave this as true (the default).
     */
    cloneable: boolean;
    /**
     * Whether or not the form can be edited. Forms created through the API should
     * leave this as true (the default).
     */
    editable: boolean;
    /**
     * @deprecated - Will always be HUBSPOT
     */
    formType: string;
    /**
     * Read-only; A Unix timestamp (in milliseconds) for when the form was deleted
     * This will effectively always be 0 as deleted forms are not available through the API.
     */
    readonly deletedAt: number;
    /**
     * Not in official docs, but returned from v2 Forms API - This denotes styling options on inputs e.g. Round, Linear, Canvas
     */
    themeName: string;
    /**
     * Not in official docs, but returned from v2 Forms API - Returns styles in a JSON Stringified format
     */
    style: string;
}

export interface HubspotFormFieldGroups {
    fields: HubspotFormFieldTypes[];
    default: boolean;
    isSmartGroup: boolean;
    richText: HubspotRichText;
    isPageBreak: boolean;
}

export interface HubspotFormFieldTypes {
    /**
     * The name of the field. This needs to match the internal name of a contact property.
     */
    name: string;
    /**
     * The label that will appear for the field.
     */
    label: string;
    /**
     * One of string, number, date, datetime, or enumeration
     * This needs to match the 'type' field of the corresponding contact property.
     */
    type: string;
    /**
     * One of textarea, text, date, file, number, select, radio, checkbox, or booleancheckbox
     * The type of field that will be used when the form is embedded.
     */
    fieldType: string;
    /**
     * The help text that displays below the label.
     */
    description: string;
    /**
     * @deprecated - this field is not used.
     */
    groupName: string;
    /**
     * The order to display the fields in.
     * If the values are negative, the fields appear in the order they appear in the 'fields' list
     */
    displayOrder: number;
    /**
     * Required fields must be filled out to submit the form.
     */
    required: boolean;
    /**
     * For enumerated fields, this will be a list of Strings representing
     * the options that will be selected by default
     */
    //
    selectedOptions: string[];
    /**
     * For enumerated fields, this will be a list of Strings representing the available options for the field
     * Will be empty for non-enumerated fields.
     */
    options: SelectAndCheckboxOptions[];
    /**
     * A set of options controlling the validation for the field
     * NOTE: These options should NOT be modified through the API. Any validation
     * should be set up in the form settings in HubSpot.
     */
    validation: {
        name: string;
        message: string;
        data: string;
        useDefaultBlockList: boolean;
        blockedEmailAddresses: [];
    };
    /**
     * @deprecated - this field is not used.
     */
    enabled: boolean;
    /**
     * When set to true, the field will be rendered as a hidden field.
     */
    hidden: boolean;
    /**
     * The default value of the field
     */
    defaultValue: string;
    /**
     * Whether or not the field is a smart field.
     * Smart fields are hidden if the visitor is a known contact that already has a value for the field.)
     */
    isSmartField: boolean;
    /**
     * @deprecated - this field is not used.
     */
    unselectedLabel: string;
    /**
     * The placeholder text for the field, which will display
     */
    placeholder: string;
    /**
     * A list of filters that will be used to display dependent fields.
     */
    dependentFieldFilters: [];
    /**
     * @deprecated - this field is not used.
     */
    labelHidden: boolean;
    /**
     * Not listed in docs, but is returned from API
     */
    propertyObjectType: string;
    /**
     * @deprecated - this field is not used.
     */
    metaData: [];
    /**
     * Not listed in docs, but is returned from API
     */
    objectTypeId: string;
}

export interface HubspotRichText {
    content: string;
    type: string;
}

export interface SelectAndCheckboxOptions {
    label: string;
    value: string;
    displayOrder?: number;
    doubleData?: number;
    hidden?: boolean;
    description?: string;
    readOnly?: boolean;
}

export interface SuccessfulSubmission {
    message: string;
    as: string;
    url?: string | undefined;
}
