import { getLocalTimeZone, today } from '@internationalized/date';

export const formatDate = (visibleRange, formattedDate, state) => {
    if (visibleRange === 'start') {
        const [startMonth, startYear] = formattedDate
            .format(state.visibleRange.start.toDate(state.timeZone))
            .split(' ');

        return [startMonth, startYear];
    }
    if (visibleRange === 'end') {
        return formattedDate.format(state.visibleRange.end.toDate(state.timeZone)).split(' ');
    }
    return null;
};

export const createTimePresets = (presets) =>
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
        return { startDate, endDate, name: preset.name };
    });
