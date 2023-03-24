import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { MODULES } from '../../constants.js';
import { validateSlug } from '../../utils/validateSlug';

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    icon: DocumentIcon,
    groups: [
        {
            name: 'theme',
            title: 'Theme',
        },
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
        // Show hero
        defineField({
            name: 'showHero',
            title: 'Show hero',
            type: 'boolean',
            description: 'If disabled, page title will be displayed instead',
            initialValue: false,
            group: 'editorial',
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
