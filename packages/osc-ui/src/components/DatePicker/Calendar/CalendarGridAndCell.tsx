import type { CalendarDate } from '@internationalized/date';
import { endOfMonth, getWeeksInMonth, isSameDay, isSameMonth } from '@internationalized/date';
import type { AriaCalendarCellProps, AriaCalendarGridProps } from '@react-aria/calendar';
import { useCalendarCell, useCalendarGrid } from '@react-aria/calendar';
import { useFocusRing } from '@react-aria/focus';
import { useLocale } from '@react-aria/i18n';
import { mergeProps } from '@react-aria/utils';
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar';
import React, { useRef } from 'react';

/* -------------------------------------------------------------------------------------------------
 * CalendarGrid
 * -----------------------------------------------------------------------------------------------*/

interface GridProps extends AriaCalendarGridProps {
    /**
     * The number of months the range calendar is offset by
     */
    offset?: {};
    /**
     * State passed down from the Calendar
     */
    state: CalendarState | RangeCalendarState;
}

export const CalendarGrid = ({ offset = {}, state }: GridProps) => {
    let { locale } = useLocale();

    // If there is an offset (used for the range calender then apply to the start date)
    let startDate = state.visibleRange.start.add(offset);

    let endDate = endOfMonth(startDate);

    let { gridProps, headerProps, weekDays } = useCalendarGrid(
        {
            startDate,
            endDate,
        },
        state
    );

    // Get the number of weeks in the month so we can render the proper number of rows.
    let weeksInMonth = getWeeksInMonth(startDate, locale);

    return (
        <table {...gridProps} className="c-calendar__grid">
            <thead className="c-calendar__table-head" {...headerProps}>
                <tr>
                    {weekDays.map((day, index) => (
                        <th key={index}>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
                    <tr key={weekIndex}>
                        {state
                            .getDatesInWeek(weekIndex, startDate)
                            .map((date, i) =>
                                date ? (
                                    <CalendarCell
                                        currentMonth={startDate}
                                        date={date}
                                        key={i}
                                        state={state}
                                    />
                                ) : (
                                    <td key={i} />
                                )
                            )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

/* -------------------------------------------------------------------------------------------------
 * CalendarCell
 * -----------------------------------------------------------------------------------------------*/

interface CellProps extends AriaCalendarCellProps {
    /**
     * The selected month
     */
    currentMonth: CalendarDate;
    /**
     * State passed down from the Calendar
     */
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
