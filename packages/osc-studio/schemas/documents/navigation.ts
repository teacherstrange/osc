import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    icon: PaperPlaneIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
        }),
        defineField({
            name: 'navigationId',
            title: 'Navigation ID',
            type: 'slug',
            options: { source: 'title' },
        }),
        defineField({
            name: 'navigationItem',
            title: 'Navigation Item',
            icon: PaperPlaneIcon,
            type: 'array',
            of: [{ type: 'navigation.item' }],
        }),
    ],
});
