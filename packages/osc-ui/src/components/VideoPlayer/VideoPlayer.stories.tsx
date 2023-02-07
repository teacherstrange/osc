import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Image } from '../Image/Image';
import type { VideoPlayerProps } from './VideoPlayer';
import { PlayIcon, VideoPlayer, VideoPlayerContent, VideoPlayerOverlay } from './VideoPlayer';

export default {
    title: 'osc-ui/VideoPlayer',
    component: VideoPlayer,
    subcomponents: { PlayIcon, VideoPlayerContent, VideoPlayerOverlay },
    parameters: {
        docs: {
            description: {
                component:
                    'Video player that can be used to play a video, either from YouTube or Vimeo. <br>The player will pause when scrolled out of view',
            },
        },
    },
    argTypes: {
        url: {
            control: {
                type: 'text',
            },
        },
        variant: {
            control: {
                type: 'select',
            },
        },
    },
} as Meta;

const Template: Story<VideoPlayerProps> = ({ children, ...args }) => {
    return (
        <div style={{ maxWidth: '960px' }}>
            <VideoPlayer {...args}>{children}</VideoPlayer>
        </div>
    );
};

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
            story: 'The video player will automatically generate a preview image, which is the default video thumbnail. <br>Add a custom image to add a higher quality or more appropriate image.',
        },
    },
};

export const Autoplay = Template.bind({});
Autoplay.args = {
    ...Primary.args,
    autoplay: true,
};
Autoplay.parameters = {
    docs: {
        description: {
            story: 'The video player will automatically start playing when scrolled into view, it will be muted by default.',
        },
    },
};

export const HasOverlayedContent = Template.bind({});
HasOverlayedContent.args = {
    ...Primary.args,
    children: (
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus numquam officia sequi ab
            reprehenderit nulla distinctio assumenda sit. Voluptates nisi explicabo non esse
            distinctio cumque minima provident minus odit officiis!
        </p>
    ),
};
HasOverlayedContent.parameters = {
    docs: {
        description: {
            story: '',
        },
    },
};

export const PreservesContent = Template.bind({});
PreservesContent.args = {
    ...Primary.args,
    preserveContent: true,
    children: (
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus numquam officia sequi ab
            reprehenderit nulla distinctio assumenda sit. Voluptates nisi explicabo non esse
            distinctio cumque minima provident minus odit officiis!
        </p>
    ),
};
PreservesContent.parameters = {
    docs: {
        description: {
            story: 'You can prevent the content and overlay from disappearing when the video is playing by setting `preserveContent` to `true`.',
        },
    },
};
