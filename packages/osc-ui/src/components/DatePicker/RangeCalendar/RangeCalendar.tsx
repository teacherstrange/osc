import { GregorianCalendar } from '@internationalized/date';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useRangeCalendar } from '@react-aria/calendar';
import type { AriaRangeCalendarProps } from '@react-aria/calendar';
import { useDateFormatter, useLocale } from '@react-aria/i18n';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useRangeCalendarState } from '@react-stately/calendar';
import React, { useRef } from 'react';
import { Icon } from '../../Icon/Icon';
import '../calendar.scss';
import { CalendarGrid } from '../Calendar/CalendarGrid';
import { ReactAriaButton } from '../ReactAriaComponents/ReactAriaComponents';
import { formatDate } from '../utils';
import type { DateValue } from '@react-types/calendar';

const createCalendar = (identifier) => {
    switch (identifier) {
        case 'gregory':
            return new GregorianCalendar();
        default:
            throw new Error(`Unsupported calendar ${identifier}`);
    }
};

export const RangeCalendar = (props: AriaRangeCalendarProps<DateValue>) => {
    let { locale } = useLocale();
    // Set up the state for the calendar using 2 visible months
    let state = useRangeCalendarState({
        ...props,
        visibleDuration: { months: 2 },
        locale,
        createCalendar,
    });
    let ref = useRef();
    let { calendarProps, prevButtonProps, nextButtonProps } = useRangeCalendar(props, state, ref);

    // Format date to use shorthand for months
    const formattedDate = useDateFormatter({
        month: 'short',
        year: 'numeric',
        timeZone: state.timeZone,
    });

    const startAndEndDate = ['start', 'end'].map((res, i) => (
        <h3 key={i}>
            {formatDate(res, formattedDate, state).map((res, i) => {
                const period = ['month', 'year'];
                return (
                    <span key={i} className={`c-calendar__${period[i]}`}>
                        {res}
                    </span>
                );
            })}
        </h3>
    ));

    return (
        <div {...calendarProps} ref={ref} className="c-calendar c-calendar__range">
            <div className="c-calendar__header">
                <div className="c-calendar__header--inner">
                    <div className="c-calendar__buttons">
                        {/* Add a screen reader only description of the entire visible range rather than
                         * a separate heading above each month grid. This is placed first in the DOM order
                         * so that it is the first thing a touch screen reader user encounters.
                         * In addition, VoiceOver on iOS does not announce the aria-label of the grid
                         * elements, so the aria-label of the Calendar is included here as well. */}
                        <VisuallyHidden>
                            <h2>{calendarProps['aria-label']}</h2>
                        </VisuallyHidden>
                        <ReactAriaButton {...prevButtonProps}>
                            <Icon label="chevron-left">
                                <ChevronLeftIcon />
                            </Icon>
                        </ReactAriaButton>
                    </div>
                    {startAndEndDate[0]}
                </div>
                <div className="c-calendar__header--inner">
                    {startAndEndDate[1]}
                    <div className="c-calendar__buttons">
                        <ReactAriaButton {...nextButtonProps}>
                            <Icon label="chevron-right">
                                <ChevronRightIcon />
                            </Icon>
                        </ReactAriaButton>
                    </div>
                </div>
            </div>
            <div className="c-calendar__grid-container">
                <CalendarGrid state={state} />
                <CalendarGrid state={state} offset={{ months: 1 }} />
            </div>
        </div>
    );
};
