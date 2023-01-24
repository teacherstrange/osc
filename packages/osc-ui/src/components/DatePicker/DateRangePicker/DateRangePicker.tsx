import { ArrowRightIcon, CalendarIcon } from '@radix-ui/react-icons';
import { useDateRangePicker } from '@react-aria/datepicker';
import { useDateRangePickerState } from '@react-stately/datepicker';
import React, { useRef } from 'react';
import { Icon } from '../../Icon/Icon';
import { DateField } from '../DateField/DateField';
import { RangeCalendarContainer } from '../RangeCalendar/RangeCalendarContainer';
import {
    ReactAriaButton,
    ReactAriaDialog,
    ReactAriaPopover,
} from '../ReactAriaComponents/ReactAriaComponents';

// TODO - Need to get the datepicker and the DateRangeCalendar connected - ie if you
// set a date on the calendar the datepicker doesn't pick this up

export const DateRangePicker = ({ timePresets, clearSelection, ...props }) => {
    let state = useDateRangePickerState(props);
    let ref = useRef();
    let {
        labelProps,
        groupProps,
        startFieldProps,
        endFieldProps,
        buttonProps,
        dialogProps,
        calendarProps,
    } = useDateRangePicker(props, state, ref);

    return (
        <div className="c-datepicker c-datepicker__range">
            <div {...labelProps}>{props.label}</div>
            <div {...groupProps} ref={ref}>
                <div className="c-datepicker__date-field-container">
                    <div className="c-datepicker__date-field-inner-container">
                        <DateField {...startFieldProps} />
                        <ReactAriaButton {...buttonProps}>
                            <Icon label="calendar">
                                <CalendarIcon width={20} height={20} />
                            </Icon>
                        </ReactAriaButton>
                    </div>
                    <Icon label="arrow">
                        <ArrowRightIcon width={20} height={20} />
                    </Icon>
                    <div className="c-datepicker__date-field-inner-container">
                        <DateField {...endFieldProps} />
                        {state.validationState === 'invalid' && <span aria-hidden="true">🚫</span>}
                        <ReactAriaButton {...buttonProps}>
                            <Icon label="calendar">
                                <CalendarIcon width={20} height={20} />
                            </Icon>
                        </ReactAriaButton>
                    </div>
                </div>
            </div>
            {state.isOpen && (
                <ReactAriaPopover state={state} triggerRef={ref} placement="bottom start">
                    <ReactAriaDialog {...dialogProps}>
                        <RangeCalendarContainer
                            {...calendarProps}
                            clearSelection={clearSelection}
                            timePresets={timePresets}
                        />
                    </ReactAriaDialog>
                </ReactAriaPopover>
            )}
        </div>
    );
};
