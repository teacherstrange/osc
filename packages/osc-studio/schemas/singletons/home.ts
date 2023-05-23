import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { MODULES } from '../../constants.js';

const TITLE = 'Home';

export default defineType({
    name: 'home',
    title: TITLE,
    type: 'document',
    icon: HomeIcon,
    groups: [
        {
            default: true,
            name: 'editorial',
            title: 'Editorial',
        },
        {
            name: 'seo',
            title: 'SEO',
        },
    ],
    fields: [
        // Title
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
            initialValue: TITLE,
        }),
        // Slug
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
            readOnly: true,
        }),
        // Modules
        defineField({
            name: 'modules',
            title: 'Modules',
            type: 'array',
            of: MODULES,
            group: 'editorial',
        }),
        // SEO
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo.home',
            group: 'seo',
        }),
    ],
    preview: {
        prepare() {
            return {
                // media: icon,
                subtitle: 'Index',
                title: TITLE,
            };
        },
    },
});
