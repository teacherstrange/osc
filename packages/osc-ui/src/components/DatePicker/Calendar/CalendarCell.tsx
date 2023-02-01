import type { AriaCalendarCellProps } from '@react-aria/calendar';
import { useCalendarCell } from '@react-aria/calendar';

import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import React, { useRef } from 'react';

import type { CalendarDate } from '@internationalized/date';
import { isSameDay, isSameMonth } from '@internationalized/date';
import type { RangeCalendarState } from '@react-stately/calendar';

interface CellProps extends AriaCalendarCellProps {
    currentMonth: CalendarDate;
    state: RangeCalendarState;
}

export const CalendarCell = ({ currentMonth, date, state }: CellProps) => {
    let ref = useRef();
    let { buttonProps, cellProps, formattedDate, isDisabled, isSelected, isUnavailable } =
        useCalendarCell({ date }, state, ref);

    let isOutsideMonth;

    if (currentMonth) {
        isOutsideMonth = !isSameMonth(currentMonth, date);
    }

    let isSelectionStart = state.highlightedRange
        ? isSameDay(date, state.highlightedRange.start)
        : isSelected;
    let isSelectionEnd = state.highlightedRange
        ? isSameDay(date, state.highlightedRange.end)
        : isSelected;

    let isRoundedLeft = isSelected && (isSelectionStart || date.day === 1);
    let isRoundedRight =
        isSelected && (isSelectionEnd || date.day === date.calendar.getDaysInMonth(date));

    let { focusProps } = useFocusRing();

    return (
        <td {...cellProps} data-selected={isSelected}>
            <div
                {...mergeProps(buttonProps, focusProps)}
                ref={ref}
                hidden={isOutsideMonth}
                className={`c-calendar__cell ${isSelected ? 'c-calendar__cell--selected' : ''} ${
                    isDisabled ? 'c-calendar__cell--disabled' : ''
                } ${isUnavailable ? 'c-calendar__cell--unavailable' : ''}
                ${isRoundedLeft ? 'c-calendar__cell--rounded-left' : ''}
                ${isRoundedRight ? 'c-calendar__cell--rounded-right' : ''}
                ${isSelectionStart ? 'c-calendar__cell--selection-start' : ''}
                ${isSelectionEnd ? 'c-calendar__cell--selection-end' : ''}
                `}
            >
                {formattedDate}
            </div>
        </td>
    );
};
