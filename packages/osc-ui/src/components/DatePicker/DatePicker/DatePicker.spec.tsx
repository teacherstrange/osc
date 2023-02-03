import { render, screen } from '@testing-library/react';
import React from 'react';
import { DatePicker } from './DatePicker';
import userEvent from '@testing-library/user-event';
import { parseDate } from '@internationalized/date';

test('should render the DateField with SpinButtons for a DatePicker, a button for the Calendar and a Label', () => {
    render(<DatePicker type="month" label="Date" />);
    expect(screen.getByRole('group', { name: 'Date' })).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Date month' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Date day' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Date year' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Date Calendar' })).toBeInTheDocument();
});
test('should open the calendar when the calendar button is clicked', async () => {
    const user = userEvent.setup();
    render(<DatePicker type="month" label="Date" defaultValue={parseDate('2023-02-01')} />);
    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByRole('dialog', { name: 'Date Calendar' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'February 2023' })).toBeInTheDocument();
    expect(screen.getByRole('grid', { name: 'February 2023' })).toBeInTheDocument();
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
