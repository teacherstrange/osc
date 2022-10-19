import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { Props } from './Badge';
import { Badge } from './Badge';

export default {
    title: 'Badge',
    component: Badge,
    argTypes: {
        color: {
            options: ['green', 'red', 'blue'],
            control: { type: 'inline-radio' }
        },
        variant: {
            options: ['subtle', 'solid', 'outline'],
            control: { type: 'inline-radio' }
        }
    }
} as Meta;

const Template: Story<Props> = (args) => <Badge {...args} />;

export const Colour = Template.bind({});
export const Variant = Template.bind({});

Colour.args = {
    color: 'blue',
    badgeName: 'default',
    variant: 'subtle'
};

Variant.args = {
    variant: 'subtle',
    badgeName: 'default',
    color: 'blue'
};
