import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../Button/Button';
import { Image } from '../Image/Image';
import type { CalloutBannerProps } from './CalloutBanner';
import {
    CalloutBanner,
    CalloutBannerTitle,
    CalloutButtonGroup,
    CalloutContentGroup,
    CalloutFooter,
} from './CalloutBanner';

export default {
    title: 'osc-ui/Callout Banner',
    component: CalloutBanner,
    subcomponents: { CalloutBannerTitle, CalloutContentGroup, CalloutButtonGroup, CalloutFooter },
    parameters: {
        docs: {
            description: {
                component: 'A callout banner to highlight some content or an offer on the page.',
            },
        },
    },
} as Meta;

const Template: Story<CalloutBannerProps> = ({ ...args }) => (
    <div className="o-container">
        <CalloutBanner {...args}>
            <CalloutBannerTitle className="u-color-gradient-quaternary-90">
                OSC STUDENT DISCOUNT
            </CalloutBannerTitle>
            <CalloutContentGroup asChild>
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--left">
                        <p>
                            We're offering a special price of £29.99 for OSC learners. To purchase
                            the Career Kickstarter package at the discounted price please contact
                            our learner services team via studentsupport@openstudycollege.com
                        </p>
                    </div>
                </div>
            </CalloutContentGroup>
        </CalloutBanner>
    </div>
);

const HasImageTemplate: Story<CalloutBannerProps> = ({ ...args }) => (
    <div className="o-container">
        <CalloutBanner {...args}>
            <Image
                src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1677081736/3fa07f2f2545b5f9918b2522e9b3eee4_snzqcg.png"
                width={330}
                height={74}
                alt="Black Friday"
            />
            <CalloutContentGroup>
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--left">
                        <p className="u-color-tertiary u-text-bold t-font-m">
                            Black Friday has arrived early!
                        </p>
                        <p className="u-color-tertiary">
                            <span className="u-text-bold">Save £75</span> when you spend over{' '}
                            <span className="u-text-bold">£400</span> on your course with code{' '}
                            <span className="u-text-bold">BF75</span>.
                        </p>
                    </div>
                </div>
                <CalloutFooter asChild>
                    <p className="u-color-tertiary">Offer ends 24.11.22!</p>
                </CalloutFooter>
            </CalloutContentGroup>
        </CalloutBanner>
    </div>
);

const TemplateHasButton: Story<CalloutBannerProps> = ({ ...args }) => (
    <div className="o-container">
        <CalloutBanner {...args}>
            <CalloutBannerTitle className="u-color-gradient-quaternary-90">
                OSC STUDENT DISCOUNT
            </CalloutBannerTitle>
            <CalloutContentGroup asChild>
                <div className="c-content">
                    <div className="c-content__inner c-content__inner--left">
                        <p>
                            We're offering a special price of £29.99 for OSC learners. To purchase
                            the Career Kickstarter package at the discounted price please contact
                            our learner services team via studentsupport@openstudycollege.com
                        </p>
                    </div>
                </div>
            </CalloutContentGroup>
            <CalloutButtonGroup>
                <Button>Buy now</Button>
            </CalloutButtonGroup>
        </CalloutBanner>
    </div>
);

export const Primary = Template.bind({});
Primary.args = {};

export const HasButton = TemplateHasButton.bind({});
HasButton.args = {
    ...Primary.args,
};
HasButton.parameters = {
    docs: {
        description: {
            story: 'Pass a button using the `<CalloutButtonGroup>` subcomponent with a `<Button>` as a child.',
        },
    },
};

export const HasImage = HasImageTemplate.bind({});
HasImage.args = {
    ...Primary.args,
    className: 'u-bg-color-neutral-0',
};
HasImage.parameters = {
    docs: {
        description: {
            story: 'Instead of text, you can pass an image as the first child by omitting the `<CalloutBannerTitle>` and placing an `<Image>` there instead.',
        },
    },
};
