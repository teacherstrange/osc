import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Image } from './Image';
import type { Props } from './Image';
import { imageData, imageDataNoTransforms } from './imageData';

export default {
    title: 'Image',
    component: Image
} as Meta;

const Template: Story<Props<HTMLImageElement>> = (args) => <Image {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    alt: imageData.alt,
    src: imageData.src,
    height: imageData.height,
    width: imageData.width
};

export const HasArtDirectedImages = Template.bind({});
HasArtDirectedImages.args = {
    ...Primary.args,
    artDirectedImages: imageData.responsiveImages
};

export const HasNoTransformations = Template.bind({});
HasNoTransformations.args = {
    altText: imageDataNoTransforms.alt,
    src: imageDataNoTransforms.src,
    height: imageDataNoTransforms.height,
    width: imageDataNoTransforms.width
};
