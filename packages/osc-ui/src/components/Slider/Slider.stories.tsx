import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { SliderProps } from './Slider';
import { Slider } from './Slider';

export default {
    title: 'osc-ui/Slider',
    component: Slider,
    parameters: {
        docs: {
            description: {
                component:
                    'A control that allows the user to toggle between checked and not checked.',
            },
        },
    },
    argTypes: {
        defaultValue: {
            description:
                'The value of the slider when initially rendered. Use when you do not need to control the state of the slider.',
        },
        max: {
            description: 'The maximum value for the range.',
        },
        min: {
            description: 'The minimum value for the range.',
        },
        minStepsBetweenThumbs: {
            description: 'The minimum permitted steps between multiple thumbs.',
        },
        orientation: {
            description: 'The orientation of the slider.',
        },
        step: {
            description: 'The stepping interval.',
        },
    },
} as Meta;

const Template: Story<SliderProps> = ({ ...args }) => (
    <div style={{ margin: '1.5em 1em', width: '300px' }}>
        <Slider {...args} />
    </div>
);

export const Primary = Template.bind({});
export const isDisabled = Template.bind({});

Primary.args = {
    defaultValue: [200, 1200],
    minStepsBetweenThumbs: 30,
    min: 0,
    max: 2000,
    name: 'Price',
    prefix: '£',
    state: 'Default',
    step: 10,
};

isDisabled.args = {
    defaultValue: [150, 500],
    disabled: true,
    minStepsBetweenThumbs: 10,
    min: 0,
    max: 1000,
    name: 'Price',
    prefix: '£',
    state: 'isDisabled',
    step: 10,
};
