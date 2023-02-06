import type { CalendarDate } from '@internationalized/date';
import type { AriaDateRangePickerProps } from '@react-aria/datepicker';
import { useDateRangePicker } from '@react-aria/datepicker';
import { useDateRangePickerState } from '@react-stately/datepicker';
import type { DateValue } from '@react-types/calendar';
import type { RangeValue } from '@react-types/shared';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import React, { useRef, useState } from 'react';
import { Icon } from '../../Icon/Icon';
import { DateField } from '../DateField/DateField';
import { RangeCalendarContainer } from '../RangeCalendar/RangeCalendar';
import {
    ReactAriaButton,
    ReactAriaDialog,
    ReactAriaPopover,
} from '../ReactAriaComponents/ReactAriaComponents';
import { createTimePresets } from '../utils';

/* -------------------------------------------------------------------------------------------------
 * DateRangePickerContainer
 * -----------------------------------------------------------------------------------------------*/

interface DateRangePickerContainerProps extends AriaDateRangePickerProps<DateValue> {
    presets?: { name: string; length: number }[];
}

export const DateRangePickerContainer = (props: DateRangePickerContainerProps) => {
    const { defaultValue, presets, ...rest } = props;
    // Used to set the value of the range calender to a preset or to clear it
    const [value, setValue] = useState(defaultValue ? defaultValue : null);
    // Additional piece of state to ensure prompt to 'select end date' doesn't show if default has been set
    const [initialDefault, setInitialDefault] = useState(defaultValue ? true : false);

    const [selectedRange, setSelectedRange] = useState({
        timePreset: false,
        range: null,
    });

    const ClearSelection = () => (
        <button className="c-calendar__range--clear-selection" onClick={() => setValue(null)}>
            Clear Selection
        </button>
    );

    return (
        <>
            <DateRangePicker
                clearSelection={<ClearSelection />}
                initialDefault={initialDefault}
                label="Date range"
                onChange={setValue}
                selectedRange={selectedRange}
                setInitialDefault={setInitialDefault}
                setSelectedRange={setSelectedRange}
                timePresets={
                    presets ? (
                        <TimePresets
                            presets={presets}
                            setValue={setValue}
                            setSelectedRange={setSelectedRange}
                        />
                    ) : null
                }
                value={value}
                {...rest}
            />
        </>
    );
};

const TimePresets = ({ presets, setSelectedRange, setValue }) => (
    <div className="c-calendar__range--time-presets" aria-label="Time Presets" role="group">
        <div>Time Presets</div>

        {createTimePresets(presets).map(({ endDate, name, startDate }, index) => (
            <button
                key={index}
                onClick={() => {
                    setSelectedRange((prevRange) => ({ ...prevRange, timePreset: true }));
                    setValue({
                        start: startDate,
                        end: endDate,
                    });
                }}
            >
                {name}
            </button>
        ))}
    </div>
);

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker
 * -----------------------------------------------------------------------------------------------*/

type SelectedRange = {
    timePreset: boolean;
    range: RangeValue<CalendarDate>;
};
interface DateRangePickerProps extends AriaDateRangePickerProps<DateValue> {
    /**
     * A button component that allows the selected range to be cleared
     */
    clearSelection: ReactNode;
    /**
     * Indicates where a defaultValue has been set
     */
    initialDefault: boolean;
    /**
     * The selected range state that is passed down to the Range Calendar
     */
    selectedRange: SelectedRange;
    /**
     * A Dispatch that allows initialDefault value to be reset
     */
    setInitialDefault: Dispatch<SetStateAction<boolean>>;
    /**
     * A Dispatch that allows selectedRange state to be updated in the Range Calendar
     */
    setSelectedRange: Dispatch<SetStateAction<SelectedRange>>;
    /**
     * Preset time periods a user can select
     */
    timePresets: ReactNode;
}

export const DateRangePicker = (props: DateRangePickerProps) => {
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
    const {
        clearSelection,
        initialDefault,
        selectedRange,
        setInitialDefault,
        setSelectedRange,
        timePresets,
    } = props;

    return (
        <div className="c-datepicker c-datepicker__range">
            <label className="c-datepicker__label" {...labelProps}>
                {props.label}
            </label>
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
                            initialDefault={initialDefault}
                            clearSelection={clearSelection}
                            timePresets={timePresets}
                            setInitialDefault={setInitialDefault}
                            setSelectedRange={setSelectedRange}
                            selectedRange={selectedRange}
                        />
                    </ReactAriaDialog>
                </ReactAriaPopover>
            )}
        </div>
    );
};
