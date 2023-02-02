import type { AriaDateRangePickerProps } from '@react-aria/datepicker';
import { useDateRangePicker } from '@react-aria/datepicker';

import { useDateRangePickerState } from '@react-stately/datepicker';
import type { DateValue } from '@react-types/calendar';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import React, { useRef } from 'react';
import { Icon } from '../../Icon/Icon';
import { DateField } from '../DateField/DateField';
import { RangeCalendarContainer } from '../RangeCalendar/RangeCalendarContainer';
import {
    ReactAriaButton,
    ReactAriaDialog,
    ReactAriaPopover,
} from '../ReactAriaComponents/ReactAriaComponents';
import type { RangeValue } from '@react-types/shared';
import type { CalendarDate } from '@internationalized/date';

type SelectedRange = {
    timePreset: boolean;
    range: RangeValue<CalendarDate>;
};
interface DateRangePickerProps extends AriaDateRangePickerProps<DateValue> {
    clearSelection: ReactNode;
    selectedRange: SelectedRange;
    setSelectedRange: Dispatch<SetStateAction<SelectedRange>>;
    timePresets: ReactNode;
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
                            <Icon id="calendar" />
                        </ReactAriaButton>
                    </div>
                    <Icon className="arrow" id="arrow" />
                    <div className="c-datepicker__date-field-inner-container">
                        <DateField {...endFieldProps} />
                        <ReactAriaButton {...buttonProps}>
                            <Icon id="calendar" />
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
                            setSelectedRange={props.setSelectedRange}
                            selectedRange={props.selectedRange}
                        />
                    </ReactAriaDialog>
                </ReactAriaPopover>
            )}
        </div>
    );
};
