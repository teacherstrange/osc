import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../Button/Button';
import { Image } from '../Image/Image';
import type { HeroProps } from './Hero';
import { Hero, HeroContent, HeroImage, HeroInner, HeroTitle } from './Hero';

export default {
    title: 'osc-ui/Hero',
    component: Hero,
    parameters: {
        docs: {
            description: {
                component: '',
            },
        },
    },
} as Meta;

const Template: Story<HeroProps> = ({ ...args }) => (
    <Hero {...args}>
        <HeroInner>
            <HeroTitle>Save on your study</HeroTitle>
            <HeroContent>
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--left">
                        <p className="t-font-epsilon">
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
            <HeroTitle>Prospectus</HeroTitle>

            {/* <HeroImage>
                <Image
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1675932183/c029363030ddd0a2ec5cb7d0541f4bba_yhznnx_p6av0z.png"
                    width={444}
                    height={480}
                    alt="A smiling man, dancing with his left hand raised in the air"
                />
            </HeroImage> */}

            <HeroContent>
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--centre">
                        <p>Download our new 2023 prospectus today</p>

                        <div className="c-btn-group">
                            <Button>Download</Button>
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
            <div className="c-hero-ttl__group">
                <HeroTitle className="u-color-septenary">
                    Turning your passion into a career
                </HeroTitle>
                <HeroTitle className="u-color-septenary" as="h3" subtitle>
                    Study tips
                </HeroTitle>
            </div>

            <HeroContent>
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--left">
                        <p className="u-color-septenary">December 29th, 2021</p>
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

export const Primary = Template.bind({});
Primary.args = {
    backgroundColor: 'gradient-nonary-270',
    variant: 'primary',
};

export const Secondary = SecondaryTemplate.bind({});
Secondary.args = {
    ...Primary.args,
    backgroundColor: 'tertiary',
    variant: 'secondary',
};

export const Tertiary = TertiaryTemplate.bind({});
Tertiary.args = {
    ...Primary.args,
    backgroundColor: 'primary',
    variant: 'tertiary',
};
