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
                    'Image component for transforming and displaying responsive images from Cloudinary.',
            },
        },
    },
    argTypes: {
        _key: {
            // Only included to prevent typescipt type overlay error
            // Not needed for storybook
            table: {
                disable: true,
            },
        },
        _type: {
            // Only included to prevent typescipt type overlay error
            // Not needed for storybook
            table: {
                disable: true,
            },
        },
        alt: {
            description: 'Sets the alternative text',
        },
        artDirectedImages: {
            description:
                'An array of image objects to generate the `<picture>` version of the image.',
        },
        className: {
            description: 'Custom class',
        },
        height: {
            description:
                'Sets the height attribute. Important for hinting the aspect ratio to the browser therefore reducing/preventing CLS',
        },
        loading: {
            description: 'Sets the native loading attribute',
        },
        responsiveWidths: {
            description: 'Generates the different image sizes within the srcset attribute',
        },
        sizes: {
            description: 'Sets the sizes attribute on the image',
        },
        src: {
            description: 'Sets the image url, this must be a cloudinary image url',
        },
        width: {
            description:
                'Sets the width attribute. Important for hinting the aspect ratio to the browser therefore reducing/preventing CLS',
        },
        isGrayScale: {
            description: 'Toggles the grayscale effect on the image',
        },
        overlayColor: {
            description: 'Sets a colour to overlay the image',
            options: [
                'primary',
                'secondary',
                'tertiary',
                'quaternary',
                'quinary',
                'senary',
                'septenary',
                'octonary',
                'nonary',
                'denary',
                'duodenary',
                'gradient-primary',
                'gradient-secondary',
                'gradient-tertiary',
                'gradient-quaternary',
                'gradient-quinary',
                'gradient-senary',
                'gradient-septenary',
                'gradient-octonary',
                'gradient-nonary',
            ],
            control: {
                type: 'select',
            },
        },
        hasTransparency: {
            description: 'Toggles a transparency effect on the image',
        },
    },
} as Meta;

const Template: Story<Props<HTMLImageElement>> = (args) => <Image {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    alt: imageData.alt,
    src: imageData.src,
    height: imageData.height,
    width: imageData.width,
};

export const HasArtDirectedImages = Template.bind({});
HasArtDirectedImages.args = {
    ...Primary.args,
    artDirectedImages: imageData.responsiveImages,
};
HasArtDirectedImages.parameters = {
    docs: {
        description: {
            story: 'Resize the browser to see the different images.',
        },
    },
};

export const HasNoTransformations = Template.bind({});
HasNoTransformations.args = {
    altText: imageDataNoTransforms.alt,
    src: imageDataNoTransforms.src,
    height: imageDataNoTransforms.height,
    width: imageDataNoTransforms.width,
};
HasNoTransformations.parameters = {
    docs: {
        description: {
            story: 'If no image transformations have been made, then resized images and srcset will still be applied',
        },
    },
};

export const CSSTransformations = Template.bind({});
CSSTransformations.args = {
    ...Primary.args,
    src: 'https://res.cloudinary.com/de2iu8gkv/image/upload/q_20/v1680684786/Shopify_website_image_-_primary_hero_2_loa7mu.png',
    alt: '',
    width: 1137,
    height: 1000,
    isGrayScale: true,
    overlayColor: 'gradient-quaternary',
    hasTransparency: true,
};
CSSTransformations.parameters = {
    docs: {
        description: {
            story: 'Apply CSS transformations to the image by using the `isGrayscale`, `hasTransparency` and/or the `overlayColor` props.',
        },
    },
};
