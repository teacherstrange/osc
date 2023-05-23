import { MasterDetailIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { MODULES } from '../../constants.js';
import { validateSlug } from '../../utils/validateSlug';

const TITLE = 'Blog';

export default defineType({
    name: 'blog',
    title: TITLE,
    type: 'document',
    icon: MasterDetailIcon,
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
            validation: validateSlug,
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
