import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Footer';
import { Footer } from './Footer';

export default {
    title: 'osc-ui/Footer',
    component: Footer
} as Meta;

const Template: Story<Props> = (args) => <Footer {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
