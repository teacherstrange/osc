import { DocumentIcon } from '@sanity/icons';
import { validateSlug } from '../../utils/validateSlug';
import { MODULES } from '../../constants.js';

export default {
    name: 'page',
    title: 'Page',
    type: 'document',
    icon: DocumentIcon,
    groups: [
        {
            default: true,
            name: 'editorial',
            title: 'Editorial'
        },
        {
            name: 'seo',
            title: 'SEO'
        }
    ],
    fields: [
        // Title
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required()
        },
        // Slug
        {
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
            validation: validateSlug
        },
        // Show hero
        {
            name: 'showHero',
            title: 'Show hero',
            type: 'boolean',
            description: 'If disabled, page title will be displayed instead',
            initialValue: false,
            group: 'editorial'
        },
        // Modules
        {
            name: 'modules',
            title: 'Modules',
            type: 'array',
            of: MODULES,
            group: 'editorial'
        },
        // SEO
        {
            name: 'seo',
            title: 'SEO',
            type: 'seo.page',
            group: 'seo'
        }
    ],
    preview: {
        select: {
            active: 'active',
            seoImage: 'seo.image',
            title: 'title'
        },
        prepare(selection) {
            const { seoImage, title } = selection;

            return {
                media: seoImage,
                title
            };
        }
    }
};
