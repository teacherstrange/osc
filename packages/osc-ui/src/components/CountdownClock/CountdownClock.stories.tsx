import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { CountdownClock } from './CountdownClock';
import type { Props } from './CountdownClock';
import { ClockIcon } from '@radix-ui/react-icons';

export default {
    title: 'osc-ui/Countdown Clock',
    component: CountdownClock
} as Meta;

const template: Story<Props> = (args) => <CountdownClock {...args} />;

export const Primary = template.bind({});
export const WithIcon = template.bind({});
export const WithTitle = template.bind({});
export const WithMultipleTimers = template.bind({});

Primary.args = {
    endDate: new Date('Jan 21,2023, 19:20:00')
};
WithIcon.args = {
    endDate: new Date('March 11,2023, 19:20:00'),
    icon: <ClockIcon />
};
WithTitle.args = {
    endDate: new Date('Nov 11,2023, 19:20:00'),
    name: "Don't miss out!"
};
WithMultipleTimers.args = [
    {
        endDate: new Date('May 11,2023, 19:20:00'),
        name: 'Timer 1'
    },
    {
        endDate: new Date('December 25,2022, 19:20:00'),
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
