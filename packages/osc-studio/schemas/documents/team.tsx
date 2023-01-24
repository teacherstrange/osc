import { UsersIcon } from '@sanity/icons';
import React from 'react';

export default {
    name: 'team',
    title: 'Team',
    type: 'document',
    icon: UsersIcon,
    // groups: [
    //     {
    //         default: true,
    //         name: 'editorial',
    //         title: 'Editorial',
    //     },
    //     {
    //         name: 'seo',
    //         title: 'SEO',
    //     },
    // ],
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'role',
            title: 'Role',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image.desktop',
        },
        {
            name: 'bio',
            title: 'Bio',
            type: 'bodyNoHeadings',
        },
    ],
    preview: {
        select: {
            image: 'image',
            title: 'name',
        },
        prepare(selection) {
            const { image, title } = selection;

            return {
                media: <img src={image?.image?.secure_url} alt="" />,
                title,
            };
        },
    },
};
