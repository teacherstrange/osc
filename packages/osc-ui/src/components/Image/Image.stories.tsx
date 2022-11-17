import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Image';
import { Image } from './Image';
import { imageData, imageDataNoTransforms } from './imageData';

export default {
    title: 'osc-ui/Image',
    component: Image,
    parameters: {
        docs: {
            description: {
                component:
                    'Image component for transforming and displaying responsive images from Cloudinary.'
            }
        }
    },
    argTypes: {
        _key: {
            // Only included to prevent typescipt type overlay error
            // Not needed for storybook
            table: {
                disable: true
            }
        },
        _type: {
            // Only included to prevent typescipt type overlay error
            // Not needed for storybook
            table: {
                disable: true
            }
        },
        alt: {
            description: 'Sets the alternative text'
        },
        artDirectedImages: {
            description:
                'An array of image objects to generate the `<picture>` version of the image.'
        },
        className: {
            description: 'Custom class'
        },
        height: {
            description:
                'Sets the height attribute. Important for hinting the aspect ratio to the browser therefore reducing/preventing CLS'
        },
        loading: {
            description: 'Sets the native loading attribute'
        },
        responsiveWidths: {
            description: 'Generates the different image sizes within the srcset attribute'
        },
        sizes: {
            description: 'Sets the sizes attribute on the image'
        },
        src: {
            description: 'Sets the image url, this must be a cloudinary image url'
        },
        width: {
            description:
                'Sets the width attribute. Important for hinting the aspect ratio to the browser therefore reducing/preventing CLS'
        }
    }
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
HasArtDirectedImages.parameters = {
    docs: {
        description: {
            story: 'Resize the browser to see the different images.'
        }
    }
};

export const HasNoTransformations = Template.bind({});
HasNoTransformations.args = {
    altText: imageDataNoTransforms.alt,
    src: imageDataNoTransforms.src,
    height: imageDataNoTransforms.height,
    width: imageDataNoTransforms.width
};
HasNoTransformations.parameters = {
    docs: {
        description: {
            story: 'If no image transformations have been made, then resized images and srcset will still be applied'
        }
    }
};
