import { GregorianCalendar } from '@internationalized/date';
import type { AriaCalendarProps } from '@react-aria/calendar';
import { useCalendar } from '@react-aria/calendar';
import { useDateFormatter, useLocale } from '@react-aria/i18n';
import { useCalendarState } from '@react-stately/calendar';
import type { DateValue } from '@react-types/calendar';
import type { Dispatch, SetStateAction } from 'react';
import React, { useState } from 'react';
import { Icon } from '../../Icon/Icon';
import '../calendar.scss';
import { ReactAriaButton } from '../ReactAriaComponents/ReactAriaComponents';
import { CalendarGrid } from './CalendarGridAndCell';
import { DecadeCalendar } from './DecadeCalendar';
import { YearCalendar } from './YearCalendar';

export const createCalendar = (identifier) => {
    switch (identifier) {
        case 'gregory':
            return new GregorianCalendar();
        default:
            throw new Error(`Unsupported calendar ${identifier}`);
    }
};

/* -------------------------------------------------------------------------------------------------
 * Calendar Container
 * -----------------------------------------------------------------------------------------------*/

interface CalendarContainerProps extends AriaCalendarProps<DateValue> {}

export const CalendarContainer = (props: CalendarContainerProps) => {
    const [calendarView, setCalendarView] = useState('month');

    switch (calendarView) {
        case 'month':
            return <Calendar setCalendarView={setCalendarView} {...props} />;

        case 'year':
            return <YearCalendar setCalendarView={setCalendarView} {...props} />;

        case 'decade':
            return <DecadeCalendar setCalendarView={setCalendarView} {...props} />;

        default:
            console.error('No calendar selected');
    }
};

/* -------------------------------------------------------------------------------------------------
 * Month Calendar
 * -----------------------------------------------------------------------------------------------*/
interface CalendarProps extends AriaCalendarProps<DateValue> {
    setCalendarView: Dispatch<SetStateAction<'month' | 'year' | 'decade'>>;
}

export const Calendar = (props: CalendarProps) => {
    const { setCalendarView, ...rest } = props;
    let { locale } = useLocale();
    let state = useCalendarState({
        ...rest,
        locale,
        createCalendar,
    });

    let { calendarProps, nextButtonProps, prevButtonProps } = useCalendar(rest, state);

    // Customise to shorthand months, format and split out the month & year
    const [month, year] = useDateFormatter({
        month: 'short',
        year: 'numeric',
        timeZone: state.timeZone,
    })
        .format(state.visibleRange.start.toDate(state.timeZone))
        .split(' ');

    return (
        <div {...calendarProps} className="c-calendar">
            <div className="c-calendar__header">
                <span className="c-calendar__date-container">
                    <ReactAriaButton
                        className="c-calendar__current-month"
                        onPress={() => setCalendarView('year')}
                    >
                        {month}
                    </ReactAriaButton>
                    <ReactAriaButton
                        className="c-calendar__current-year"
                        onPress={() => setCalendarView('decade')}
                    >
                        {year}
                    </ReactAriaButton>
                </span>
                <div className="c-calendar__buttons-container">
                    <ReactAriaButton {...prevButtonProps}>
                        <Icon className="c-calendar__button--chevron" id="chevron-left" />
                    </ReactAriaButton>
                    <ReactAriaButton {...nextButtonProps}>
                        <Icon className="c-calendar__button--chevron" id="chevron-right" />
                    </ReactAriaButton>
                </div>
            </div>
            <CalendarGrid state={state} />
        </div>
    );
};
