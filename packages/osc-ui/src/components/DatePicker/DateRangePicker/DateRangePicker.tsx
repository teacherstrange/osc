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

export const DateRangePicker = (props) => {
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
        <div
            className="c-calendar__date-range-picker"
            style={{ display: 'inline-flex', flexDirection: 'column' }}
        >
            <div {...labelProps}>{props.label}</div>
            <div {...groupProps} ref={ref}>
                <div className="field" style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
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
                    <div style={{ position: 'relative' }}>
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
                        <RangeCalendarContainer />
                    </ReactAriaDialog>
                </ReactAriaPopover>
            )}
        </div>
    );
};
