import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { CalloutBannerProps } from './CalloutBanner';
import { CalloutBanner } from './CalloutBanner';

export default {
    title: 'osc-ui/Callout Banner',
    component: CalloutBanner,
    parameters: {
        docs: {
            description: {
                component: '',
            },
        },
    },
} as Meta;

const Template: Story<CalloutBannerProps> = ({ ...args }) => <CalloutBanner {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'hello world',
};
