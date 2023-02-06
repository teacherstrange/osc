import type { AriaCalendarCellProps } from '@react-aria/calendar';
import { useCalendarCell } from '@react-aria/calendar';

import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import React, { useRef } from 'react';

import type { CalendarDate } from '@internationalized/date';
import { isSameDay, isSameMonth } from '@internationalized/date';
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar';

interface CellProps extends AriaCalendarCellProps {
    currentMonth: CalendarDate;
    state: CalendarState | RangeCalendarState;
}

export const CalendarCell = ({ currentMonth, date, state }: CellProps) => {
    let ref = useRef();
    let { buttonProps, cellProps, formattedDate, isDisabled, isSelected } = useCalendarCell(
        { date },
        state,
        ref
    );

    let isOutsideMonth;

    if (currentMonth) {
        isOutsideMonth = !isSameMonth(currentMonth, date);
    }

    const rangeState = state as RangeCalendarState;
    const isSelectionStart = rangeState.highlightedRange
        ? isSameDay(date, rangeState.highlightedRange.start)
        : isSelected;
    const isSelectionEnd = rangeState.highlightedRange
        ? isSameDay(date, rangeState.highlightedRange.end)
        : isSelected;
    const isRoundedLeft = isSelected && (isSelectionStart || date.day === 1);
    const isRoundedRight =
        isSelected && (isSelectionEnd || date.day === date.calendar.getDaysInMonth(date));
    const { focusProps } = useFocusRing();

    return (
        <td {...cellProps} data-selected={isSelected}>
            <div
                {...mergeProps(buttonProps, focusProps)}
                ref={ref}
                hidden={isOutsideMonth}
                className={`c-calendar__cell ${isSelected ? 'c-calendar__cell--selected' : ''} ${
                    isDisabled ? 'c-calendar__cell--disabled' : ''
                } 
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
