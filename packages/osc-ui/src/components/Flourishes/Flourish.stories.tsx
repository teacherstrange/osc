import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { FlourishProps } from './Flourishes';
import { Flourish } from './Flourishes';

export default {
    title: 'osc-ui/Flourishes/Flourish',
    component: Flourish,
    parameters: {
        docs: {
            description: {
                component:
                    'Graphic elements created from the Open Study College typeface and gradients are ownable textures.',
            },
        },
    },
    argTypes: {
        width: {
            control: {
                type: 'select',
            },
        },
        height: {
            control: 'hidden',
        },
    },
} as Meta;
const Template: Story<FlourishProps> = ({ ...args }) => (
    <div
        style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-end',
        }}
    >
        <Flourish height="8/16" width={args.width} color={args.color} maxHeight={args.maxHeight} />
        <Flourish height="12/16" width={args.width} color={args.color} maxHeight={args.maxHeight} />
        <Flourish height="14/16" width={args.width} color={args.color} maxHeight={args.maxHeight} />
        <Flourish height="16/16" width={args.width} color={args.color} maxHeight={args.maxHeight} />
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    width: '2/16',
    color: 'primary',
};

export const Scaleable = Template.bind({});
Scaleable.args = {
    ...Primary.args,
    maxHeight: 200,
};
Scaleable.parameters = {
    docs: {
        description: {
            story: 'The gradient graphics can be scaled to suit the size and use, but the graphics must be scaled as a set.<br>You can do this by adjusting the `maxHeight` prop.',
        },
    },
};
