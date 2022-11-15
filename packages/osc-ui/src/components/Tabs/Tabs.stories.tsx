import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Tabs';
import { Tabs } from './Tabs';

export default {
    title: 'osc-ui/Tabs',
    component: Tabs,
    parameters: {
        docs: {
            description: {
                component:
                    'A set of layered sections of content—known as tab panels—that are displayed one at a time.'
            }
        }
    }
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
