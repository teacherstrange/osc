import { getLocalTimeZone, today } from '@internationalized/date';
import type { AriaRangeCalendarProps } from '@react-aria/calendar';
import type { DateValue } from '@react-types/calendar';
import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { RangeCalendar } from './RangeCalendar';

interface RangeCalendarContainerProps extends AriaRangeCalendarProps<DateValue> {
    timePresets: ReactNode;
    clearSelection: ReactNode;
}

export const RangeCalendarContainer = ({
    clearSelection,
    timePresets,
    ...rest
}: RangeCalendarContainerProps) => {
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
