import type { ZodObject, ZodError } from 'zod';

export async function validateAction<ActionInput>({
    request,
    schema,
}: {
    request: Request;
    schema: ZodObject<any>;
}) {
    const fields = Object.fromEntries(await request.formData());
    try {
        const formData = schema.parse(fields) as ActionInput;
        return { formData, errors: null };
    } catch (err) {
        const errors = err as ZodError<ActionInput>;
        return {
            formData: fields,
            errors: errors.flatten(),
        };
    }
}
