import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './FormToggle';
import { FormToggle } from './FormToggle';

export default {
    title: 'FormToggle',
    component: FormToggle
} as Meta;

const Template: Story<Props> = (args) => <FormToggle {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
