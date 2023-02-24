import { parseDate } from '@internationalized/date';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { SpritesheetProvider } from '../../Icon/Icon';
import { DateRangePickerContainer } from './DateRangePicker';

const TODAY = 'Today';
const YEST = 'Yesterday';
const THREE_DAYS = 'Last 3 days';
const presets = [
    {
        name: TODAY,
        length: 1,
    },
    {
        name: YEST,
        length: -1,
    },
    {
        name: THREE_DAYS,
        length: -3,
    },
];

// afterEach(() => {
//     vi.clearAllMocks();
//     vi.resetAllMocks();
// });

test('should render the DateField with SpinButtons for a DatePicker, a button for the Calendar and a Label', () => {
    render(
        <SpritesheetProvider>
            <DateRangePickerContainer label="Date Range" />
        </SpritesheetProvider>
    );
    const dateRange = ['Start', 'End'];

    expect(screen.getByRole('group', { name: 'Date Range' })).toBeInTheDocument();
    expect(screen.getAllByRole('presentation').length).toBe(2);
    dateRange.forEach((res) => {
        expect(
            screen.getByRole('spinbutton', { name: `Date Range ${res} Date month` })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('spinbutton', { name: `Date Range ${res} Date day` })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('spinbutton', { name: `Date Range ${res} Date year` })
        ).toBeInTheDocument();
    });
    expect(screen.getAllByRole('button', { name: 'Date Range' }).length).toBe(2);
});
test('should open the calendar when the calendar button is clicked', async () => {
    const dates = { start: parseDate('2023-02-04'), end: parseDate('2023-02-20') };
    const user = userEvent.setup();
    render(
        <SpritesheetProvider>
            <DateRangePickerContainer defaultValue={dates} label="Date Range" />
        </SpritesheetProvider>
    );
    const button = screen.getAllByRole('button')[0];
    await user.click(button);

    expect(screen.getByRole('dialog', { name: 'Date Range' })).toBeInTheDocument();
    expect(screen.getByText('Click to start selecting date range')).toBeInTheDocument();
    expect(screen.getByRole('grid', { name: 'February 2023' })).toBeInTheDocument();
    expect(screen.getByRole('grid', { name: 'March 2023' })).toBeInTheDocument();
});
test('should disable out of range dates when min/max values are passed in', async () => {
    const dates = { start: parseDate('2023-01-04'), end: parseDate('2023-01-20') };
    const user = userEvent.setup();
    const minDate = '03';
    const maxDate = 29;

    render(
        <SpritesheetProvider>
            <DateRangePickerContainer
                defaultValue={dates}
                label="Date Range"
                minValue={parseDate(`2023-01-${minDate}`)}
                maxValue={parseDate(`2023-01-${maxDate}`)}
            />
        </SpritesheetProvider>
    );
    const button = screen.getAllByRole('button')[0];
    await user.click(button);

    expect(
        screen.getByRole('button', { name: 'Tuesday, January 3, 2023, First available date' })
    ).toBeInTheDocument();
    expect(
        screen.getByRole('button', { name: 'Sunday, January 29, 2023, Last available date' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sunday, January 1, 2023' })).toHaveAttribute(
        'aria-disabled'
    );
    expect(screen.getByRole('button', { name: 'Monday, January 2, 2023' })).toHaveAttribute(
        'aria-disabled'
    );
    expect(screen.getByRole('button', { name: 'Monday, January 30, 2023' })).toHaveAttribute(
        'aria-disabled'
    );
    expect(screen.getByRole('button', { name: 'Tuesday, January 31, 2023' })).toHaveAttribute(
        'aria-disabled'
    );
});
test('should render time presets when pass in as a prop', async () => {
    const user = userEvent.setup();

    render(
        <SpritesheetProvider>
            <DateRangePickerContainer label="Date Range" presets={presets} />
        </SpritesheetProvider>
    );
    const button = screen.getAllByRole('button')[0];
    await user.click(button);
    expect(screen.getByRole('group', { name: 'Time Presets' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: TODAY })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: YEST })).toBeInTheDocument();
});

test('should select the correct range when a time present is selected', async () => {
    const user = userEvent.setup();
    const today = new Date().toISOString().split('T')[0];

    render(
        <SpritesheetProvider>
            <DateRangePickerContainer label="Date Range" presets={presets} />
        </SpritesheetProvider>
    );
    const button = screen.getAllByRole('button')[0];
    await user.click(button);
    const timePresetButton = screen.getByRole('button', { name: THREE_DAYS });
    await user.click(timePresetButton);

    const daysLength = Math.abs(presets[2].length);

    let i = 0;
    let length = daysLength - 1;
    // Get the days and check the correct days are selected
    while (i < daysLength) {
        let { day } = parseDate(today).subtract({ days: i + 1 });
        expect(screen.getAllByRole('button', { name: /selected/i })[length]).toHaveTextContent(
            day.toString()
        );
        i++;
        length--;
    }
});

test('should remove hidden class from "Now select end date" prompt when first date is selected', async () => {
    vi.mock('./../../../hooks/useMediaQuery', () => ({
        useMediaQuery: vi.fn(() => true),
    }));
    const user = userEvent.setup();

    render(
        <SpritesheetProvider>
            <DateRangePickerContainer label="Date Range" />
        </SpritesheetProvider>
    );
    const button = screen.getAllByRole('button')[0];
    await user.click(button);

    const gridCellStartBtn = await screen.getAllByText('5')[0];
    expect(screen.getByText('Now Select an End Date')).toHaveClass('c-calendar__prompt--hidden');
    await user.click(gridCellStartBtn);
    expect(screen.getByText('Now Select an End Date')).toHaveClass('c-calendar__prompt');
});

test('should clear selection if the Clear Selection button is selected', async () => {
    const user = userEvent.setup();

    render(
        <SpritesheetProvider>
            <DateRangePickerContainer label="Date Range" />
        </SpritesheetProvider>
    );
    const button = screen.getAllByRole('button')[0];
    await user.click(button);

    const gridCellStartBtn = await screen.getAllByText('10')[0];
    const gridCellEndBtn = await screen.getAllByText('11')[0];

    await user.click(gridCellStartBtn);
    await user.click(gridCellEndBtn);

    expect(screen.getAllByText('10')[1]).toHaveClass('c-calendar__cell--selected');
    expect(screen.getAllByText('11')[1]).toHaveClass('c-calendar__cell--selected');

    const clearSelectionBtn = screen.getByRole('button', { name: 'Clear Selection' });

    await user.click(clearSelectionBtn);
    expect(screen.getAllByText('10')[1]).not.toHaveClass('c-calendar__cell--selected');
    expect(screen.getAllByText('11')[1]).not.toHaveClass('c-calendar__cell--selected');
});
