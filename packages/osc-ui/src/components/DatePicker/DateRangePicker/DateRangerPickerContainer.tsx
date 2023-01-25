import React, { useState } from 'react';
import type { FunctionComponent } from 'react';
import { DateRangePicker } from './DateRangePicker';
import { createTimePresets } from '../utils';

export const DateRangePickerContainer = ({ defaultValue, presets, ...props }) => {
    let [value, setValue] = useState(defaultValue ? defaultValue : null);

    let TimePresets: FunctionComponent;

    if (presets) {
        TimePresets = () => (
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
    }

    const ClearSelection = () => (
        <button className="c-calendar__range--clear-selection" onClick={() => setValue(null)}>
            Clear Selection
        </button>
    );

    return (
        <>
            <DateRangePicker
                timePresets={TimePresets ? <TimePresets /> : null}
                clearSelection={<ClearSelection />}
                label="Date range"
                value={value}
                onChange={setValue}
                {...props}
            />
        </>
    );
};
