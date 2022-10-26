import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './FormToggle';
import { FormToggle } from './FormToggle';

export default {
    title: 'FormToggle',
    component: FormToggle
} as Meta;

// TODO: ak - sun and moon icons seem to break storybook
const Template: Story<Props> = (args) => <FormToggle {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
