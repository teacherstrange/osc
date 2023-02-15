import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { LogoProps } from './Logo';
import { Logo } from './Logo';

export default {
    title: 'osc-ui/Logo',
    component: Logo,
    parameters: {
        docs: {
            description: {
                component: 'OSC logo',
            },
        },
    },
} as Meta;

const Template: Story<LogoProps> = (args) => <Logo {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
