export const getFieldError = (value: string | boolean | undefined, required: boolean) => {
    if (!value && required) return 'Field is required';

    // TODO - And in error conditions...
    return null;
};
