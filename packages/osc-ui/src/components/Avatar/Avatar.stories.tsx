import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { AvatarProps } from './Avatar';
import { Avatar } from './Avatar';

export default {
    title: 'osc-ui/Avatar',
    component: Avatar
} as Meta;

const Template: Story<AvatarProps> = ({ ...args }) => <Avatar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    src: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
    name: 'Colm Tuite'
};

export const Fallback = Template.bind({});
Fallback.args = {
    ...Primary.args,
    src: ''
};
