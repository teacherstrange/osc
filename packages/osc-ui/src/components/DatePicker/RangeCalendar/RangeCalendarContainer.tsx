import { getLocalTimeZone, GregorianCalendar, today } from '@internationalized/date';
import type { AriaRangeCalendarProps } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { useRangeCalendarState } from '@react-stately/calendar';
import type { DateValue } from '@react-types/calendar';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { RangeCalendar } from './RangeCalendar';

interface RangeCalendarContainerProps extends AriaRangeCalendarProps<DateValue> {
    timePresets: ReactNode;
    clearSelection: ReactNode;
}

const createCalendar = (identifier) => {
    switch (identifier) {
        case 'gregory':
            return new GregorianCalendar();
        default:
            throw new Error(`Unsupported calendar ${identifier}`);
    }
};

export const RangeCalendarContainer = ({
    clearSelection,
    highlighted,
    timePresets,
    setHighlighted,
    selectEndDate,
    ...props
}: RangeCalendarContainerProps) => {
    // let [highlighted, setHighlighted] = useState({ bool: true, value: null });
    const [value, setValue] = useState(false);

    let { locale } = useLocale();
    let state = useRangeCalendarState({
        ...props,
        visibleDuration: { months: 2 },
        locale,
        createCalendar,
    });

    const { setFocusedDate, highlightedRange } = state;

    // This is designed to enable a pop up in the Range Picker to tell the
    // user to select an end date once they've selected a start date
    useEffect(() => {
        if (!highlightedRange) return;
        if (
            highlightedRange.start.day &&
            highlightedRange.start.day !== highlighted.value?.start.day
        ) {
            if (highlighted.setTimePreset) {
                setHighlighted((prev) => {
                    return { ...prev, setTimePreset: false };
                });
                return setValue(false);
            }
            setHighlighted((prev) => {
                setValue(true);
                return { ...prev, bool: false, value: highlightedRange };
            });
        } else if (selectEndDate) {
            setValue(false);
        }
    }, [highlightedRange?.start.day, selectEndDate]);

    return (
        <div className="c-calendar__range--container">
            <div className="c-calendar__range--inner-container-1">
                {timePresets}
                <div className="c-calendar__range--calendar-container">
                    <RangeCalendar aria-label="Date range" state={state} {...props} />
                </div>
            </div>
            <div className="c-calendar__range--inner-container-2">
                {value && <div>Now Select an End Date</div>}
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
