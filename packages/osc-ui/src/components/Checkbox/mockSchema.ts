import { z } from 'zod';

export const checkboxSchema = {
    termsAndConditions: z.object({
        termsAndConditions: z.coerce
            .string({
                errorMap: (error, _ctx) => errorMap(error, _ctx),
            })
            .array()
            .min(1, { message: 'Please select an option' }),
    }),
};

const errorMap = (error: z.ZodIssueOptionalMessage, _ctx: z.ErrorMapCtx) => {
    return {
        message: `Invalid Entry - ${_ctx.defaultError}`,
    };
};
