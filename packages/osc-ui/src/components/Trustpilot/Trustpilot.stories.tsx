import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Trustpilot } from './Trustpilot';
import type { Props } from './Trustpilot';

export default {
    title: 'Trustpilot',
    component: Trustpilot
} as Meta;

const Template: Story<Props> = (args) => <Trustpilot {...args} />;

export const Default = Template.bind({});

Default.args = {};

export const Slider = Template.bind({});
Slider.args = {
    ...Default.args,
    template: 'slider',
    height: '240px'
};

export const Grid = Template.bind({});
Grid.args = {
    ...Default.args,
    template: 'grid',
    height: '500px'
};

export const MiniCarousel = Template.bind({});
MiniCarousel.args = {
    ...Default.args,
    template: 'minicarousel',
    height: '350px'
};

export const MicroStar = Template.bind({});
MicroStar.args = {
    ...Default.args,
    template: 'microstar',
    height: '100px'
};
