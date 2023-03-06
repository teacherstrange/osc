import { z } from 'zod';

export const textInputSchema = {
    email: z.object({
        email: z
            .string()
            .min(1, { message: 'Please enter an email address' })
            .email({ message: 'Invalid Email' }),
    }),
    firstname: z.object({
        firstname: z.string().trim().min(1, { message: 'Field is required' }),
    }),
    lastname: z.object({
        lastname: z.string().trim().min(1, { message: 'Field is required' }),
    }),
};
