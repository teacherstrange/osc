import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Content } from './Content';
import { textContent } from './textContent';
import type { Props as ContentProps } from './Content';

export default {
    title: 'Content',
    component: Content
} as Meta;

const Template: Story<ContentProps> = (args) => <Content {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    value: textContent
};
