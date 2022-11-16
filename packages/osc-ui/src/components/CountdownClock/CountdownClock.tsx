import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { CountdownClockInner } from './CountdownClockInner';

const DAY = 24 * 60 * 60 * 1000;
const HOUR = 1000 * 60 * 60;
const MINUTE = 60 * 1000;
const SECOND = 1000;

export interface Props {
    classNames?: string;
    endDate: number;
    icon?: any;
    name?: string;
}

interface Timer {
    active: boolean;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

export const CountdownClock: FC<Props> = ({ classNames, endDate, icon, name }: Props) => {
    const [timer, setTimer] = useState<Timer>({
        active: false,
        days: '0',
        hours: '0',
        minutes: '0',
        seconds: '0'
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
            active: true,
            days: days() < 10 ? `0${days()}` : `${days()}`,
            hours: hours() < 10 ? `0${hours()}` : `${hours()}`,
            minutes: minutes() < 10 ? `0${minutes()}` : `${minutes()}`,
            seconds: seconds() < 10 ? `0${seconds()}` : `${seconds()}`
        }));
    };

    const endTimer = () => {
        setTimer((prevState) => ({
            ...prevState,
            days: '0',
            hours: '0',
            minutes: '0',
            seconds: '0'
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
    if (!timer.active) return null;

    return <CountdownClockInner classNames={classNames} icon={icon} name={name} timer={timer} />;
};
