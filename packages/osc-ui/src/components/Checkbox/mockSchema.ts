import { z } from 'zod';

export const checkboxSchema = {
    termsAndConditions: z.object({
        // Using 'errorMap' to set a message because 'invalid_type_error' will not work.
        // See: https://github.com/react-hook-form/react-hook-form/discussions/9063?sort=new
        termsAndConditions: z.literal<boolean>(true, {
            errorMap: () => ({ message: 'Please accept the terms and conditions' }),
        }),
    }),
};
