import React, { useState } from 'react';
import { DateRangePicker } from './DateRangePicker';
import { createTimePresets } from '../utils';
import type { AriaDateRangePickerProps } from '@react-aria/datepicker';
import type { DateValue } from '@react-types/calendar';

interface DateRangePickerContainerProps extends AriaDateRangePickerProps<DateValue> {
    presets?: { name: string; length: number }[];
}

export const DateRangePickerContainer = ({
    defaultValue,
    presets,
    ...props
}: DateRangePickerContainerProps) => {
    const [value, setValue] = useState(defaultValue ? defaultValue : null);

    const ClearSelection = () => (
        <button className="c-calendar__range--clear-selection" onClick={() => setValue(null)}>
            Clear Selection
        </button>
    );

    return (
        <>
            <DateRangePicker
                timePresets={presets ? <TimePresets presets={presets} setValue={setValue} /> : null}
                clearSelection={<ClearSelection />}
                label="Date range"
                value={value}
                onChange={setValue}
                {...props}
            />
        </>
    );
};

const TimePresets = ({ presets, setValue }) => (
    <div className="c-calendar__range--time-presets">
        <div> Time Presets </div>

        {createTimePresets(presets).map(({ endDate, name, startDate }, index) => (
            <button
                key={index}
                onClick={() => {
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
