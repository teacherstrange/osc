import './countdownClock.scss';

import React, { Fragment } from 'react';

export interface Props {
    icon: any;
    name?: string;
    onComplete: string | React.ReactNode;
    status: string;
    timer: any;
}

const DAYS: string = 'd';
const HOURS: string = 'h';
const MINUTES: string = 'm';
const SECONDS: string = 's';

export const CountdownClockInner = ({ onComplete, icon, name, status, timer }: Props) => {
    const days =
        // If there are no days then return null
        timer.days !== '00' ? (
            <div className="c-countdown-clock__section">
                <span className="c-countdown-clock__digits">{timer.days}</span>
                <span>{DAYS}</span>
            </div>
        ) : null;
    const hours =
        // If there are no hours then return null
        timer.hours !== '00' ? (
            <div className="c-countdown-clock__section">
                <span className="c-countdown-clock__digits">{timer.hours}</span>
                <span>{HOURS}</span>
            </div>
        ) : null;
    const minutes = (
        <div className="c-countdown-clock__section">
            <span className="c-countdown-clock__digits">{timer.minutes}</span>
            <span>{MINUTES}</span>
        </div>
    );
    const seconds = (
        <div className="c-countdown-clock__section">
            <span className="c-countdown-clock__digits">{timer.seconds}</span>
            <span>{SECONDS}</span>
        </div>
    );
    const countdownIcon = icon ? <div className="c-countdown-clock__icon">{icon}</div> : null;

    return (
        <Fragment>
            {timer ? (
                <div role="timer" className="c-countdown-clock__container">
                    {name ? <div className="c-countdown-clock__title">{name}</div> : null}
                    <div className="c-countdown-clock__timer">
                        {countdownIcon}
                        {status === 'active' ? (
                            <div className="c-countdown-clock__timer--inner">
                                {days}
                                {hours}
                                {minutes}
                                {seconds}
                            </div>
                        ) : (
                            <div>{onComplete}</div>
                        )}
                    </div>
                </div>
            ) : null}
        </Fragment>
    );
};
