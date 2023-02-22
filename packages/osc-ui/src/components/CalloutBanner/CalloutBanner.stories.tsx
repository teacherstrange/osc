import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../Button/Button';
import type { CalloutBannerProps } from './CalloutBanner';
import {
    CalloutBanner,
    CalloutBannerTitle,
    CalloutButtonGroup,
    CalloutContentGroup,
} from './CalloutBanner';

export default {
    title: 'osc-ui/Callout Banner',
    component: CalloutBanner,
    subcomponents: { CalloutBannerTitle, CalloutContentGroup, CalloutButtonGroup },
    parameters: {
        docs: {
            description: {
                component: '',
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
            <CalloutContentGroup>
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

const TemplateHasButton: Story<CalloutBannerProps> = ({ ...args }) => (
    <div className="o-container">
        <CalloutBanner {...args}>
            <CalloutBannerTitle className="u-color-gradient-quaternary-90">
                OSC STUDENT DISCOUNT
            </CalloutBannerTitle>
            <CalloutContentGroup>
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

export const Secondary = Template.bind({});
Secondary.args = {
    ...Primary.args,
};

export const HasButton = TemplateHasButton.bind({});
HasButton.args = {
    ...Primary.args,
};
