import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import type { AriaRangeCalendarProps } from '@react-aria/calendar';
import { useRangeCalendar } from '@react-aria/calendar';
import { useDateFormatter } from '@react-aria/i18n';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import type { RangeCalendarState } from '@react-stately/calendar';
import type { DateValue } from '@react-types/calendar';
import React, { useRef } from 'react';
import { Icon } from '../../Icon/Icon';
import '../calendar.scss';
import { CalendarGrid } from '../Calendar/CalendarGrid';
import { ReactAriaButton } from '../ReactAriaComponents/ReactAriaComponents';
import { formatDate } from '../utils';

interface RangeCalendarProps extends AriaRangeCalendarProps<DateValue> {
    state: RangeCalendarState;
}

export const RangeCalendar = (props: RangeCalendarProps) => {
    const { state } = props;
    const RANGES = ['start', 'end'];

    let ref = useRef();
    let { calendarProps, prevButtonProps, nextButtonProps } = useRangeCalendar(props, state, ref);

    // Format date to use shorthand for months
    const formattedDate = useDateFormatter({
        month: 'short',
        year: 'numeric',
        timeZone: state.timeZone,
    });

    const startAndEndDate = RANGES.map((range: 'start' | 'end', index: number) => {
        return (
            <h3 key={index}>
                {formatDate(range, formattedDate, state).map((date, idx) => {
                    const dateSegment = ['month', 'year'];
                    return (
                        <span key={idx} className={`c-calendar__${dateSegment[idx]}`}>
                            {date}
                        </span>
                    );
                })}
            </h3>
        );
    });

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
