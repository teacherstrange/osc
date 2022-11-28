import React from 'react';
import { CountdownClock } from './CountdownClock';
import { act, screen, render } from '@testing-library/react';
import type { Props } from './CountdownClock';
import { ClockIcon } from '@radix-ui/react-icons';

const DAY = 24 * 60 * 60 * 1000;
const HOUR = 1000 * 60 * 60;
const MINUTE = 60 * 1000;
const SECOND = 1000;
const DAYS = 'd';
const HOURS = 'h';
const MINUTES = 'm';
const SECONDS = 's';

describe('Countdown clock component', () => {
    const setup = ({ endDate, icon, name, onComplete }: Props) =>
        render(
            <CountdownClock endDate={endDate} icon={icon} name={name} onComplete={onComplete} />
        );
    const setDate = (length) => new Date().getTime() + length;
    const setPastDate = (length) => new Date().getTime() - length;

    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    test('should render a countdown timer', () => {
        const date = setDate(SECOND);
        const spy = vi.spyOn(global, 'setInterval');

        render(<CountdownClock endDate={date} />);

        act(() => {
            vi.runOnlyPendingTimers();
            vi.runOnlyPendingTimers();
        });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(expect.any(Function), 1000);
    });

    test('should render a countdown timer when the date is in the future', () => {
        const date = setDate(DAY);
        setup({
            endDate: date,
            onComplete: 'Time up'
        });

        const result = screen.getByRole('timer');

        expect(result).toBeInTheDocument();
    });

    test('should not render a countdown timer when the date is in the past', () => {
        const date = setPastDate(DAY);

        setup({ endDate: date, onComplete: 'Time up' });

        expect(screen.queryByRole('timer')).not.toBeInTheDocument();
    });

    test('should call setInterval and run every second when a valid future date is set', () => {
        const date = setDate(DAY);
        const intervalSpy = vi.spyOn(global, 'setInterval');
        setup({ endDate: date, onComplete: 'Time up' });

        expect(intervalSpy).toHaveBeenCalledTimes(1);
        expect(intervalSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
    });

    test('should update the time every second', () => {
        const date = setDate(DAY);

        setup({
            endDate: date,
            onComplete: 'Time up'
        });
        const daysOnFirstRender = screen.getByText('d', { exact: true }).previousSibling;

        act(() => {
            vi.runOnlyPendingTimers();
        });
        const daysAfterOneSecond = screen.queryByText(DAYS, { exact: true });
        const hoursAfterOneSecond = screen.queryByText(HOURS, { exact: true }).previousSibling;
        const minutesAfterOneSecond = screen.queryByText(MINUTES, { exact: true }).previousSibling;
        const secondsAfterOneSecond = screen.queryByText(SECONDS, { exact: true }).previousSibling;

        expect(daysOnFirstRender).toHaveTextContent('01');
        expect(daysAfterOneSecond).not.toBeInTheDocument();
        expect(hoursAfterOneSecond).toHaveTextContent('23');
        expect(minutesAfterOneSecond).toHaveTextContent('59');
        expect(secondsAfterOneSecond).toHaveTextContent('59');
    });

    test('should only render minutes and seconds if timer is less than 1 hour', () => {
        const date = setDate(MINUTE);

        setup({
            endDate: date,
            onComplete: 'Time up'
        });

        expect(screen.queryByText(DAYS, { exact: true })).not.toBeInTheDocument();
        expect(screen.queryByText(HOURS, { exact: true })).not.toBeInTheDocument();
        expect(screen.getByText(MINUTES, { exact: true })).toBeInTheDocument();
        expect(screen.getByText(SECONDS, { exact: true })).toBeInTheDocument();
    });
    test('should only render minutes, seconds and hours if timer is less than 1 day', () => {
        const date = setDate(HOUR * 2);

        setup({
            endDate: date,
            onComplete: 'Time up'
        });

        expect(screen.queryByText(DAYS, { exact: true })).not.toBeInTheDocument();
        expect(screen.getByText(HOURS, { exact: true })).toBeInTheDocument();
        expect(screen.getByText(MINUTES, { exact: true })).toBeInTheDocument();
        expect(screen.getByText(SECONDS, { exact: true })).toBeInTheDocument();
    });

    test('should render an icon when passed in as a prop', () => {
        const date = setDate(HOUR);
        const Icon = ClockIcon;

        const { container } = setup({
            endDate: date,
            icon: <Icon />,
            onComplete: 'Time up'
        });

        expect(container.querySelectorAll('svg').length).toBe(1);
    });

    test('should render a name for the timer when passed in as a prop', () => {
        const date = setDate(HOUR);
        const title = 'Time is running out!';

        setup({
            endDate: date,
            name: title,
            onComplete: 'Time up'
        });

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(title)).toHaveTextContent(title);
    });
    test('should render onComplete message once the timer is finished', () => {
        const date = setDate(SECOND);
        const title = 'Time is running out!';

        setup({
            endDate: date,
            name: title,
            onComplete: 'Time up'
        });

        act(() => {
            vi.runOnlyPendingTimers();
            vi.runOnlyPendingTimers();
        });

        expect(screen.queryByText(/Time up/i, { exact: true })).toHaveTextContent('Time up');
    });
});
