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
