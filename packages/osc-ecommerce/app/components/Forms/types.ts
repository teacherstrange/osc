// ----------------------------------------------
// Form Input Types
// ----------------------------------------------

export type baseFormType = {
    classes?: string;
    layout?: string;
    inputType: string;
};

export interface TextInputType extends baseFormType {
    id: string;
    inputMode?:
        | 'search'
        | 'text'
        | 'none'
        | 'tel'
        | 'url'
        | 'email'
        | 'numeric'
        | 'decimal'
        | undefined;
    name: string;
    pattern?: string;
    placeholder?: string;
    required: boolean;
    type?: string;
    variants?: Variants[];
}

export interface TextAreaType extends baseFormType {
    id: string;
    name: string;
    required: boolean;
}

export interface SelectItems extends baseFormType {
    name: string;
    value: string;
}

export interface SelectType extends baseFormType {
    description?: { label: string };
    name: string;
    placeholder?: string;
    selectItems: SelectItems[];
}

export interface DatePickerType extends baseFormType {
    name: string;
    label: string;
}

export interface CheckboxType extends baseFormType {
    description: {
        id: string;
        value: string;
    };
    id: string;
    name: string;
    value: string;
}

export interface TwoXColType extends baseFormType {
    description: string;
    nestedData: (
        | TextInputType
        | TextAreaType
        | SelectItems
        | SelectType
        | DatePickerType
        | CheckboxType
    )[];
}

type Variants = 'secondary' | 'tertiary' | 'quaternary';

// --------------------------------------------------------
// Error Types
// --------------------------------------------------------

type BaseContactDataErrors = {
    email: string[];
    firstname: string[];
    lastname: string[];
    phone: string[];
};

export interface CallBackFormFieldErrors extends BaseContactDataErrors {
    courses: string[];
    enquiryOrigin: string[];
    hours: string[];
    minutes: string[];
    date: string[];
}

export interface ContactFormFieldErrors extends BaseContactDataErrors {
    enquiry: string[];
}

export type NewsLetterFormFieldErrors = {
    email: string[];
    name: string[];
};

export interface ProspectusFormFieldErrors extends BaseContactDataErrors {
    enquiryOrigin: string[];
}

// ---------------------------------------------
// Hubspot Types
// ---------------------------------------------

export interface HubspotFormData {
    // Read-only; The Hub ID that the form belongs to.
    portalId: number;
    // Read-only; The internal ID of the form
    guid: string;
    //  The name of the form
    name: string;
    // DEPRECATED - This field is no longer used.
    action: string;
    // Read-only; This will always be POST
    method: string;
    // The default css classes added to the form when embedded.
    // Can be overridden when embedding the form using the 'cssClass' option.
    cssClass: string;
    //  The URL that the visitor will be redirected to after filling out the form.
    redirect: string;
    //  The text used for the submit button.
    submitText: string;
    // DEPRECATED - This field is no longer used.
    followUpId: string;
    // A comma-separated list of user IDs that should receive submission notifications. Email addresses will be returned for individuals who aren't users.
    notifyRecipients: string;
    // DEPRECATED - this field is no longer used.
    leadNurturingCampaignId: string;
    // A list of field groups. Each group represents a group of fields (displayed as a row when the form is embedded)
    formFieldGroups: HubspotFormFieldGroups[];
    // Read-only; A Unix timestamp (in milliseconds) for when the form was created.
    createdAt: number;
    // Read-only; A Unix timestamp (in milliseconds) for when the form was last modified.
    updatedAt: number;
    // DEPRECATED - this field is not used.
    performableHtml: string;
    // DEPRECATED - this field is not used.
    migratedFrom: string;
    // If true, the form will pre-populate fields with known values for know contacts.
    ignoreCurrentValues: boolean;
    // DEPRECATED - this field is not used.
    metaData: [];
    // If false, the form is a system form (such as a blog comment or subscription form) and cannot be deleted.
    // This will default to true and should also be set to true for forms created through the API.
    deletable: boolean;
    // A thank you message to display on the page after the form is submitted.
    inlineMessage: string;
    // DEPRECATED - This field is no longer used.
    tmsId: string;
    // Will be set to true for forms with captcha enabled.
    // If you're submitting form data through the API, this should be set to false, and any captcha or other spam protection
    // should be implemented in your form before sending the data to HubSpot
    captchaEnabled: boolean;
    // DEPRECATED - this field is not used.
    campaignGuid: string;
    // Whether or not the form can be cloned. Forms created through the API should leave this as true (the default).
    cloneable: boolean;
    // Whether or not the form can be edited. Forms created through the API should leave this as true (the default).
    editable: boolean;
    //  This fields is deprecated and will always be HUBSPOT
    formType: string;
    //  read-only; A Unix timestamp (in milliseconds) for when the form was deleted
    // This will effectively always be 0 as deleted forms are not available through the API.
    deletedAt: number;
}

export interface HubspotFormFieldGroups {
    fields: HubspotFormFieldTypes[];
    default: boolean;
    isSmartGroup: boolean;
    richText: HubspotRichText;
    isPageBreak: boolean;
}

export interface HubspotFormFieldTypes {
    // The name of the field. This needs to match the internal name of a contact property.
    name: string;
    //  The label that will appear for the field.
    label: string;
    // One of string, number, date, datetime, or enumeration
    // This needs to match the 'type' field of the corresponding contact property.
    type: string;
    // One of textarea, text, date, file, number, select, radio, checkbox, or booleancheckbox
    // The type of field that will be used when the form is embedded.
    fieldType: string;
    // The help text that displays below the label.
    description: string;
    // DEPRECATED - this field is not used.
    groupName: string;
    // The order to display the fields in.
    // If the values are negative, the fields appear in the order they appear in the 'fields' list
    displayOrder: number;
    // Required fields must be filled out to submit the form.
    required: boolean;
    // For enumerated fields, this will be a list of Strings representing the options that will be selected by default
    selectedOptions: [];
    // For enumerated fields, this will be a list of Strings representing the available options for the field
    // Will be empty for non-enumerated fields.
    options: [];
    // A set of options controlling the validation for the field
    // NOTE: These options should NOT be modified through the API. Any validation should be set up in the form settings in HubSpot.
    validation: {
        name: string;
        message: string;
        data: string;
        useDefaultBlockList: boolean;
        blockedEmailAddresses: [];
    };
    // DEPRECATED - this field is not used.
    enabled: boolean;
    // Boolean; When set to true, the field will be rendered as a hidden field.
    hidden: boolean;
    // The default value of the field
    defaultValue: string;
    // Whether or not the field is a smart field.
    // Smart fields are hidden if the visitor is a known contact that already has a value for the field.)
    isSmartField: boolean;
    // DEPRECATED - this field is not used.
    unselectedLabel: string;
    // The placeholder text for the field, which will display
    placeholder: string;
    // A list of filters that will be used to display dependent fields.
    dependentFieldFilters: [];
    // DEPRECATED - this field is not used.
    labelHidden: boolean;
    propertyObjectType: string;
    // DEPRECATED - this field is not used.
    metaData: [];
    objectTypeId: string;
}

export interface HubspotRichText {
    content: string;
    type: string;
}
