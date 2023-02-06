import { VideoIcon } from '@radix-ui/react-icons';
import React from 'react';

export default {
    name: 'module.video',
    title: 'Video',
    type: 'object',
    icon: VideoIcon,
    groups: [
        {
            default: true,
            name: 'video',
            title: 'Video',
        },
        {
            name: 'content',
            title: 'Content',
        },
    ],
    fields: [
        {
            name: 'videoType',
            title: 'Video Type',
            type: 'string',
            initialValue: 'youtube',
            options: {
                layout: 'radio',
                direction: 'horizontal',
                list: [
                    { value: 'youtube', title: 'YouTube' },
                    { value: 'vimeo', title: 'Vimeo' },
                ],
            },
            group: 'video',
        },
        {
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
            group: 'video',
        },
        {
            name: 'videoSettings',
            title: 'Settings',
            type: 'object',
            description: 'Settings for the video.',
            fields: [
                {
                    name: 'autoplay',
                    title: 'Autoplay',
                    type: 'boolean',
                    initialValue: false,
                },
                {
                    name: 'loop',
                    title: 'Loop Video',
                    type: 'boolean',
                    initialValue: false,
                },
                {
                    name: 'preserveOverlay',
                    title: 'Preserve Overlay',
                    type: 'boolean',
                    description:
                        'Preserve the overlay when the video is playing to make content more readable.',
                    initialValue: false,
                },
            ],
            options: {
                columns: 2,
                collapsible: true,
                collapsed: false,
            },
            group: 'video',
        },
        {
            name: 'videoImage',
            title: 'Preview Image',
            type: 'image.desktop',
            options: {
                collapsible: true,
            },
            validation: (Rule) => Rule.required(),
            group: 'video',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'module.content',
            group: 'content',
        },
    ],
    preview: {
        select: {
            videoUrl: 'videoUrl',
            videoImage: 'videoImage',
        },
        prepare(selection) {
            const { videoUrl, videoImage } = selection;
            const src = videoImage?.image?.secure_url;

            return {
                media: <img src={src} alt={videoImage?.alt} />,
                title: 'Video',
                subtitle: videoUrl,
            };
        },
    },
};
