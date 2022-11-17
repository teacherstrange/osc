import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props as ContentProps } from './Content';
import { Content } from './Content';
import { textContent } from './textContent';

export default {
    title: 'osc-ui/Content',
    component: Content
} as Meta;

const Template: Story<ContentProps> = (args) => <Content {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    value: textContent
};
