import { parseDate } from '@internationalized/date';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from 'test-utils';
import { DatePicker } from './DatePicker';

test('should render the DateField with SpinButtons for a DatePicker, a button for the Calendar and a Label', () => {
    render(<DatePicker type="month" label="Date" name="date" />);
    expect(screen.getByRole('group', { name: 'Date' })).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'month' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'day' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'year' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Calendar' })).toBeInTheDocument();
});
test('should open the calendar when the calendar button is clicked', async () => {
    const user = userEvent.setup();
    render(
        <DatePicker type="month" label="Date" defaultValue={parseDate('2023-02-01')} name="date" />
    );
    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('Selected Date: February 1, 2023')).toBeInTheDocument();
});
test('should disable out of range dates when min/max values are passed in', async () => {
    const user = userEvent.setup();
    const minDate = 13;
    const maxDate = 20;

    render(
        <DatePicker
            type="month"
            label="Date"
            minValue={parseDate(`2023-01-${minDate}`)}
            maxValue={parseDate(`2023-01-${maxDate}`)}
            name="date"
        />
    );
    const button = screen.getByRole('button');
    await user.click(button);
    // Test all dates below the minDate
    let i = 1;
    while (i < minDate) {
        expect(screen.getByRole('gridcell', { name: i.toString() })).toHaveAttribute(
            'aria-disabled'
        );
        i++;
    }

    // Test all dates between the min and max dates
    i = minDate;
    while (i < maxDate) {
        expect(screen.getByRole('gridcell', { name: i.toString() })).not.toHaveAttribute(
            'aria-disabled'
        );
        i++;
    }

    // Test all dates above max until end of month
    i = maxDate + 1;
    while (i <= 31) {
        expect(screen.getByRole('gridcell', { name: i.toString() })).toHaveAttribute(
            'aria-disabled'
        );
        i++;
    }
});
test('should open the year and decade calendars and set the correct date', async () => {
    const finalSelectedDate = 'Selected Date: December 5, 2024';
    const user = userEvent.setup();
    render(
        <DatePicker
            closeOnSelect={false}
            type="month"
            label="Date"
            defaultValue={parseDate('2023-02-01')}
            name="date"
        />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    const monthButton = screen.getByRole('button', { name: 'Feb' });
    await user.click(monthButton);

    const decButton = screen.getByRole('button', { name: 'Dec' });
    await user.click(decButton);

    const yearButton = screen.getByRole('button', { name: '2023' });
    await user.click(yearButton);

    const year2024Button = screen.getByRole('button', { name: '2024' });
    await user.click(year2024Button);
    const dayButton = screen.getByRole('button', { name: 'Thursday, December 5, 2024' });
    await user.click(dayButton);

    expect(screen.getByText(finalSelectedDate)).toBeInTheDocument();
});
