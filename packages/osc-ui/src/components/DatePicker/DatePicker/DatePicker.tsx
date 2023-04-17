import type { CalendarDate } from '@internationalized/date';
import type { AriaDatePickerProps } from '@react-aria/datepicker';
import { useDatePicker } from '@react-aria/datepicker';
import { useDatePickerState } from '@react-stately/datepicker';
import type { DateValue } from '@react-types/calendar';
import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect, useRef } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';
import { useUniqueId } from '../../../hooks/useUniqueId';
import { validateDatepicker } from '../../../utils/clientSideValidation';
import { CalendarContainer } from '../Calendar/CalendarContainer';
import '../date-picker.scss';
import { DateField } from '../DateField/DateField';
import { ReactAriaDialog, ReactAriaPopover } from '../ReactAriaComponents/ReactAriaComponents';

export interface DatePickerProps extends AriaDatePickerProps<DateValue> {
    /**
     * Sets whether the datepicker should close when clicked
     * @default true
     */
    closeOnSelect?: boolean;
    /**
     * Sets the type of datepicker
     */
    type?: 'month' | 'year' | 'decade';
    /**
     * Any error messages - initially set through server validation, but can be updated through client validation
     */
    errors?: string[] | undefined;
    /**
     * Name of the DatePicker, submitted with its owning form as part of a name/pair value
     */
    name: string;
    /**
     * The Zod Schema used for validation
     */
    schema?: ZodObject<ZodRawShape>;
    /**
     * Allows for client side validation once a server side error has been received
     */
    setErrors?: Dispatch<SetStateAction<any>>;
}

export const DatePicker = (props: DatePickerProps) => {
    const {
        closeOnSelect = true,
        errors,
        granularity,
        label,
        isRequired,
        name,
        schema,
        setErrors,
    } = props;
    let state = useDatePickerState({ ...props, shouldCloseOnSelect: closeOnSelect });
    let ref = useRef();
    let { buttonProps, calendarProps, dialogProps, fieldProps, groupProps, labelProps } =
        useDatePicker(props, state, ref);

    const dateFieldContainerId = useUniqueId('dateFieldContainer:');
    const dateFieldDescribedById = useUniqueId('dateFieldDescribedById:');
    const dateFieldLabelId = useUniqueId('dateFieldLabel:');

    useEffect(() => {
        // Client side error handling - Sets any errors on an input in
        // accordance with the schema validation
        if (errors && errors.length > 0 && schema && setErrors) {
            validateDatepicker('datePicker', schema, setErrors, state.value as CalendarDate, name);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- should only update when the checked value changes
    }, [state.value]);
    const uniqueErrors = Array.from(new Set(errors));

    return (
        <div className="c-datepicker">
            <label {...labelProps} className="c-label" id={dateFieldLabelId}>
                {label}
                {isRequired ? <span className="c-label__required">* </span> : null}
            </label>
            <div
                className="c-datepicker__date-field-container"
                {...groupProps}
                ref={ref}
                aria-labelledby={dateFieldLabelId}
                // Manually setting random ID due to bug on duplicate Ids:
                // https://github.com/adobe/react-spectrum/issues/3969
                id={dateFieldContainerId}
                aria-invalid={errors && errors.length > 0 ? true : false}
                aria-describedby={dateFieldDescribedById}
            >
                <DateField
                    {...fieldProps}
                    dateFieldContainerId={dateFieldContainerId}
                    buttonProps={buttonProps}
                    errors={errors}
                    aria-describedby={
                        errors && errors.length > 0 ? `${dateFieldContainerId}-error` : undefined
                    }
                    granularity={granularity}
                />
            </div>
            {state.isOpen && (
                <ReactAriaPopover
                    state={state}
                    popoverRef={ref}
                    triggerRef={ref}
                    placement="bottom start"
                >
                    <ReactAriaDialog {...dialogProps}>
                        <CalendarContainer {...calendarProps} />
                    </ReactAriaDialog>
                </ReactAriaPopover>
            )}

            {uniqueErrors && uniqueErrors.length > 0 ? (
                <div
                    className="c-date-field__error--text"
                    role="alert"
                    id={`${dateFieldContainerId}-error`}
                >
                    {uniqueErrors.map((error, index) => (
                        <span key={index} className="u-pr-2xs">
                            {error}
                        </span>
                    ))}
                </div>
            ) : null}
        </div>
    );
};
