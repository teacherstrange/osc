import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { MODULES } from '../../constants.js';
import { validateSlug } from '../../utils/validateSlug';

export default defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    icon: DocumentIcon,
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
            type: 'seo.page',
            group: 'seo',
        }),
    ],
    preview: {
        select: {
            active: 'active',
            seoImage: 'seo.image',
            title: 'title',
        },
        prepare(selection) {
            const { seoImage, title } = selection;

            return {
                media: seoImage,
                title,
            };
        },
    },
});
