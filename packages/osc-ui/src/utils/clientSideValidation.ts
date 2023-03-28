import type { CalendarDate } from '@internationalized/date';
import type { RangeValue } from '@react-types/shared';
import type { Dispatch, SetStateAction } from 'react';
import type { SafeParseError, ZodError, ZodObject, ZodRawShape } from 'zod';
/**
 * Validates a form input on the client using a given schema, and sets any errors
 *
 * @param id A string id of the field to be validated
 * @param schema A validation schema, e.g. Zod
 * @param setErrors A dispatch to set any errors
 * @param value The value of the field to be validated
 * @returns null
 */
export const clientSideValidation = (
    id: string,
    schema: ZodObject<ZodRawShape>,
    setErrors: Dispatch<SetStateAction<any>>,
    value: string | number | readonly string[] | boolean
) => {
    const result = schema.safeParse({ [id]: value });
    if (!result.success) {
        const resultError = result as SafeParseError<typeof result>;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: getFieldError(resultError.error, id),
        }));
    } else {
        // If validation passes, set error to null
        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: null,
        }));
    }
};

/**
 * Validates the datepicker - It's a separate function as it needs to
 * validate 3 fields - Year, Month and Day
 * @param type Whether it's a datePicker or a dateRangePicker
 * @param schema A validation schema, e.g. Zod
 * @param setErrors A dispatch to set any errors
 * @param dateValue A DateValue object, or an object with two DateValue objects for the dateRangePicker
 * @param name Name of the DatePicker, submitted with its owning form as part of a name/pair value
 * @returns null
 */
export const validateDatepicker = (
    type: 'dateRangePicker' | 'datePicker',
    schema: ZodObject<ZodRawShape>,
    setErrors: Dispatch<SetStateAction<any>>,
    dateValue: CalendarDate | RangeValue<CalendarDate> | null,
    name: string
) => {
    // If value is null then set error
    if (!dateValue) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ['Please select a date'],
        }));
        return;
    }

    let isError;
    const datesToTest = ['year', 'month', 'day'];

    const dispatchErrors = (res: ZodError, dateKey: string) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            date: getFieldError(res, dateKey),
        }));
        isError = true;
    };

    const checkForErrors = (range?: string) => {
        for (const dateKey of datesToTest) {
            let dateToTest;
            if (type === 'dateRangePicker') {
                dateToTest = dateValue[range][dateKey];
            } else {
                dateToTest = dateValue[dateKey];
            }
            // Run test
            const res = schema.pick({ [dateKey]: true }).safeParse({ [dateKey]: dateToTest });
            // If validation error, then dispatch errors and break out of loop
            if (!res.success) {
                const resultError = res as SafeParseError<typeof res>;
                dispatchErrors(resultError.error, dateKey);
                break;
            }
        }
    };

    if (type === 'dateRangePicker') {
        // If dateRangePicker then need to test both the start and end dates
        const dateRangevalue = dateValue as RangeValue<CalendarDate>;
        for (const range of Object.keys(dateRangevalue)) {
            checkForErrors(range);
            if (isError) break;
        }
    } else {
        checkForErrors();
    }
    // If no errors, then set date error to null
    if (!isError) {
        setErrors((prevErrors) => {
            return {
                ...prevErrors,
                [name]: null,
            };
        });
    }
};

/**
 * Gets the specific error from the schema
 *
 * @param id A string id of the field to be validated
 * @param error Validation error from schema
 * @returns string
 */
export const getFieldError = (error: ZodError, id: string) => {
    const errors = error.flatten();
    return errors.fieldErrors[id];
};
