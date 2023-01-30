import React, { useEffect, useState } from 'react';
import { CountdownClockInner } from './CountdownClockInner';

const DAY = 24 * 60 * 60 * 1000;
const HOUR = 1000 * 60 * 60;
const MINUTE = 60 * 1000;
const SECOND = 1000;

export interface Props {
    endDate: number;
    icon?: any;
    onComplete: string | React.ReactNode;
    name?: string;
}

interface Timer {
    status: 'inactive' | 'active' | 'complete';
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

export const CountdownClock = ({ endDate, icon, name, onComplete }: Props) => {
    const [timer, setTimer] = useState<Timer>({
        status: 'inactive',
        days: '0',
        hours: '0',
        minutes: '0',
        seconds: '0',
    });

    const now = () => new Date().getTime();
    const remainingDuration = () => endDate - now();

    const days = () => Math.floor(remainingDuration() / DAY);
    const hours = () => Math.floor((remainingDuration() % DAY) / HOUR);
    const minutes = () => Math.floor((remainingDuration() % HOUR) / MINUTE);
    const seconds = () => Math.floor((remainingDuration() % MINUTE) / SECOND);

    const runTimer = () => {
        setTimer((prevState) => ({
            ...prevState,
            status: 'active',
            days: days() < 10 ? `0${days()}` : `${days()}`,
            hours: hours() < 10 ? `0${hours()}` : `${hours()}`,
            minutes: minutes() < 10 ? `0${minutes()}` : `${minutes()}`,
            seconds: seconds() < 10 ? `0${seconds()}` : `${seconds()}`,
        }));
    };

    const endTimer = () => {
        setTimer((prevState) => ({
            ...prevState,
            status: 'complete',
            days: '0',
            hours: '0',
            minutes: '0',
            seconds: '0',
        }));
    };

    useEffect(() => {
        // Start straight away (ie before first second elapses in setInterval)
        if (remainingDuration() > 0) {
            runTimer();
        }

        const interval = setInterval(() => {
            if (remainingDuration() < 0) {
                // Stop Timer
                endTimer();
                clearInterval(interval);
            } else {
                runTimer();
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Only return timer once values have been set
    if (timer.status === 'inactive') return null;

    return (
        <CountdownClockInner
            icon={icon}
            onComplete={onComplete}
            name={name}
            status={timer.status}
            timer={timer}
        />
    );
};
