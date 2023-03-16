import { z } from 'zod';

export const contactFormSchema = z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    firstname: z.string().trim().min(1, { message: 'Field is required' }),
    lastname: z.string().trim().min(1, { message: 'Field is required' }),
    phone: z.string().trim().min(1, { message: 'Field is required' }),
    enquiry: z.string().trim().min(1, { message: 'Field is required' }),
});
