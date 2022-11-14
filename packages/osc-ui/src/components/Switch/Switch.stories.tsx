import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Switch';
import { Switch } from './Switch';

export default {
    title: 'osc-ui/Switch',
    component: Switch
} as Meta;

const Template: Story<Props> = (args) => <Switch {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
