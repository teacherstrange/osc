import type { AriaCalendarCellProps } from '@react-aria/calendar';
import { useCalendarCell } from '@react-aria/calendar';

import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import React, { useRef } from 'react';

import type { CalendarDate } from '@internationalized/date';
import { isSameMonth } from '@internationalized/date';
import type { CalendarState } from '@react-stately/calendar';

interface CellProps extends AriaCalendarCellProps {
    currentMonth: CalendarDate;
    state: CalendarState;
}

export const CalendarCell = ({ currentMonth, date, state }: CellProps) => {
    let ref = useRef();
    let { buttonProps, cellProps, formattedDate, isDisabled, isSelected, isUnavailable } =
        useCalendarCell({ date }, state, ref);

    let isOutsideMonth;

    if (currentMonth) {
        isOutsideMonth = !isSameMonth(currentMonth, date);
    }

    // BELOW CODE IS USED IN AN EXAMPLE FOR THE RANGE CALENDAR TO HELP WITH THE STYLING...

    // **************************************************************************************************** //

    // The start and end date of the selected range will have
    // an emphasized appearance.

    // let isSelectionStart = state.highlightedRange
    //     ? isSameDay(date, state.highlightedRange.start)
    //     : isSelected;
    // let isSelectionEnd = state.highlightedRange
    //     ? isSameDay(date, state.highlightedRange.end)
    //     : isSelected;

    // let { locale } = useLocale();

    // let dayOfWeek = getDayOfWeek(date, locale);

    // let isRoundedLeft = isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1);
    // let isRoundedRight =
    //     isSelected &&
    //     (isSelectionEnd || dayOfWeek === 6 || date.day === date.calendar.getDaysInMonth(date));

    // **************************************************************************************************** //

    let { focusProps, isFocusVisible } = useFocusRing();

    return (
        <td {...cellProps} data-selected={isSelected}>
            <div
                {...mergeProps(buttonProps, focusProps)}
                ref={ref}
                // Used in example for range
                hidden={isOutsideMonth}
                // Used in original example for simple calendar
                // hidden={isOutsideVisibleRange}
                className={`c-calendar__cell ${isSelected ? 'c-calendar__cell--selected' : ''} ${
                    isDisabled ? 'c-calendar__cell--disabled' : ''
                } ${isUnavailable ? 'c-calendar__cell--unavailable' : ''}`}
            >
                {formattedDate}
            </div>
        </td>
    );
};
