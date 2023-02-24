import { z } from 'zod';

export const radioSchema = {
    newsletter: z.object({
        newsletter: z
            .string()
            .refine((val) => radioVariants.map((value) => value.value).includes(val), {
                message: 'Please select an option',
            }),
    }),
};

export const radioVariants = [
    { id: 'r1-yes', name: 'Yes', value: 'yes' },
    { id: 'r1-no', name: 'No', value: 'no' },
];
