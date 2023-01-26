import { ArrowRightIcon, CalendarIcon } from '@radix-ui/react-icons';
import { useDateRangePicker } from '@react-aria/datepicker';
import type { AriaDateRangePickerProps } from '@react-aria/datepicker';

import { useDateRangePickerState } from '@react-stately/datepicker';
import React, { useRef } from 'react';
import type { ReactNode } from 'react';
import { Icon } from '../../Icon/Icon';
import { DateField } from '../DateField/DateField';
import { RangeCalendarContainer } from '../RangeCalendar/RangeCalendarContainer';
import {
    ReactAriaButton,
    ReactAriaDialog,
    ReactAriaPopover,
} from '../ReactAriaComponents/ReactAriaComponents';
import type { DateValue } from '@react-types/calendar';

interface DateRangePickerProps extends AriaDateRangePickerProps<DateValue> {
    timePresets: ReactNode;
    clearSelection: ReactNode;
}

export const DateRangePicker = ({
    timePresets,
    clearSelection,
    ...props
}: DateRangePickerProps) => {
    let state = useDateRangePickerState({ ...props, shouldCloseOnSelect: false });
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
            <div className="c-datepicker__label" {...labelProps}>
                {props.label}
            </div>
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
                        <ReactAriaButton {...buttonProps}>
                            <Icon label="calendar">
                                <CalendarIcon width={20} height={20} />
                            </Icon>
                        </ReactAriaButton>
                    </div>
                </div>
            </div>
            {state.isOpen && (
                <ReactAriaPopover
                    state={state}
                    triggerRef={ref}
                    popoverRef={ref}
                    placement="bottom start"
                >
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
