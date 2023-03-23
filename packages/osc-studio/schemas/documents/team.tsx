import { UsersIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'team',
    title: 'Team',
    type: 'document',
    icon: UsersIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image.desktop',
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'bodyNoHeadings',
        }),
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
});
