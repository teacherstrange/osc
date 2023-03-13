import { z } from 'zod';

const baseContactSchema = z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    firstname: z.string().trim().min(1, { message: 'Field is required' }),
    lastname: z.string().trim().min(1, { message: 'Field is required' }),
    phone: z.string().trim().min(1, { message: 'Field is required' }),
});

export const contactFormSchema = baseContactSchema.extend({
    enquiry: z.string().trim().min(1, { message: 'Field is required' }),
});

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
