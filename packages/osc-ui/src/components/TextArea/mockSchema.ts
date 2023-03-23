import { z } from 'zod';

export const textAreaSchema = z.object({
    enquiry: z.string().trim().min(1, { message: 'Field is required' }),
});
