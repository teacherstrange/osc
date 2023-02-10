import type { AriaDatePickerProps } from '@react-aria/datepicker';
import { useDatePicker } from '@react-aria/datepicker';
import { useDatePickerState } from '@react-stately/datepicker';
import type { DateValue } from '@react-types/calendar';
import React, { useRef } from 'react';
import { Icon } from '../../Icon/Icon';
import { CalendarContainer } from '../Calendar/CalendarContainer';
import '../date-picker.scss';
import { DateField } from '../DateField/DateField';
import {
    ReactAriaButton,
    ReactAriaDialog,
    ReactAriaPopover,
} from '../ReactAriaComponents/ReactAriaComponents';

export interface DatePickerProps extends AriaDatePickerProps<DateValue> {
    type?: 'month' | 'year' | 'decade';
}

export const DatePicker = (props: DatePickerProps) => {
    let state = useDatePickerState({ ...props, shouldCloseOnSelect: false });
    let ref = useRef();
    let { buttonProps, calendarProps, dialogProps, fieldProps, groupProps, labelProps } =
        useDatePicker(props, state, ref);

    return (
        <div className="c-datepicker">
            <label {...labelProps} className="c-datepicker__label">
                {props.label}
            </label>
            <div className="c-datepicker__date-field-container" {...groupProps} ref={ref}>
                <DateField {...fieldProps} granularity={props.granularity} />
                <ReactAriaButton {...buttonProps}>
                    <Icon id="calendar" />
                </ReactAriaButton>
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
