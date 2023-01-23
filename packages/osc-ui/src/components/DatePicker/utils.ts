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
