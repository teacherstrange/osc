import type { AriaCalendarProps } from '@react-aria/calendar';
import { useCalendar } from '@react-aria/calendar';
import { useDateFormatter, useLocale } from '@react-aria/i18n';
import type { CalendarState } from '@react-stately/calendar';
import { useCalendarState } from '@react-stately/calendar';
import type { DateValue } from '@react-types/calendar';
import type { Dispatch, ReactElement, SetStateAction } from 'react';
import React from 'react';
import { classNames } from '../../../utils/classNames';
import { Button } from '../../Button/Button';
import { Icon } from '../../Icon/Icon';
import '../calendar.scss';
import { checkMonthRange, createCalendar, selectDateHandler, setDisabledRange } from '../utils';

interface YearProps {
    className: string;
    setCalendarView: Dispatch<SetStateAction<'month' | 'year' | 'decade'>>;
    state: CalendarState;
}

const Year = (props: YearProps): ReactElement => {
    const { className, setCalendarView, state } = props;
    let formatter = useDateFormatter({
        year: 'numeric',
        timeZone: state.timeZone,
    });

    return (
        <Button
            className={className}
            onClick={() => setCalendarView('decade')}
            variant="quaternary"
        >
            {formatter.format(state.focusedDate.toDate(state.timeZone))}
        </Button>
    );
};

interface MonthProps {
    state: CalendarState;
    setCalendarView: Dispatch<SetStateAction<'month' | 'year' | 'decade'>>;
}

const Months = (props: MonthProps) => {
    const { state, setCalendarView } = props;
    let formatter = useDateFormatter({
        month: 'short',
        timeZone: state.timeZone,
    });

    const Month = (props): ReactElement => {
        const { index }: { index: number } = props;
        let date = state.focusedDate.set({ month: index + 1 });

        const isDisabled = checkMonthRange(state.minValue, state.maxValue, date);

        const fomattedMonth = formatter.format(date.toDate(state.timeZone));
        const isSelected = state.isSelected(date);

        const selectedClasses = isSelected
            ? 'c-calendar__button--year c-calendar__button--selected'
            : 'c-calendar__button--year';

        const disabledClasses = isDisabled ? 'c-calendar__button--disabled' : '';

        const classes = classNames(selectedClasses, disabledClasses);

        return (
            <Button
                className={classes}
                disabled={isDisabled}
                key={index}
                onClick={(e) => {
                    setCalendarView('month');
                    selectDateHandler(e, state, 'month');
                }}
                value={index + 1}
                variant="quaternary"
            >
                {fomattedMonth}
            </Button>
        );
    };

    const monthsResult = (): ReactElement[] => {
        let i = 0;
        // Set number of rows for the months
        return [...Array(4).keys()].map((_, idx) => (
            <div className="c-calendar__date-container" key={idx}>
                {/* Set number of columns for the months */}
                {[...Array(3).keys()].map((_) => {
                    const year = <Month key={i} index={i} />;
                    i++;
                    return year;
                })}
            </div>
        ));
    };

    return <div>{monthsResult()}</div>;
};

interface YearCalendarProps extends AriaCalendarProps<DateValue> {
    setCalendarView: Dispatch<SetStateAction<'month' | 'year' | 'decade'>>;
}

export const YearCalendar = (props: YearCalendarProps) => {
    const { setCalendarView, ...rest } = props;
    let { locale } = useLocale();
    let state = useCalendarState({
        ...rest,
        locale,
        createCalendar,
    });
    let { calendarProps } = useCalendar(rest, state);

    const [previousDatesDisabled, futureDatesDisabled] = setDisabledRange(state, 'toggleDates', 1);

    return (
        <div {...calendarProps} className="c-calendar c-calendar__year">
            <div className="c-calendar__header">
                <Button
                    onClick={() => {
                        state.setFocusedDate(state.focusedDate.subtract({ years: 1 }));
                    }}
                    className="c-calendar__button--chevron"
                    isDisabled={previousDatesDisabled}
                    variant="quaternary"
                >
                    <Icon id="chevron-left" />
                </Button>
                <Year
                    className="c-calendar__current-year"
                    setCalendarView={setCalendarView}
                    state={state}
                />
                <Button
                    onClick={() => {
                        state.setFocusedDate(state.focusedDate.add({ years: 1 }));
                    }}
                    className="c-calendar__button--chevron"
                    isDisabled={futureDatesDisabled}
                    variant="quaternary"
                >
                    <Icon id="chevron-right" />
                </Button>
            </div>
            <div className="c-calendar__year-dropdown">
                <Months state={state} setCalendarView={setCalendarView} />
            </div>
        </div>
    );
};
