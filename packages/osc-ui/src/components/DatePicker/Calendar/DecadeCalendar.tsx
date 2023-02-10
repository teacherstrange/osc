import type { CalendarDate, DateFormatter } from '@internationalized/date';
import type { AriaCalendarProps } from '@react-aria/calendar';
import { useCalendar } from '@react-aria/calendar';
import { useDateFormatter, useLocale } from '@react-aria/i18n';
import type { Dispatch, ReactElement, SetStateAction } from 'react';

import type { CalendarState } from '@react-stately/calendar';
import { useCalendarState } from '@react-stately/calendar';
import type { DateValue } from '@react-types/calendar';
import React, { useEffect, useState } from 'react';
import { Icon } from '../../Icon/Icon';
import { ReactAriaButton } from '../ReactAriaComponents/ReactAriaComponents';
import { selectDateHandler } from '../utils';
import { createCalendar } from './Calendar';

type Year = {
    value: CalendarDate;
    formatted: string;
};

const getYears = (state: CalendarState, formatter: DateFormatter): Year[] => {
    let years = [];

    for (let i = -5; i <= 6; i++) {
        let date = state.focusedDate.add({ years: i });
        years.push({
            value: date,
            formatted: formatter.format(date.toDate(state.timeZone)),
        });
    }

    return years;
};

interface YearRangeProps {
    classes: string;
    setCalendarView: Dispatch<SetStateAction<'month' | 'year' | 'decade'>>;
    state: CalendarState;
    years: Year[];
}

const YearRange = (props): ReactElement => {
    const { classes, setCalendarView, state, years }: YearRangeProps = props;
    const startYear = years[0].formatted;
    const endYear = years[years.length - 1].formatted;
    console.log('startYear', startYear);
    console.log('endYear', endYear);
    return (
        <div className="c-calendar__year--container">
            <ReactAriaButton
                className={classes}
                onPress={() => {
                    const date = state.focusedDate.set({ year: +startYear });
                    state.setFocusedDate(date);
                    state.setValue(date);
                    setCalendarView('month');
                }}
            >
                {startYear}
            </ReactAriaButton>
            <span className={classes}>-</span>
            <ReactAriaButton
                className={classes}
                onPress={() => {
                    const date = state.focusedDate.set({ year: +endYear });
                    state.setFocusedDate(state.focusedDate.set(date));
                    state.setValue(state.focusedDate.set(date));
                    setCalendarView('month');
                }}
            >
                {endYear}
            </ReactAriaButton>
        </div>
    );
};

const Years = (props) => {
    const {
        setCalendarView,
        state,
        years,
    }: {
        setCalendarView: Dispatch<SetStateAction<'month' | 'year' | 'decade'>>;
        state: CalendarState;
        years: Year[];
    } = props;
    const yearsArray = years.map((year, i) => {
        let date = state.value;
        const isSelected = date?.year === +year.formatted;

        return (
            <button
                className={
                    isSelected
                        ? `c-calendar__decade-view--year-button c-calendar__decade-view--selected`
                        : `c-calendar__decade-view--year-button `
                }
                key={i}
                onClick={(e) => {
                    setCalendarView('month');
                    selectDateHandler(e, state, 'year');
                }}
                value={year.formatted}
            >
                {year.formatted}
            </button>
        );
    });

    const yearsResult = (): ReactElement[] => {
        let i = 0;
        return [...Array(3).keys()].map((_, idx) => (
            <div key={idx}>
                {[...Array(4).keys()].map((_) => {
                    const year = yearsArray[i];
                    i++;
                    return year;
                })}
            </div>
        ));
    };

    return <div>{yearsResult()}</div>;
};

interface DecadeCalendarProps extends AriaCalendarProps<DateValue> {
    setCalendarView: Dispatch<SetStateAction<'month' | 'year' | 'decade'>>;
}

export const DecadeCalendar = (props: DecadeCalendarProps) => {
    const { setCalendarView, ...rest } = props;
    const [years, setYears] = useState(null);
    const [yearStepper, setYearStepper] = useState(false);

    let { locale } = useLocale();
    let state = useCalendarState({
        ...rest,
        locale,
        createCalendar,
    });
    let { calendarProps } = useCalendar(rest, state);
    let formatter = useDateFormatter({
        year: 'numeric',
        timeZone: state.timeZone,
    });

    // When the year stepper is adjusted then re-calculate the years
    useEffect(() => {
        setYears(getYears(state, formatter));
        setYearStepper(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- Only update when yearStepper is clicked
    }, [yearStepper]);

    return (
        <div {...calendarProps} className="c-calendar c-calendar__decade-view">
            <div className="c-calendar__header">
                <ReactAriaButton
                    onPress={() => {
                        state.setFocusedDate(state.focusedDate.subtract({ years: 10 }));
                        setYearStepper(true);
                    }}
                >
                    <Icon className="c-calendar__chevron" id="chevron-left" />
                </ReactAriaButton>
                {years ? (
                    <YearRange
                        classes="c-calendar__year"
                        state={state}
                        years={years}
                        setCalendarView={setCalendarView}
                    />
                ) : null}
                <ReactAriaButton
                    onPress={() => {
                        state.setFocusedDate(state.focusedDate.add({ years: 10 }));
                        setYearStepper(true);
                    }}
                >
                    <Icon className="c-calendar__chevron" id="chevron-right" />
                </ReactAriaButton>
            </div>
            <div className="year-calendar__dropdowns">
                {years ? (
                    <Years state={state} years={years} setCalendarView={setCalendarView} />
                ) : null}
            </div>
        </div>
    );
};
