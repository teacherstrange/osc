import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { CountdownClock } from './CountdownClock';
import type { Props } from './CountdownClock';
import { ClockIcon } from '@radix-ui/react-icons';

export default {
    title: 'osc-ui/Countdown Clock',
    component: CountdownClock,
    parameters: {
        docs: {
            description: {
                component: 'Countdown Clock component displays a timer based on a future date'
            }
        }
    },
    argTypes: {
        endDate: {
            description: 'The date when the timer should end'
        },
        onComplete: {
            description: 'Display onComplete message or link'
        },
        icon: {
            description: 'Optional icon that can be rendered alongside the timer'
        },
        name: {
            description: 'Optional title that can be given to the timer'
        }
    }
} as Meta;

const template: Story<Props> = (args) => <CountdownClock {...args} />;

export const Primary = template.bind({});
export const WithIcon = template.bind({});
export const WithTitle = template.bind({});
export const WithMultipleTimers = template.bind({});
export const FinishedTimer = template.bind({});

const date = new Date();

const TWO_DAYS = new Date(date.getTime() + 24 * 60 * 60 * 1000 * 2);
const DAY = new Date(date.getTime() + 24 * 60 * 60 * 1000);
const HOUR = new Date(date.getTime() + 1000 * 60 * 60);
const MINUTE = new Date(date.getTime() + 60 * 1000);
const THREE_SECONDS = new Date(date.getTime() + 1000 * 3);

Primary.args = {
    endDate: TWO_DAYS
};
WithIcon.args = {
    endDate: HOUR,
    icon: <ClockIcon />
};
WithTitle.args = {
    endDate: MINUTE,
    name: "Don't miss out!"
};
WithMultipleTimers.args = [
    {
        endDate: DAY,
        name: 'Timer 1'
    },
    {
        endDate: THREE_SECONDS,
        name: 'Timer 2'
    }
];

WithMultipleTimers.decorators = [
    () => {
        return (
            <>
                <div style={{ margin: '1em 0' }}>
                    <CountdownClock {...WithMultipleTimers.args[0]} />
                </div>
                <div style={{ margin: '1em 0' }}>
                    <CountdownClock {...WithMultipleTimers.args[1]} />
                </div>
            </>
        );
    }
];

FinishedTimer.args = [
    {
        endDate: THREE_SECONDS,
        onComplete: 'Sale is over!'
    },
    {
        endDate: THREE_SECONDS,
        onComplete: (
            <div>
                <a href="/">Sale Finished! See other offers</a>
            </div>
        )
    }
];

FinishedTimer.decorators = [
    () => {
        return (
            <>
                <div style={{ margin: '1em 0' }}>
                    <CountdownClock {...FinishedTimer.args[0]} />
                </div>
                <div style={{ margin: '1em 0' }}>
                    <CountdownClock {...FinishedTimer.args[1]} />
                </div>
            </>
        );
    }
];
