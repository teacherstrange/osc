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
     * The Zod Schema used for validation
     */
    schema?: ZodObject<ZodRawShape>;
    /**
     * Allows for client side validation once a server side error has been received
     */
    setErrors?: Dispatch<SetStateAction<any>>;
}

export const DatePicker = (props: DatePickerProps) => {
    const { closeOnSelect = true, errors, schema, setErrors } = props;
    let state = useDatePickerState({ ...props, shouldCloseOnSelect: closeOnSelect });
    let ref = useRef();
    let { buttonProps, calendarProps, dialogProps, fieldProps, groupProps, labelProps } =
        useDatePicker(props, state, ref);

    const dateFieldId = useUniqueId('dateField:');
    useEffect(() => {
        // Client side error handling - Sets any errors on an input in
        // accordance with the schema validation
        if (errors && schema) {
            validateDatepicker('datePicker', schema, setErrors, state.value as CalendarDate);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- should only update when the checked value changes
    }, [state.value]);

    return (
        <div className="c-datepicker">
            <label {...labelProps} className="c-label">
                {props.label}
            </label>
            <div
                className="c-datepicker__date-field-container"
                {...groupProps}
                ref={ref}
                // Manually setting random ID due to bug on duplicate Ids:
                // https://github.com/adobe/react-spectrum/issues/3969
                id={dateFieldId}
                aria-invalid={props.errors ? true : false}
            >
                <DateField
                    {...fieldProps}
                    dateFieldId={dateFieldId}
                    buttonProps={buttonProps}
                    errors={errors}
                    aria-describedby={props.errors ? `${dateFieldId}-error` : undefined}
                    granularity={props.granularity}
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
            {errors ? (
                <div className="c-date-field__error--text" role="alert" id={`${dateFieldId}-error`}>
                    {errors}
                </div>
            ) : null}
        </div>
    );
};
