import { z } from 'zod';

export const datePickerSchema = {
    date: z.object({
        day: z
            .number({
                invalid_type_error: 'Invalid data',
            })
            .min(1, {
                message: 'Field is required',
            }),
        month: z
            .number({
                invalid_type_error: 'Invalid data',
            })
            .min(1, {
                message: 'Field is required',
            }),
        year: z
            .number({
                invalid_type_error: 'Invalid data',
            })
            .min(1, {
                message: 'Field is required',
            }),
    }),
};
