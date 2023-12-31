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
        color: {
            options: [
                'primary',
                'secondary',
                'tertiary',
                'quaternary',
                'quinary',
                'senary',
                'septenary',
                'octonary',
                'nonary',
                'denary',
                'duodenary',
                'gradient-primary',
                'gradient-secondary',
                'gradient-tertiary',
                'gradient-quaternary',
                'gradient-quinary',
                'gradient-senary',
                'gradient-septenary',
                'gradient-octonary',
                'gradient-nonary',
            ],
            control: {
                type: 'select',
            },
        },
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
        <Flourish
            height="4/16"
            width={args.width}
            color={args.color}
            maxHeight={args.maxHeight}
            style={{ position: 'relative' }}
        />
        <Flourish
            height="8/16"
            width={args.width}
            color={args.color}
            maxHeight={args.maxHeight}
            style={{ position: 'relative' }}
        />
        <Flourish
            height="12/16"
            width={args.width}
            color={args.color}
            maxHeight={args.maxHeight}
            style={{ position: 'relative' }}
        />
        <Flourish
            height="16/16"
            width={args.width}
            color={args.color}
            maxHeight={args.maxHeight}
            style={{ position: 'relative' }}
        />
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    width: '2/16',
    color: 'gradient-septenary',
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
