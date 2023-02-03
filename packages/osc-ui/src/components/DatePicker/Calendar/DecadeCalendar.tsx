import { createCalendar } from '@internationalized/date';
import { useCalendar } from '@react-aria/calendar';
import { useDateFormatter, useLocale } from '@react-aria/i18n';
import { useCalendarState } from '@react-stately/calendar';
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../../Icon/Icon';
import { ReactAriaButton } from '../ReactAriaComponents/ReactAriaComponents';
import { selectDateHandler } from '../utils';

const getYears = (state, formatter) => {
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

const Years = ({ classes, years }) => {
    const startYear = years[0].formatted;
    const endYear = years[years.length - 1].formatted;
    return (
        <div className="c-calendar__year--container">
            <div className={classes}>{startYear}</div>
            <span className={classes}>-</span>
            <div className={classes}>{endYear}</div>
        </div>
    );
};

const YearSelector = ({ state, years }) => {
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
                    selectDateHandler(e, state, 'year');
                }}
                value={year.formatted}
            >
                {year.formatted}
            </button>
        );
    });

    const yearsResult = () => {
        let i = 0;
        return [...new Array(3).keys()].map((_, idx) => (
            <div key={idx}>
                {[...new Array(4).keys()].map((_) => {
                    const year = yearsArray[i];
                    i++;
                    return year;
                })}
            </div>
        ));
    };

    return <div>{yearsResult()}</div>;
};

export const DecadeCalendar = (props) => {
    const [years, setYears] = useState(null);
    const [yearStepper, setYearStepper] = useState(false);

    let { locale } = useLocale();
    let ref = useRef();
    let state = useCalendarState({
        ...props,
        locale,
        createCalendar,
    });
    let { calendarProps } = useCalendar(props, state, ref);
    let formatter = useDateFormatter({
        year: 'numeric',
        timeZone: state.timeZone,
    });

    // When the year stepper is adjusted then re-calculate the years
    useEffect(() => {
        setYears(getYears(state, formatter));
        setYearStepper(false);
    }, [yearStepper]);

    return (
        <div {...calendarProps} ref={ref} className="c-calendar c-calendar__decade-view">
            <div className="c-calendar__header">
                <ReactAriaButton
                    onPress={() => {
                        state.setFocusedDate(state.focusedDate.subtract({ years: 10 }));
                        setYearStepper(true);
                    }}
                >
                    <Icon className="chevron" id="chevron-left" />
                </ReactAriaButton>
                {years ? <Years classes="c-calendar__year" years={years} /> : null}
                <ReactAriaButton
                    onPress={() => {
                        state.setFocusedDate(state.focusedDate.add({ years: 10 }));
                        setYearStepper(true);
                    }}
                >
                    <Icon className="chevron" id="chevron-right" />
                </ReactAriaButton>
            </div>
            <div className="year-calendar__dropdowns">
                {years ? <YearSelector state={state} years={years} /> : null}
            </div>
        </div>
    );
};
