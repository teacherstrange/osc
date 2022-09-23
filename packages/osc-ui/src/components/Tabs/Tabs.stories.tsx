import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Tabs';
import { Tabs } from './Tabs';

export default {
    title: 'Tabs',
    component: Tabs
} as Meta;

const Template: Story<Props> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    tabs: [
        {
            key: '1',
            list: 'One',
            panel: 'one!'
        },
        {
            key: '2',
            list: 'Two',
            panel: 'two!'
        },
        {
            key: '3',
            list: 'Three',
            panel: 'three!'
        }
    ],
    className: ''
};
