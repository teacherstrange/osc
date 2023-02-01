export const getFieldError = (value: string | number | readonly string[], required: boolean) => {
    if (!value && required) return 'Field is required';

    // TODO - And in error conditions...
    return null;
};
