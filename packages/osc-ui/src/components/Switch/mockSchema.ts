import { z } from 'zod';

export const switchSchema = {
    isActive: z.object({
        // Using 'errorMap' to set a message because 'invalid_type_error' will not work.
        // See: https://github.com/react-hook-form/react-hook-form/discussions/9063?sort=new
        isActive: z.literal<boolean>(true, {
            errorMap: () => ({ message: 'Something went wrong, please try again' }),
        }),
    }),
};
