import type { Meta, Story } from '@storybook/react';
import React from 'react';
import mq from '../../../../../tokens/media-queries';
import { rem } from '../../utils/rem';
import { Image } from '../Image/Image';
import type { Props } from './Carousel';
import { Carousel } from './Carousel';

export default {
    title: 'osc-ui/Carousel',
    component: Carousel,
    parameters: {
        docs: {
            description: {
                component: 'Carousel component for displaying various content types.',
            },
        },
    },
    argTypes: {
        autoplay: {
            control: {
                type: 'select',
            },
        },
        carouselName: {
            table: {
                defaultValue: {
                    summary: '',
                },
            },
        },
        justifyDotNav: {
            control: {
                type: 'select',
            },
        },
        slideOrigin: {
            table: {
                defaultValue: {
                    summary: '"auto"',
                },
            },
            control: {
                type: 'select',
            },
        },
    },
} as Meta;

const Template: Story<Props> = (args) => (
    <Carousel {...args}>
        <div className="" style={{ backgroundColor: 'lightgreen', height: '100px' }}>
            1
        </div>
        <div className="" style={{ backgroundColor: 'lightgreen', height: '100px' }}>
            2
        </div>
        <div className="" style={{ backgroundColor: 'lightgreen', height: '100px' }}>
            3
        </div>
        <div className="" style={{ backgroundColor: 'lightgreen', height: '100px' }}>
            4
        </div>
        <div className="" style={{ backgroundColor: 'lightgreen', height: '100px' }}>
            5
        </div>
    </Carousel>
);

const AdaptiveHeightTemplate: Story<Props> = (args) => (
    <Carousel {...args}>
        <div className="" style={{ backgroundColor: 'lightgreen', height: 200 }}>
            200px
        </div>
        <div className="" style={{ backgroundColor: 'lightgreen', height: 100 }}>
            100px
        </div>
        <div className="" style={{ backgroundColor: 'lightgreen', height: 75 }}>
            75px
        </div>
        <div className="" style={{ backgroundColor: 'lightgreen', height: 100 }}>
            100px
        </div>
        <div className="" style={{ backgroundColor: 'lightgreen', height: 150 }}>
            150px
        </div>
    </Carousel>
);

const ImagesTemplate: Story<Props> = (args) => (
    <Carousel {...args}>
        <Image
            src="https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1331,f_auto,q_auto/v1665669942/cld-sample-5.jpg"
            width={1870}
            height={1250}
            alt="A cartoony shoe"
        />
        <Image
            src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1665669940/cld-sample.jpg"
            width={1870}
            height={1250}
            alt="A woman and a dog"
        />

        <Image
            src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1665669942/cld-sample-4.jpg"
            width={1870}
            height={1250}
            alt="Some food"
        />

        <Image
            src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1665669941/cld-sample-2.jpg"
            width={1870}
            height={1250}
            alt="A mountain"
        />

        <Image
            src="https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1331,f_auto,q_auto/v1665669942/cld-sample-5.jpg"
            width={1870}
            height={1250}
            alt="A cartoony shoe"
        />
    </Carousel>
);

export const Primary = Template.bind({});
Primary.args = {
    carouselName: 'Primary',
};

export const AutoplaySmooth = Template.bind({});
AutoplaySmooth.args = {
    ...Primary.args,
    carouselName: 'AutoPlay Smooth',
    dotNav: false,
    autoplay: 'smooth',
    loop: true,
};
AutoplaySmooth.parameters = {
    docs: {
        description: {
            story: 'Plays the carousel automatically, with a smooth transition between slides',
        },
    },
};

export const AutoplaySwitch = Template.bind({});
AutoplaySwitch.args = {
    ...Primary.args,
    carouselName: 'AutoPlay Switch',
    autoplay: 'switch',
    autoPlaySpeed: 2_000,
    loop: true,
};
AutoplaySwitch.parameters = {
    docs: {
        description: {
            story: 'Plays the carousel automatically, stepping through each slide.',
        },
    },
};

export const AdaptiveHeight = AdaptiveHeightTemplate.bind({});
AdaptiveHeight.args = {
    ...Primary.args,
    carouselName: 'Adaptive Height',
    adaptiveHeight: true,
};
AdaptiveHeight.parameters = {
    docs: {
        description: {
            story: 'Changes the height of the carousel to fit the height of the largest slide in view.',
        },
    },
};

export const Images = ImagesTemplate.bind({});
Images.args = {
    ...Primary.args,
    carouselName: 'Images',
};
Images.parameters = {
    docs: {
        description: {
            story: 'Carousel through images, which are lazy loaded with the native loading attribute.',
        },
    },
};

export const SlidesPerView = Template.bind({});
SlidesPerView.args = {
    ...Primary.args,
    carouselName: 'Slides Per View',
    slidesPerView: 3,
};
SlidesPerView.parameters = {
    docs: {
        description: {
            story: 'Change the number of slides visible per page.',
        },
    },
};

export const Breakpoints = Template.bind({});
Breakpoints.args = {
    ...Primary.args,
    carouselName: 'Breakpoints',
    slidesPerView: 2,
    breakpoints: {
        [`(min-width: ${rem(mq['tab'])}rem)`]: {
            slides: {
                origin: 'auto',
                perView: 3,
                spacing: 16,
            },
        },
        [`(min-width: ${rem(mq['desk-lrg'])}rem)`]: {
            slides: {
                origin: 'auto',
                perView: 4,
                spacing: 16,
            },
        },
    },
};
Breakpoints.parameters = {
    docs: {
        description: {
            story: 'Can change the settings of the slide based on a custom breakpoint.',
        },
    },
};

export const CenterOrigin = Template.bind({});
CenterOrigin.args = {
    ...Primary.args,
    slideOrigin: 'center',
    loop: false,
};
CenterOrigin.parameters = {
    docs: {
        description: {
            story: 'Starts carousel with the initial slide in the center.',
        },
    },
};
