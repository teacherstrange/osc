import type { CalendarDate, DateFormatter, DateValue } from '@internationalized/date';
import { getLocalTimeZone, today } from '@internationalized/date';
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar';

type Year = {
    isDisabled: boolean;
    formatted: string;
    value: CalendarDate;
};

export const formatDate = (
    visibleRange: 'start' | 'end',
    formattedDate: DateFormatter,
    state: RangeCalendarState
): string[] => {
    if (visibleRange === 'start') {
        const [startMonth, startYear] = formattedDate
            .format(state.visibleRange.start.toDate(state.timeZone))
            .split(' ');

        return [startMonth, startYear];
    }
    if (visibleRange === 'end') {
        return formattedDate.format(state.visibleRange.end.toDate(state.timeZone)).split(' ');
    }
};

export const createTimePresets = (
    presets: { name: string; length: number }[]
): { endDate: CalendarDate; length: number; name: string; startDate: CalendarDate }[] =>
    presets.map((preset) => {
        let startDate, endDate;
        if (preset.length > 0) {
            startDate = today(getLocalTimeZone());
            endDate = today(getLocalTimeZone()).add({
                days: preset.length - 1,
            });
        } else if (preset.length < 0) {
            startDate = today(getLocalTimeZone()).subtract({
                days: Math.abs(preset.length),
            });
            endDate = today(getLocalTimeZone()).subtract({
                days: 1,
            });
        }

        return { startDate, endDate, name: preset.name, length: preset.length };
    });

export const selectDateHandler = (
    e: React.SyntheticEvent,
    state: CalendarState,
    monthOrYear: 'month' | 'year'
) => {
    let date;
    // EventTarget interface in typescript only has 3 methods, so casting to Button Element
    // See: https://stackoverflow.com/questions/42081549/typescript-react-event-types
    let target = e.target as HTMLButtonElement;
    const value = Number(target.getAttribute('value'));

    if (monthOrYear === 'month') {
        date = state.focusedDate.set({ month: value });
    } else if (monthOrYear === 'year') {
        date = state.focusedDate.set({ year: value });
    }
    state.setFocusedDate(date);
    state.setValue(date);
};

/**
 * Check whether a month is outside of the min or max range -
 * This must also check the year so that it doesn't disable months
 * indiscriminately for every year
 */
export const checkMonthRange = (
    minDate: DateValue,
    maxDate: DateValue,
    date: CalendarDate
): boolean => {
    let isOutOfRange = false;

    if (minDate) {
        if (date.month < minDate.month && date.year <= minDate.year) {
            isOutOfRange = true;
        } else if (maxDate) {
            if (date.month > maxDate.month && date.year >= maxDate.year) {
                isOutOfRange = true;
            }
        }
    } else if (maxDate) {
        if (date.month > maxDate.month && date.year >= maxDate.year) {
            isOutOfRange = true;
        }
    }
    return isOutOfRange;
};

/**
 * Check whether a year is outside of the min or max range - Used
 * with year and decade calendar to set the disabled ranges
 */
export const checkYearRange = (minDate: number, maxDate: number, date: number): boolean => {
    let isOutOfRange = false;
    if (minDate) {
        if (date < minDate) {
            isOutOfRange = true;
        } else if (maxDate) {
            if (date > maxDate) {
                isOutOfRange = true;
            }
        }
    } else if (maxDate) {
        if (date > maxDate) {
            isOutOfRange = true;
        }
    }
    return isOutOfRange;
};

/**
 * set the start and end disabled range - Used with year and decade calendar
 */
export const setDisabledRange = (
    state: CalendarState,
    type: string,
    time: number | Year[]
): [boolean, boolean] => {
    let startDisabled, endDisabled;
    if (type === 'toggleDates') {
        const years = time as number;
        const startDate = state.focusedDate.subtract({ years: years });
        const endDate = state.focusedDate.add({ years: years });
        startDisabled = checkYearRange(state.minValue?.year, null, startDate.year);
        endDisabled = checkYearRange(null, state.maxValue?.year, endDate.year);
    }
    if (type === 'yearSelector') {
        const year = time as Year[];
        const startYear = year[0].formatted;
        const endYear = year[year.length - 1].formatted;
        startDisabled = checkYearRange(state.minValue?.year, state.maxValue?.year, +startYear);
        endDisabled = checkYearRange(state.minValue?.year, state.maxValue?.year, +endYear);
    }
    return [startDisabled, endDisabled];
};
