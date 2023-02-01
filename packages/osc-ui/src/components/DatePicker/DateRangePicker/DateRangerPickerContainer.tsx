import type { AriaDateRangePickerProps } from '@react-aria/datepicker';
import type { DateValue } from '@react-types/calendar';
import React, { useState } from 'react';
import { createTimePresets } from '../utils';
import { DateRangePicker } from './DateRangePicker';

interface DateRangePickerContainerProps extends AriaDateRangePickerProps<DateValue> {
    presets?: { name: string; length: number }[];
}

export const DateRangePickerContainer = ({
    defaultValue,
    presets,
    ...props
}: DateRangePickerContainerProps) => {
    // Used to set the value of the range calender to a preset or to clear it
    const [value, setValue] = useState(defaultValue ? defaultValue : null);

    const [highlighted, setHighlighted] = useState({
        bool: true,
        setTimePreset: false,
        value: null,
    });

    const ClearSelection = () => (
        <button className="c-calendar__range--clear-selection" onClick={() => setValue(null)}>
            Clear Selection
        </button>
    );

    return (
        <>
            <DateRangePicker
                timePresets={
                    presets ? (
                        <TimePresets
                            presets={presets}
                            setValue={setValue}
                            setHighlighted={setHighlighted}
                        />
                    ) : null
                }
                clearSelection={<ClearSelection />}
                highlighted={highlighted}
                label="Date range"
                setHighlighted={setHighlighted}
                value={value}
                onChange={setValue}
                {...props}
            />
        </>
    );
};

const TimePresets = ({ presets, setHighlighted, setValue }) => (
    <div className="c-calendar__range--time-presets" aria-label="Time Presets" role="group">
        <div>Time Presets</div>

        {createTimePresets(presets).map(({ endDate, name, startDate }, index) => (
            <button
                key={index}
                onClick={() => {
                    setHighlighted((prev) => ({ ...prev, setTimePreset: true }));
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
