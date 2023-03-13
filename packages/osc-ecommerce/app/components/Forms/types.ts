// ----------------------------------------------
// Form Input Types
// ----------------------------------------------

export type TextInputType = {
    id: string;
    name: string;
    placeholder?: string;
    required: boolean;
    type?: string;
    variants?: Variants[];
};

export type TextAreaType = {
    id: string;
    name: string;
    required: boolean;
};

export type SelectItems = { name: string; value: string };

export type SelectType = {
    description?: { label: string };
    name: string;
    placeholder?: string;
    selectItems: SelectItems[];
};

export type DatePickerType = {
    name: string;
    label: string;
};

export type CheckboxType = {
    description: {
        id: string;
        value: string;
    };
    id: string;
    name: string;
    value: string;
};

export type TwoXColType = {
    layout: string;
    classes: string;
    description: string;
    nestedData: (TextInputType | SelectType)[];
};

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
