import type { ZodError, ZodObject } from 'zod';
import { z } from 'zod';
import type { HubspotFormFieldTypes, SelectAndCheckboxOptions } from '../components/Forms/types';

/**
 * Validates the form data with Zod. If Zod schema fails it will throw an error which we catch and return
 * a flattened error object - https://zod.dev/ERROR_HANDLING?id=flattening-errors
 *
 * @param formInputData An object containing the form input data
 * @param schema The created Zod Schema
 * @returns An errors objects
 */
export async function validateAction({
    formInputData,
    schema,
}: {
    formInputData: Record<string, string | number | [] | {}>;
    schema: ZodObject<any>;
}) {
    try {
        const dataToValidate = { ...formInputData };
        schema.parse(dataToValidate);
        return { errors: null };
    } catch (err) {
        const errors = err as ZodError;
        return {
            errors: errors.flatten(),
        };
    }
}

/**
 * Creates the Zod validation schema
 *
 * @param field An object containing the Hubspot field types
 * @param validationField Empty object the validation field is assigned to
 * @returns A validation field object
 */
export const assignValidationSchema = (field: HubspotFormFieldTypes, validationField: {}) => {
    switch (field.type) {
        case 'string':
            if (field.name === 'email') {
                return (validationField = {
                    email: field.required
                        ? z
                              .string({
                                  errorMap: (error, _ctx) => errorMap(error, _ctx),
                              })
                              .email()
                        : z.string({
                              errorMap: (error, _ctx) => errorMap(error, _ctx),
                          }),
                });
            } else {
                return (validationField = {
                    [field.name]: field.required
                        ? z
                              .string({
                                  errorMap: (error, _ctx) => errorMap(error, _ctx),
                              })
                              .trim()
                              .min(1, { message: 'Field is required' })
                        : z.string({
                              errorMap: (error, _ctx) => errorMap(error, _ctx),
                          }),
                });
            }
        case 'enumeration':
            if (field.fieldType === 'checkbox') {
                return (validationField = {
                    // Coercing to string here as select inputs can be set as numbers in hubspot
                    [field.name]: field.required
                        ? z.coerce
                              .string({
                                  errorMap: (error, _ctx) => errorMap(error, _ctx),
                              })
                              .array()
                              .min(1, { message: 'Please select an option' })
                        : z.coerce
                              .string({
                                  errorMap: (error, _ctx) => errorMap(error, _ctx),
                              })
                              .array(),
                });
            } else {
                return (validationField = {
                    [field.name]: field.required
                        ? z.coerce
                              .string({
                                  errorMap: (error, _ctx) => errorMap(error, _ctx),
                              })
                              .refine(
                                  (val) =>
                                      field.options
                                          .map((value: SelectAndCheckboxOptions) => {
                                              return value.value;
                                          })
                                          .includes(val),
                                  {
                                      message: 'Please select an option',
                                  }
                              )
                        : z.coerce.string({
                              errorMap: (error, _ctx) => ({
                                  message: `Invalid Entry - ${_ctx.defaultError}`,
                              }),
                          }),
                });
            }
        case 'date':
            return (validationField = {
                [field.name]: field.required
                    ? z.object({
                          year: z
                              .number({
                                  errorMap: (error, _ctx) => errorMap(error, _ctx),
                              })
                              .min(1, {
                                  message: 'Please select a date',
                              }),
                          month: z
                              .number({
                                  errorMap: (error, _ctx) => errorMap(error, _ctx),
                              })
                              .min(1, {
                                  message: 'Please select a date',
                              }),
                          day: z
                              .number({
                                  errorMap: (error, _ctx) => errorMap(error, _ctx),
                              })
                              .min(1, {
                                  message: 'Please select a date',
                              }),
                      })
                    : z.object({
                          year: z.number({
                              errorMap: (error, _ctx) => errorMap(error, _ctx),
                          }),
                          month: z.number({
                              errorMap: (error, _ctx) => errorMap(error, _ctx),
                          }),
                          day: z.number({
                              errorMap: (error, _ctx) => errorMap(error, _ctx),
                          }),
                      }),
            });
        default:
            return {};
    }
};

/**
 * Creates a Zod error map
 *
 * @param error ZodIssueOptionalMessage
 * @param _ctx ErrorMapCtx
 * @returns A message object with the default error
 */
const errorMap = (error: z.ZodIssueOptionalMessage, _ctx: z.ErrorMapCtx) => ({
    message: `Invalid Entry - ${_ctx.defaultError}`,
});
