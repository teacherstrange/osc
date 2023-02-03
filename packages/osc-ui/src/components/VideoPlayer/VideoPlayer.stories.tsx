import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Image } from '../Image/Image';
import type { VideoPlayerProps } from './VideoPlayer';
import { VideoPlayer } from './VideoPlayer';

export default {
    title: 'osc-ui/VideoPlayer',
    component: VideoPlayer,
    parameters: {
        docs: {
            description: {
                component: '',
            },
        },
    },
} as Meta;

const Template: Story<VideoPlayerProps> = ({ ...args }) => <VideoPlayer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
};
export const HasCustomPreviewImage = Template.bind({});
HasCustomPreviewImage.args = {
    ...Primary.args,
    previewImage: (
        <Image
            src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1665669942/cld-sample-5.jpg"
            width={968}
            height={544}
            alt=""
        />
    ),
};
