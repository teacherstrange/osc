import type { CalendarDate, DateFormatter } from '@internationalized/date';
import type { AriaCalendarProps } from '@react-aria/calendar';
import { useCalendar } from '@react-aria/calendar';
import { useDateFormatter, useLocale } from '@react-aria/i18n';
import type { Dispatch, ReactElement, SetStateAction } from 'react';

import type { CalendarState } from '@react-stately/calendar';
import { useCalendarState } from '@react-stately/calendar';
import type { DateValue } from '@react-types/calendar';
import React, { useEffect, useState } from 'react';
import { Button } from '../../Button/Button';
import { Icon } from '../../Icon/Icon';
import { checkDateRange, selectDateHandler } from '../utils';
import { createCalendar } from './Calendar';

type Year = {
    isDisabled: boolean;
    formatted: string;
    value: CalendarDate;
};

const getYears = (state: CalendarState, formatter: DateFormatter): Year[] => {
    let years = [];

    for (let i = -5; i <= 6; i++) {
        let date = state.focusedDate.add({ years: i });
        const minYear = state.minValue?.year;
        const maxYear = state.maxValue?.year;
        const year = date.year;
        const isDisabled = checkDateRange(minYear, maxYear, year);

        years.push({
            isDisabled: isDisabled,
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
    const minYear = state.minValue?.year;
    const maxYear = state.maxValue?.year;

    const startYearDisabled = checkDateRange(minYear, maxYear, +startYear);
    const endYearDisabled = checkDateRange(minYear, maxYear, +endYear);

    return (
        <div className="c-calendar__date-container">
            <Button
                className={`${classes} ${startYearDisabled ? `c-calendar__button--disabled` : ``}`}
                isDisabled={startYearDisabled}
                onClick={() => {
                    const date = state.focusedDate.set({ year: +startYear });
                    state.setFocusedDate(date);
                    state.setValue(date);
                    setCalendarView('month');
                }}
                variant="quaternary"
            >
                {startYear}
            </Button>
            <span className={`${classes} ${endYearDisabled ? `c-calendar__button--disabled` : ``}`}>
                -
            </span>
            <Button
                className={`${classes} ${endYearDisabled ? `c-calendar__button--disabled` : ``}`}
                isDisabled={endYearDisabled}
                onClick={() => {
                    const date = state.focusedDate.set({ year: +endYear });
                    state.setFocusedDate(state.focusedDate.set(date));
                    state.setValue(state.focusedDate.set(date));
                    setCalendarView('month');
                }}
                variant="quaternary"
            >
                {endYear}
            </Button>
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

        const selectedClasses = isSelected
            ? `c-calendar__button--year c-calendar__button--selected`
            : `c-calendar__button--year `;

        const disabledClasses = year.isDisabled ? 'c-calendar__button--disabled' : '';

        return (
            <Button
                className={`${selectedClasses}${disabledClasses}`}
                disabled={year.isDisabled}
                key={i}
                onClick={(e) => {
                    setCalendarView('month');
                    selectDateHandler(e, state, 'year');
                }}
                value={year.formatted}
                variant="quaternary"
            >
                {year.formatted}
            </Button>
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

    const startDate = state.focusedDate.subtract({ years: 5 });
    const endDate = state.focusedDate.add({ years: 5 });
    const startDisabled = checkDateRange(state.minValue?.year, null, startDate.year);
    const endDisabled = checkDateRange(null, state.minValue?.year, endDate.year);

    return (
        <div {...calendarProps} className="c-calendar c-calendar__decade">
            <div className="c-calendar__header">
                <Button
                    onClick={() => {
                        state.setFocusedDate(state.focusedDate.subtract({ years: 10 }));
                        setYearStepper(true);
                    }}
                    className="c-calendar__button--chevron"
                    isDisabled={startDisabled}
                    variant="quaternary"
                >
                    <Icon id="chevron-left" />
                </Button>
                {years ? (
                    <YearRange
                        classes="c-calendar__current-year"
                        state={state}
                        years={years}
                        setCalendarView={setCalendarView}
                    />
                ) : null}
                <Button
                    onClick={() => {
                        state.setFocusedDate(state.focusedDate.add({ years: 10 }));
                        setYearStepper(true);
                    }}
                    className="c-calendar__button--chevron"
                    isDisabled={endDisabled}
                    variant="quaternary"
                >
                    <Icon id="chevron-right" />
                </Button>
            </div>
            <div className="c-calendar__decade-dropdown">
                {years ? (
                    <Years state={state} years={years} setCalendarView={setCalendarView} />
                ) : null}
            </div>
        </div>
    );
};
