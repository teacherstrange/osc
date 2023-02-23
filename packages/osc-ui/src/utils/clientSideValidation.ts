import type { Dispatch, SetStateAction } from 'react';
import type { ZodSchema, SafeParseError } from 'zod';
/**
 * Validates a form input on the client using a given schema, and sets any errors
 *
 * @param id A string id of the field to be validated
 * @param schema A validation schema, e.g. Zod
 * @param setErrors A dispatch to set any errors
 * @param value The value of the field to be validated
 * @returns null
 */
export const clientSideValidation = (
    id: string,
    schema: ZodSchema,
    setErrors: Dispatch<SetStateAction<any>>,
    value: string | number | readonly string[] | boolean
) => {
    const result = schema.safeParse({ [id]: value });
    if (!result.success) {
        const resultError = result as SafeParseError<typeof result>;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: getFieldError(resultError.error, id),
        }));
    } else {
        // If validation passes, set error to null
        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: null,
        }));
    }
};

/**
 * Gets the specific error from the schema
 *
 * @param id A string id of the field to be validated
 * @param error Validation error from schema
 * @returns string
 */
export const getFieldError = (error: any, id: any) => {
    const errors = error.flatten();
    return errors.fieldErrors[id];
};
