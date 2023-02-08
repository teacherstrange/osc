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
                        <p>
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
                    src="https://res.cloudinary.com/de2iu8gkv/image/upload/e_background_removal/v1675856605/c029363030ddd0a2ec5cb7d0541f4bba_yhznnx.png"
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

export const Secondary = Template.bind({});
Secondary.args = {
    ...Primary.args,
    variant: 'secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
    ...Primary.args,
    variant: 'tertiary',
};
