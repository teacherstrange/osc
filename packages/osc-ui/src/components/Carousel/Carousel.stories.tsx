import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Carousel';
import { Carousel } from './Carousel';

export default {
    title: 'osc-ui/Carousel',
    component: Carousel
} as Meta;

const Template: Story<Props> = (args) => <Carousel {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    mediaArray: [
        {
            _key: '2abff668951c',
            _type: 'module.images',
            alt: 'A cartoony shoe',
            height: 1250,
            src: 'https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1331,f_auto,q_auto/v1665669942/cld-sample-5.jpg',
            width: 1870
        },
        {
            _key: '2abff668952c',
            _type: 'module.images',
            alt: 'A cartoony shoe',
            height: 1250,
            src: 'https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1331,f_auto,q_auto/v1665669942/cld-sample-5.jpg',
            width: 1870
        },
        {
            _key: '2abff668953c',
            _type: 'module.images',
            alt: 'A cartoony shoe',
            height: 1250,
            src: 'https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1331,f_auto,q_auto/v1665669942/cld-sample-5.jpg',
            width: 1870
        },
        {
            _key: '2abff668954c',
            _type: 'module.images',
            alt: 'A cartoony shoe',
            height: 1250,
            src: 'https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1331,f_auto,q_auto/v1665669942/cld-sample-5.jpg',
            width: 1870
        },
        {
            _key: '2abff668955c',
            _type: 'module.images',
            alt: 'A cartoony shoe',
            height: 1250,
            src: 'https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1331,f_auto,q_auto/v1665669942/cld-sample-5.jpg',
            width: 1870
        },
        {
            _key: '2abff668956c',
            _type: 'module.images',
            alt: 'A cartoony shoe',
            height: 1250,
            src: 'https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1331,f_auto,q_auto/v1665669942/cld-sample-5.jpg',
            width: 1870
        }
    ],
    active: true,
    delay: '3000',
    slidesPerPage: 3, // fine
    slideGap: 10,
    axis: 'x',
    height: 500,
    loop: false, // fine
    startIndex: 1, // fine
    ssr: false
};

export const HorizontalOneSlide = Template.bind({});
HorizontalOneSlide.args = {
    ...Primary.args,
    axis: 'x',
    slidesPerPage: 1
};

export const VerticalTwoSlide = Template.bind({});
VerticalTwoSlide.args = {
    ...Primary.args,
    axis: 'y',
    slidesPerPage: 2
};

export const VerticalMultiSlide = Template.bind({});
VerticalMultiSlide.args = {
    ...Primary.args,
    axis: 'y',
    slidesPerPage: 3
};
