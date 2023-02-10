import type { CalendarDate } from '@internationalized/date';
import { getLocalTimeZone, GregorianCalendar, today } from '@internationalized/date';
import type { AriaRangeCalendarProps } from '@react-aria/calendar';
import { useRangeCalendar } from '@react-aria/calendar';
import { useDateFormatter, useLocale } from '@react-aria/i18n';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import type { RangeCalendarState } from '@react-stately/calendar';
import { useRangeCalendarState } from '@react-stately/calendar';
import type { DateValue } from '@react-types/calendar';
import type { RangeValue } from '@react-types/shared';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../../Icon/Icon';
import '../calendar.scss';
import { CalendarGrid } from '../Calendar/CalendarGridAndCell';
import { ReactAriaButton } from '../ReactAriaComponents/ReactAriaComponents';
import { formatDate } from '../utils';

/* -------------------------------------------------------------------------------------------------
 * RangeCalendarContainer
 * -----------------------------------------------------------------------------------------------*/

type SelectedRange = {
    timePreset: boolean;
    range: RangeValue<CalendarDate>;
};
interface RangeCalendarContainerProps extends AriaRangeCalendarProps<DateValue> {
    /**
     * A button component that allows the selected range to be cleared
     */
    clearSelection: ReactNode;
    /**
     * Indicates where a defaultValue has been set
     */
    initialDefault: boolean;
    /**
     * The selected range state that is passed down to the Range Calendar
     */
    selectedRange: SelectedRange;
    /**
     * A Dispatch that allows initialDefault value to be reset
     */
    setInitialDefault: Dispatch<SetStateAction<boolean>>;
    /**
     * A Dispatch that allows selectedRange state to be updated in the Range Calendar
     */
    setSelectedRange: Dispatch<SetStateAction<SelectedRange>>;
    /**
     * Preset time periods a user can select
     */
    timePresets: ReactNode;
}

const createCalendar = (identifier) => {
    switch (identifier) {
        case 'gregory':
            return new GregorianCalendar();
        default:
            throw new Error(`Unsupported calendar ${identifier}`);
    }
};

export const RangeCalendarContainer = (props: RangeCalendarContainerProps) => {
    const {
        clearSelection,
        initialDefault,
        selectedRange,
        setInitialDefault,
        setSelectedRange,
        timePresets,
        ...rest
    } = props;
    const [showPrompt, setShowPrompt] = useState(false);

    let { locale } = useLocale();
    let state = useRangeCalendarState({
        ...rest,
        visibleDuration: { months: 2 },
        locale,
        createCalendar,
    });

    const { setFocusedDate } = state;

    // This is designed to enable a prompt that tells the user to
    // select an end date once they've selected a start date
    useEffect(() => {
        if (!state.highlightedRange) return;
        // If a default Value has been set - do not show prompt, reset the state
        // so prompt can be shown on any further date changes
        if (initialDefault) {
            setInitialDefault(false);
            return;
        }
        // Check whether the day the user has selected (and is passed down as state)
        // is different - If it is then show the prompt
        if (
            state.highlightedRange.start.day &&
            state.highlightedRange.start.day !== selectedRange.range?.start.day
        ) {
            // This is an additional check on the time presets (e.g. yesterday, 7 days ago...)
            // This automatically sets the whole range in one click so we don't want to show users
            // the prompt in these cases
            if (selectedRange.timePreset) {
                setSelectedRange((prev) => {
                    return { ...prev, timePreset: false };
                });
                return setShowPrompt(false);
            }
            setSelectedRange((prev) => {
                setShowPrompt(true);
                return { ...prev, range: state.highlightedRange };
            });
        } else {
            setShowPrompt(false);
        }
        // Should only update when the start day changes, and when the entire value
        // changes (ie - when both the start and end date are updated)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.highlightedRange?.start.day, state.value]);

    return (
        <div className="c-calendar__range--container">
            <div className="c-calendar__range--inner-container-1">
                {timePresets}
                <div className="c-calendar__range--calendar-container">
                    <RangeCalendar aria-label="Date range" state={state} {...rest} />
                </div>
            </div>
            <div className="c-calendar__range--inner-container-2">
                <div className={showPrompt ? 'c-calendar__prompt' : 'c-calendar__prompt--hidden'}>
                    Now Select an End Date
                </div>
                <div className="c-calendar__range--inner-container-2-options">
                    {clearSelection}
                    <button
                        className="c-calendar__range--today"
                        onClick={() => setFocusedDate(today(getLocalTimeZone()))}
                    >
                        Jump to Today
                    </button>
                </div>
            </div>
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * RangeCalendar
 * -----------------------------------------------------------------------------------------------*/

interface RangeCalendarProps extends AriaRangeCalendarProps<DateValue> {
    /**
     * UseRangeCalendarState
     */
    state: RangeCalendarState;
}

export const RangeCalendar = (props: RangeCalendarProps) => {
    const { state } = props;

    let ref = useRef();
    let { calendarProps, prevButtonProps, nextButtonProps } = useRangeCalendar(props, state, ref);

    // Format date to use shorthand for months
    const formattedDate = useDateFormatter({
        month: 'short',
        year: 'numeric',
        timeZone: state.timeZone,
    });

    const Date = ({ range }: { range: 'start' | 'end' }) => {
        return (
            <div className="c-calendar__date-container">
                {formatDate(range, formattedDate, state).map((date, idx) => {
                    const dateSegment = ['month', 'year'];
                    return (
                        <span key={idx} className={`c-calendar__${dateSegment[idx]}`}>
                            {date}
                        </span>
                    );
                })}
            </div>
        );
    };

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
                            <Icon className="c-calendar__chevron" id="chevron-left" />
                        </ReactAriaButton>
                    </div>
                    <Date range={'start'} />
                </div>
                <div className="c-calendar__header--inner">
                    <Date range={'end'} />
                    <div className="c-calendar__buttons">
                        <ReactAriaButton {...nextButtonProps}>
                            <Icon className="c-calendar__chevron" id="chevron-right" />
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
