import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Image } from '../Image/Image';
import type { VideoPlayerProps } from './VideoPlayer';
import { PlayIcon, VideoPlayer } from './VideoPlayer';

export default {
    title: 'osc-ui/VideoPlayer',
    component: VideoPlayer,
    subcomponents: { PlayIcon },
    parameters: {
        docs: {
            description: {
                component: '',
            },
        },
    },
} as Meta;

const Template: Story<VideoPlayerProps> = ({ ...args }) => (
    <VideoPlayer playIcon={<PlayIcon />} {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    url: 'https://youtu.be/w36Yhxxuk_c',
};
export const HasCustomPreviewImage = Template.bind({});
HasCustomPreviewImage.args = {
    ...Primary.args,
    previewImage: (
        <Image
            src="https://res.cloudinary.com/de2iu8gkv/image/upload/v1675425684/maxresdefault_si26jj.jpg"
            width={968}
            height={544}
            alt="A cartoon man sitting on an armchair with his laptop on his knees. He's looking at his laptop and there are some shelves and lights in the background."
        />
    ),
};
HasCustomPreviewImage.parameters = {
    docs: {
        description: {
            story: 'The video player will automatically generate a preview image, which is the default video thumbnail. <br>Add a custom image to add a higher quality or more appopriate image.',
        },
    },
};
