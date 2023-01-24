import React, { useState } from 'react';
import type { FunctionComponent } from 'react';
import { parseDate } from '@internationalized/date';
import { DateRangePicker } from './DateRangePicker';
import { createTimePresets } from '../utils';

export const DateRangePickerContainer = ({ presets }) => {
    let [value, setValue] = useState({
        start: parseDate('2020-02-03'),
        end: parseDate('2020-02-08'),
    });

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

    const ClearSelection = () => <div onClick={() => setValue(null)}>Clear Selection</div>;

    return (
        <>
            <DateRangePicker
                timePresets={TimePresets ? <TimePresets /> : null}
                clearSelection={<ClearSelection />}
                label="Date range"
                value={value}
                onChange={setValue}
            />
        </>
    );
};
