import { getLocalTimeZone, GregorianCalendar, today } from '@internationalized/date';
import type { AriaRangeCalendarProps } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { useRangeCalendarState } from '@react-stately/calendar';
import type { DateValue } from '@react-types/calendar';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { RangeCalendar } from './RangeCalendar';
import type { Dispatch, SetStateAction } from 'react';
import type { RangeValue } from '@react-types/shared';
import type { CalendarDate } from '@internationalized/date';

type SelectedRange = {
    timePreset: boolean;
    range: RangeValue<CalendarDate>;
};
interface RangeCalendarContainerProps extends AriaRangeCalendarProps<DateValue> {
    clearSelection: ReactNode;
    selectedRange: SelectedRange;
    setSelectedRange: Dispatch<SetStateAction<SelectedRange>>;
    timePresets: ReactNode;
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
    selectedRange,
    timePresets,
    setSelectedRange,
    ...props
}: RangeCalendarContainerProps) => {
    const [showPrompt, setShowPrompt] = useState(false);

    let { locale } = useLocale();
    let state = useRangeCalendarState({
        ...props,
        visibleDuration: { months: 2 },
        locale,
        createCalendar,
    });

    const { setFocusedDate } = state;

    // This is designed to enable a prompt that tells the user to
    // select an end date once they've selected a start date
    useEffect(() => {
        if (!state.highlightedRange) return;
        // Check whether the day the user has selected (and is passed down as state)
        // is different - If it is then show the prompt
        if (
            state.highlightedRange.start.day &&
            state.highlightedRange.start.day !== selectedRange.range?.start.day
        ) {
            // This is an additional check on the time presets (e.g. yesterday, 7 days ago...)
            // This automatically sets the whole range in one click so we don't want to show users
            // the prompt in these cases
            if (selectedRange.timePreset) {
                setSelectedRange((prev) => {
                    return { ...prev, timePreset: false };
                });
                return setShowPrompt(false);
            }
            setSelectedRange((prev) => {
                setShowPrompt(true);
                return { ...prev, range: state.highlightedRange };
            });
        } else {
            setShowPrompt(false);
        }
        // Update when the start day changes, and when the entire value changes (ie - when)
        // both the start and end date are updated
    }, [state.highlightedRange?.start.day, state.value]);

    return (
        <div className="c-calendar__range--container">
            <div className="c-calendar__range--inner-container-1">
                {timePresets}
                <div className="c-calendar__range--calendar-container">
                    <RangeCalendar aria-label="Date range" state={state} {...props} />
                </div>
            </div>
            <div className="c-calendar__range--inner-container-2">
                <div>{showPrompt && <span>Now Select an End Date</span>}</div>
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
