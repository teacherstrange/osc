import { GregorianCalendar } from '@internationalized/date';
import type { AriaCalendarProps } from '@react-aria/calendar';
import { useCalendar } from '@react-aria/calendar';
import { useDateFormatter, useLocale } from '@react-aria/i18n';
import { useCalendarState } from '@react-stately/calendar';
import type { DateValue } from '@react-types/calendar';
import React from 'react';
import { Icon } from '../../Icon/Icon';
import '../calendar.scss';
import { ReactAriaButton } from '../ReactAriaComponents/ReactAriaComponents';
import { CalendarGrid } from './CalendarGrid';

const createCalendar = (identifier) => {
    switch (identifier) {
        case 'gregory':
            return new GregorianCalendar();
        default:
            throw new Error(`Unsupported calendar ${identifier}`);
    }
};

export const Calendar = (props: AriaCalendarProps<DateValue>) => {
    let { locale } = useLocale();
    let state = useCalendarState({
        ...props,
        locale,
        createCalendar,
    });

    let { calendarProps, nextButtonProps, prevButtonProps } = useCalendar(props, state);

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
                <h3>
                    <span className="c-calendar__month">{month} </span>
                    <span className="c-calendar__year">{year} </span>
                </h3>
                <div className="c-calendar__buttons">
                    <ReactAriaButton {...prevButtonProps}>
                        <Icon className="chevron" id="chevron-left" />
                    </ReactAriaButton>
                    <ReactAriaButton {...nextButtonProps}>
                        <Icon className="chevron" id="chevron-right" />
                    </ReactAriaButton>
                </div>
            </div>
            <CalendarGrid state={state} />
        </div>
    );
};
