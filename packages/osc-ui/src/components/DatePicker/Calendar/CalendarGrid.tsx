import { endOfMonth, getWeeksInMonth } from '@internationalized/date';
import type { AriaCalendarGridProps } from '@react-aria/calendar';
import { useCalendarGrid } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar';
import React from 'react';
import { CalendarCell } from './CalendarCell';

interface GridProps extends AriaCalendarGridProps {
    offset?: {};
    state: CalendarState | RangeCalendarState;
}

export const CalendarGrid = ({ state, offset = {} }: GridProps) => {
    let { locale } = useLocale();

    // If there is an offset (used for the range calender then apply to the start date)
    let startDate = state.visibleRange.start.add(offset);

    // Temporarily casting to 'any' - useCalendarGrid is complaing about it being
    // of type 'ZonedDateTime'
    let endDate = endOfMonth(startDate) as any;

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
        <table {...gridProps}>
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
                                        key={i}
                                        state={state}
                                        date={date}
                                        currentMonth={startDate}
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
