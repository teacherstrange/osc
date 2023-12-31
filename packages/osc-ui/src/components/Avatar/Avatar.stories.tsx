import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { AvatarProps } from './Avatar';
import { Avatar } from './Avatar';

export default {
    title: 'osc-ui/Avatar',
    component: Avatar,
    parameters: {
        docs: {
            description: {
                component: "Avatar component for displaying a user's profile picture or initials.",
            },
        },
    },
    argTypes: {
        className: {
            description: 'Custom class',
        },
        name: {
            description: "User's name",
        },
        notification: {
            description: 'Sets a notification dot with an option to show the number',
            control: {
                type: 'object',
            },
        },
        src: {
            description: 'An image url',
        },
    },
} as Meta;

const Template: Story<AvatarProps> = ({ ...args }) => <Avatar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    name: 'Colm Tuite',
    src: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
};

export const Notification = Template.bind({});

Notification.args = {
    name: 'Colm Tuite',
    notification: { show: true },
    src: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
};

export const NotificationWithCount = Template.bind({});

NotificationWithCount.args = {
    name: 'Colm Tuite',
    notification: { show: true, count: '200' },
    src: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
};

export const Fallback = Template.bind({});
Fallback.args = {
    ...Primary.args,
    src: '',
};
Fallback.parameters = {
    docs: {
        description: {
            story: "The user's initial will be displayed if there is no src or the url is invalid.",
        },
    },
};
