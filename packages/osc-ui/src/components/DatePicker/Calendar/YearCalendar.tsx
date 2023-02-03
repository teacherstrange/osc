import { createCalendar } from '@internationalized/date';
import { useCalendar } from '@react-aria/calendar';
import { useDateFormatter, useLocale } from '@react-aria/i18n';
import { useCalendarState } from '@react-stately/calendar';
import React, { useRef } from 'react';
import { Icon } from '../../Icon/Icon';
import '../calendar.scss';
import { ReactAriaButton } from '../ReactAriaComponents/ReactAriaComponents';
import { selectDateHandler } from '../utils';

const Year = ({ state, className }) => {
    let formatter = useDateFormatter({
        year: 'numeric',
        timeZone: state.timeZone,
    });

    return (
        <div className={className}>
            {formatter.format(state.focusedDate.toDate(state.timeZone))}
        </div>
    );
};

const MonthSelector = ({ state }) => {
    let formatter = useDateFormatter({
        month: 'short',
        timeZone: state.timeZone,
    });

    const Month = ({ index }) => {
        let date = state.focusedDate.set({ month: index + 1 });
        const fomattedMonth = formatter.format(date.toDate(state.timeZone));
        const isSelected = state.isSelected(date);

        return (
            <button
                className={
                    isSelected
                        ? `c-calendar__year-view--month-button c-calendar__year-view--selected`
                        : `c-calendar__year-view--month-button`
                }
                key={index}
                onClick={(e) => {
                    selectDateHandler(e, state, 'month');
                }}
                value={index + 1}
            >
                {fomattedMonth}
            </button>
        );
    };

    const monthsResult = () => {
        let i = 0;
        return [...new Array(4).keys()].map((_, idx) => (
            <div className="c-calendar__year-view--month-container" key={idx}>
                {[...new Array(3).keys()].map((_) => {
                    const year = <Month index={i} />;
                    i++;
                    return year;
                })}
            </div>
        ));
    };

    return <div>{monthsResult()}</div>;
};

export const YearCalendar = (props) => {
    let { locale } = useLocale();
    let state = useCalendarState({
        ...props,
        locale,
        createCalendar,
    });
    let ref = useRef();
    let { calendarProps } = useCalendar(props, state, ref);

    return (
        <div {...calendarProps} ref={ref} className="c-calendar c-calendar__year-view">
            <div className="c-calendar__header">
                <ReactAriaButton
                    onPress={() => {
                        state.setFocusedDate(state.focusedDate.subtract({ years: 1 }));
                    }}
                >
                    <Icon className="chevron" id="chevron-left" />
                </ReactAriaButton>
                <Year className="c-calendar__year" state={state} />
                <ReactAriaButton
                    onPress={() => {
                        state.setFocusedDate(state.focusedDate.add({ years: 1 }));
                    }}
                >
                    <Icon className="chevron" id="chevron-right" />
                </ReactAriaButton>
            </div>
            <div className="year-calendar__dropdowns">
                <MonthSelector state={state} />
            </div>
        </div>
    );
};
