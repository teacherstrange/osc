import type { ZodError, ZodObject } from 'zod';

export async function validateAction({
    formInputData,
    schema,
}: {
    formInputData: Record<string, unknown>;
    schema: ZodObject<any>;
}) {
    try {
        const validatedFormInputData = schema.parse(formInputData);
        return { validatedFormInputData, errors: null };
    } catch (err) {
        const errors = err as ZodError;
        return {
            formData: formInputData,
            errors: errors.flatten(),
        };
    }
}
