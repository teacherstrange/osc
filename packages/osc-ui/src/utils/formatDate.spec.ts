import { formatDate } from './formatDate';

test('transforms the date to readable format', () => {
    expect(
        formatDate('2022-09-28T15:36:12Z', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    ).toBe('Wednesday, 28 September 2022');

    expect(
        formatDate('2022-09-28', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    ).toBe('Wednesday, 28 September 2022');
});

test('returns an invalid date string if the date is invalid', () => {
    expect(
        formatDate('28/09/2022', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    ).toBe('Invalid date format');
});
