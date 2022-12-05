import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './ImageGallery';
import { ImageGallery } from './ImageGallery';
import { imageGrid2x2, imageGrid3x3, singleImageData } from './imageGalleryData';

export default {
    title: 'osc-ui/ImageGallery',
    component: ImageGallery,
    // TODO
    // Add parameters
    // Add description
} as Meta;

const Template: Story<Props> = (args) => <ImageGallery {...args} />;

export const Primary = Template.bind({});
export const TwoXGrid = Template.bind({});
export const ThreeXGrid = Template.bind({});

Primary.args = {
    images: singleImageData,
};

TwoXGrid.args = {
    images: imageGrid2x2.images,
    variant: '2x2-grid',
};
ThreeXGrid.args = {
    images: imageGrid3x3.images,
    variant: '3x3-grid',
};
