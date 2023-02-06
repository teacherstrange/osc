import type { AriaDatePickerProps } from '@react-aria/datepicker';
import { useDatePicker } from '@react-aria/datepicker';
import { useDatePickerState } from '@react-stately/datepicker';
import React, { useRef } from 'react';

import type { DateValue } from '@react-types/calendar';
import { Icon } from '../../Icon/Icon';
import { Calendar } from '../Calendar/Calendar';
import { YearCalendar } from '../Calendar/YearCalendar';
import { DecadeCalendar } from '../Calendar/DecadeCalendar';
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

export const DatePicker = ({ type = 'month', ...props }: DatePickerProps) => {
    let state = useDatePickerState({ ...props, shouldCloseOnSelect: false });
    let ref = useRef();
    let { buttonProps, calendarProps, dialogProps, fieldProps, groupProps, labelProps } =
        useDatePicker(props, state, ref);
    let calendar;

    switch (type) {
        case 'month':
            calendar = <Calendar {...calendarProps} />;
            break;
        case 'year':
            calendar = <YearCalendar {...calendarProps} />;
            break;
        case 'decade':
            calendar = <DecadeCalendar {...calendarProps} />;
            break;
        default:
            console.error('No calendar selected');
    }

    return (
        <div className="c-datepicker">
            <div {...labelProps} className="c-datepicker__label">
                {props.label}
            </div>
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
                    <ReactAriaDialog {...dialogProps}>{calendar}</ReactAriaDialog>
                </ReactAriaPopover>
            )}
        </div>
    );
};
