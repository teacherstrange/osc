import { getLocalTimeZone, today } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import React, { useState } from 'react';
import { RangeCalendar } from './RangeCalendar';

export const RangeCalendarContainer = (props) => {
    const { timePresets } = props;
    let [value, setValue] = useState(null);
    let [focusedDate, setFocusedDate] = useState(today(getLocalTimeZone()));

    return (
        <div className="c-calendar__range--container">
            <div className="c-calendar__range--inner-container-1">
                {timePresets ? (
                    <div className="c-calendar__range--time-presets">
                        <div> Time Presets </div>
                        {timePresets.map((preset, index) => {
                            let startDate, endDate;
                            if (preset.length > 0) {
                                startDate = today(getLocalTimeZone());
                                endDate = today(getLocalTimeZone()).add({
                                    days: preset.length - 1,
                                });
                            }
                            if (preset.length < 0) {
                                if (preset.length === -1) {
                                    startDate = today(getLocalTimeZone()).subtract({
                                        days: Math.abs(preset.length),
                                    });
                                    endDate = today(getLocalTimeZone()).subtract({
                                        days: 1,
                                    });
                                } else {
                                    startDate = today(getLocalTimeZone()).subtract({
                                        days: Math.abs(preset.length + 1),
                                    });
                                    endDate = today(getLocalTimeZone());
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() =>
                                        setValue({
                                            start: startDate,
                                            end: endDate,
                                        })
                                    }
                                >
                                    {preset.name}
                                </button>
                            );
                        })}
                    </div>
                ) : null}
                <div className="c-calendar__range--calendar">
                    <I18nProvider locale="en-GB">
                        <RangeCalendar
                            focusedValue={focusedDate}
                            onFocusChange={setFocusedDate}
                            aria-label="Date range"
                            value={value}
                            onChange={setValue}
                        />
                    </I18nProvider>
                </div>
            </div>
            <div className="c-calendar__range--inner-container-2">
                <div>Now Select an End Date</div>
                <div className="c-calendar__range--inner-container-2-options">
                    <div onClick={() => setValue(null)}>Clear Selection</div>
                    <div onClick={() => setFocusedDate(today(getLocalTimeZone()))}>
                        Jump to Today
                    </div>
                </div>
            </div>
        </div>
    );
};
