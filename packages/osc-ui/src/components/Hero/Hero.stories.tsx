import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../Button/Button';
import { Carousel } from '../Carousel/Carousel';
import { heroPrimary, heroSecondary } from '../Flourishes/patterns';
import { Image } from '../Image/Image';
import type { HeroProps } from './Hero';
import { Hero, HeroContent, HeroImage, HeroInner, HeroTitle, HeroTitleGroup } from './Hero';

export default {
    title: 'osc-ui/Hero',
    component: Hero,
    subcomponents: {
        HeroContent,
        HeroImage,
        HeroInner,
        HeroTitle,
        HeroTitleGroup,
    },
    parameters: {
        docs: {
            description: {
                component:
                    'A large banner, usually appearing as one of the first items on a page; it often contains large text and / or an image.',
            },
        },
    },
    argTypes: {
        variant: {
            control: false,
        },
    },
} as Meta;

const Template: Story<HeroProps> = ({ ...args }) => (
    <Hero {...args}>
        <HeroInner
            flourishColor="tertiary"
            flourishPattern={heroPrimary}
            flourishVariant="hero-primary"
        >
            <HeroTitle>Save on your study</HeroTitle>
            <HeroContent>
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--left">
                        <p className="t-font-l">
                            With flexible payment plans and a range of special offers it's never
                            been simpler to study.
                        </p>

                        <div className="c-btn-group">
                            <Button>Special Offers</Button>
                        </div>
                    </div>
                </div>
            </HeroContent>

            <HeroImage>
                <Image
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1675932183/c029363030ddd0a2ec5cb7d0541f4bba_yhznnx_p6av0z.png"
                    width={444}
                    height={480}
                    alt="A smiling man, dancing with his left hand raised in the air"
                />
            </HeroImage>
        </HeroInner>
    </Hero>
);

const SecondaryTemplate: Story<HeroProps> = ({ ...args }) => (
    <Hero {...args}>
        <HeroInner>
            <HeroTitle className="u-color-tertiary">Black Friday</HeroTitle>

            <HeroContent>
                <div className="c-content">
                    <div className="c-content__inner">
                        <p className="t-font-l u-color-tertiary">
                            Get £75 off when you spend over £400 on your enrolment
                        </p>

                        <div className="c-btn-group">
                            <Button isInversed>Special Offers</Button>
                        </div>
                    </div>
                </div>
            </HeroContent>
        </HeroInner>
    </Hero>
);

const TertiaryTemplate: Story<HeroProps> = ({ ...args }) => (
    <Hero {...args}>
        <HeroInner>
            <HeroTitleGroup>
                <HeroTitle className="u-color-septenary">
                    Turning your passion into a career
                </HeroTitle>
                <HeroTitle className="u-color-septenary" as="h3" subtitle>
                    Study tips
                </HeroTitle>
            </HeroTitleGroup>

            <HeroContent>
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--left">
                        <p className="u-color-septenary">December 29th, 2021</p>
                    </div>
                </div>
            </HeroContent>

            <HeroImage>
                <Image
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1675940147/dog1_thmujg.png"
                    width={573}
                    height={435}
                    alt="A smiling man, dancing with his left hand raised in the air"
                />
            </HeroImage>
        </HeroInner>
    </Hero>
);

const CarouselTemplate: Story<HeroProps> = () => (
    <Carousel
        carouselName="Hero banner"
        slidesPerView={1}
        loop={true}
        autoplay="switch"
        autoPlaySpeed={3000}
    >
        <Hero backgroundColor="gradient-nonary-270" variant="primary">
            <HeroInner
                flourishColor="tertiary"
                flourishPattern={heroPrimary}
                flourishVariant="hero-primary"
            >
                <HeroTitle>Save on your study</HeroTitle>
                <HeroContent>
                    <div className="c-content">
                        <div className="c-content__inner c-content__inner--left">
                            <p className="t-font-l">
                                With flexible payment plans and a range of special offers it's never
                                been simpler to study.
                            </p>

                            <div className="c-btn-group">
                                <Button>Special Offers</Button>
                            </div>
                        </div>
                    </div>
                </HeroContent>

                <HeroImage>
                    <Image
                        src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1675932183/c029363030ddd0a2ec5cb7d0541f4bba_yhznnx_p6av0z.png"
                        width={444}
                        height={480}
                        alt="A smiling man, dancing with his left hand raised in the air"
                    />
                </HeroImage>
            </HeroInner>
        </Hero>

        <Hero backgroundColor="tertiary" variant="secondary" flourishColor="gradient-quaternary-90">
            <HeroInner
                flourishColor="multicolor"
                flourishPattern={heroSecondary}
                flourishVariant="hero-secondary"
            >
                <HeroTitle>Prospectus</HeroTitle>

                <HeroContent>
                    <div className="c-content">
                        <div className="c-content__inner">
                            <p className="t-font-l">
                                Download our <strong>new 2023 prospectus</strong> today
                            </p>

                            <div className="c-btn-group">
                                <Button>Download</Button>
                            </div>
                        </div>
                    </div>
                </HeroContent>
            </HeroInner>
        </Hero>

        <Hero backgroundColor="neutral-0" variant="secondary">
            <HeroInner>
                <HeroTitle className="u-color-tertiary">Black Friday</HeroTitle>

                <HeroContent>
                    <div className="c-content">
                        <div className="c-content__inner">
                            <p className="t-font-l u-color-tertiary">
                                Get £75 off when you spend over £400 on your enrolment
                            </p>

                            <div className="c-btn-group">
                                <Button isInversed>Special Offers</Button>
                            </div>
                        </div>
                    </div>
                </HeroContent>
            </HeroInner>
        </Hero>
    </Carousel>
);

const FlushImgTemplate: Story<HeroProps> = ({ ...args }) => (
    <Hero {...args}>
        <HeroInner pullRight>
            <HeroTitle>Property & Home</HeroTitle>
            <HeroContent>
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--left">
                        <p className="t-font-l">35 Courses Available</p>
                    </div>
                </div>
            </HeroContent>

            <HeroImage>
                <Image
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1674577946/cat-img_rwumo5.png"
                    width={610}
                    height={557}
                    alt=""
                />
            </HeroImage>
        </HeroInner>
    </Hero>
);

export const Primary = Template.bind({});
Primary.args = {
    backgroundColor: 'gradient-nonary-270',
    variant: 'primary',
};

export const Secondary = SecondaryTemplate.bind({});
Secondary.args = {
    ...Primary.args,
    backgroundColor: 'neutral-0',
    variant: 'secondary',
};

export const Tertiary = TertiaryTemplate.bind({});
Tertiary.args = {
    ...Primary.args,
    backgroundColor: 'primary',
    variant: 'tertiary',
};

export const IsCarousel = CarouselTemplate.bind({});
IsCarousel.args = {};
IsCarousel.parameters = {
    docs: {
        description: {
            story: "Make the hero a carousel by wrapping each `<Hero>` component inside the carousel. You'll then be able to set the carousel settings through the `<carousel>` props.",
        },
    },
};

export const ImageIsFlush = FlushImgTemplate.bind({});
ImageIsFlush.args = {
    ...Primary.args,
    backgroundColor: 'neutral-300',
};
ImageIsFlush.parameters = {
    docs: {
        description: {
            story: 'Push the image up to the right hand side of the screen by passing the `pullRight` prop to the `<HeroInner>`.',
        },
    },
};
