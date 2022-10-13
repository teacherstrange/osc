import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Header';
import { Header } from './Header';

export default {
    title: 'Header',
    component: Header
} as Meta;

const Template: Story<Props> = (args) => <Header {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    tester: 'tester'
};
