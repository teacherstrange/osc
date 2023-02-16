import type { AnyCalendarDate, DateFormatter } from '@internationalized/date';
import { getLocalTimeZone, today } from '@internationalized/date';
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar';

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
): { endDate: AnyCalendarDate; length: number; name: string; startDate: AnyCalendarDate }[] =>
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

export const checkDateRange = (minDate: number, maxDate: number, date: number): boolean => {
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
