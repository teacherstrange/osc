import type { AriaDatePickerProps } from '@react-aria/datepicker';
import { useDatePicker } from '@react-aria/datepicker';
import { useDatePickerState } from '@react-stately/datepicker';
import React, { useRef } from 'react';

import { CalendarIcon } from '@radix-ui/react-icons';
import type { DateValue } from '@react-types/calendar';
import { Icon } from '../../Icon/Icon';
import { Calendar } from '../Calendar/Calendar';
import '../date-picker.scss';
import { DateField } from '../DateField/DateField';

import {
    ReactAriaButton,
    ReactAriaDialog,
    ReactAriaPopover,
} from '../ReactAriaComponents/ReactAriaComponents';

export const DatePicker = (props: AriaDatePickerProps<DateValue>) => {
    let state = useDatePickerState({ ...props, shouldCloseOnSelect: false });
    let ref = useRef();
    let { buttonProps, calendarProps, dialogProps, fieldProps, groupProps, labelProps } =
        useDatePicker(props, state, ref);

    return (
        <div className="c-datepicker">
            <div {...labelProps} className="c-datepicker__label">
                {props.label}
            </div>
            <div className="c-datepicker__date-field-container" {...groupProps} ref={ref}>
                <DateField {...fieldProps} />
                <ReactAriaButton {...buttonProps}>
                    <Icon label="calendar">
                        <CalendarIcon width={20} height={20} />
                    </Icon>
                </ReactAriaButton>
            </div>
            {state.isOpen && (
                <ReactAriaPopover state={state} triggerRef={ref} placement="bottom start">
                    <ReactAriaDialog {...dialogProps}>
                        <Calendar {...calendarProps} />
                    </ReactAriaDialog>
                </ReactAriaPopover>
            )}
        </div>
    );
};
