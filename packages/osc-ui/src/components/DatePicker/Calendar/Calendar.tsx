import React from 'react';
import { useCalendar } from '@react-aria/calendar';
import { useLocale, useDateFormatter } from '@react-aria/i18n';
import { useCalendarState } from '@react-stately/calendar';
import { GregorianCalendar } from '@internationalized/date';
import { Icon } from '../../Icon/Icon';
import { CalendarGrid } from './CalendarGrid';
import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import '../calendar.scss';
import { ReactAriaButton } from '../ReactAriaButton/ReactAriaButton';

const createCalendar = (identifier) => {
    switch (identifier) {
        case 'gregory':
            return new GregorianCalendar();
        default:
            throw new Error(`Unsupported calendar ${identifier}`);
    }
};

// TODO:
// 1) Add Error handling
// 2) Add TS

export const Calendar = (props) => {
    let { locale } = useLocale();
    let state = useCalendarState({
        ...props,
        locale,
        createCalendar,
    });

    let { calendarProps, errorMessageProps, nextButtonProps, prevButtonProps, title } = useCalendar(
        props,
        state
    );

    // Customsie to shorthand months, format and split out the month & year
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
                <div className="c-calendar__buttons" style={{ display: 'flex' }}>
                    <ReactAriaButton {...prevButtonProps}>
                        <Icon label="chevron-left">
                            <ChevronLeftIcon />
                        </Icon>
                    </ReactAriaButton>
                    <ReactAriaButton {...nextButtonProps}>
                        <Icon label="chevron-right">
                            <ChevronRightIcon />
                        </Icon>
                    </ReactAriaButton>
                </div>
            </div>
            <CalendarGrid state={state} />
        </div>
    );
};
