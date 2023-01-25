import { getLocalTimeZone, today } from '@internationalized/date';
import React, { useState } from 'react';
import { RangeCalendar } from './RangeCalendar';

export const RangeCalendarContainer = ({ clearSelection, timePresets, ...rest }) => {
    let [value, setValue] = useState(null);
    let [focusedDate, setFocusedDate] = useState(today(getLocalTimeZone()));

    return (
        <div className="c-calendar__range--container">
            <div className="c-calendar__range--inner-container-1">
                {timePresets}
                <div className="c-calendar__range--calendar">
                    <RangeCalendar
                        focusedValue={focusedDate}
                        onFocusChange={setFocusedDate}
                        aria-label="Date range"
                        value={value}
                        onChange={setValue}
                        {...rest}
                    />
                </div>
            </div>
            <div className="c-calendar__range--inner-container-2">
                {/* TODO - Need to work out if there is a method for when one date has been clicked */}
                {/* onChange handler for rangeCalendar only triggers once both dates are set */}
                <div>Now Select an End Date</div>
                <div className="c-calendar__range--inner-container-2-options">
                    {clearSelection}
                    <button
                        className="c-calendar__range--today"
                        onClick={() => setFocusedDate(today(getLocalTimeZone()))}
                    >
                        Jump to Today
                    </button>
                </div>
            </div>
        </div>
    );
};
