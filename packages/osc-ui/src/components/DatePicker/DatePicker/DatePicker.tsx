import type { AriaDatePickerProps } from '@react-aria/datepicker';
import { useDatePicker } from '@react-aria/datepicker';
import { useDatePickerState } from '@react-stately/datepicker';
import type { DateValue } from '@react-types/calendar';
import React, { useRef } from 'react';
import { useUniqueId } from '../../../hooks/useUniqueId';

import { CalendarContainer } from '../Calendar/CalendarContainer';
import '../date-picker.scss';
import { DateField } from '../DateField/DateField';
import { ReactAriaDialog, ReactAriaPopover } from '../ReactAriaComponents/ReactAriaComponents';

export interface DatePickerProps extends AriaDatePickerProps<DateValue> {
    type?: 'month' | 'year' | 'decade';
}

export const DatePicker = (props: DatePickerProps) => {
    let state = useDatePickerState({ ...props, shouldCloseOnSelect: false });
    let ref = useRef();
    let { buttonProps, calendarProps, dialogProps, fieldProps, groupProps, labelProps } =
        useDatePicker(props, state, ref);

    const dateFieldId = useUniqueId('dateField:');

    return (
        <div className="c-datepicker">
            <label {...labelProps} className="c-datepicker__label">
                {props.label}
            </label>
            <div
                className="c-datepicker__date-field-container"
                {...groupProps}
                ref={ref}
                // Manually setting random ID due to bug on duplicate Ids:
                // https://github.com/adobe/react-spectrum/issues/3969
                id={dateFieldId}
            >
                <DateField
                    {...fieldProps}
                    buttonProps={buttonProps}
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
        </div>
    );
};
