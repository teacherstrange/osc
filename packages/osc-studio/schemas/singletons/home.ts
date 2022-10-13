import { HomeIcon } from '@sanity/icons';

const TITLE = 'Home';

export default {
    name: 'home',
    title: TITLE,
    type: 'document',
    icon: HomeIcon,
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
            validation: (Rule) => Rule.required(),
            initialValue: TITLE
        },
        // Slug
        {
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
            readonly: true
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
            of: [{ type: 'module.content' }, { type: 'module.images' }],
            group: 'editorial'
        },
        // SEO
        {
            name: 'seo',
            title: 'SEO',
            type: 'seo.home',
            group: 'seo'
        }
    ],
    preview: {
        prepare() {
            return {
                // media: icon,
                subtitle: 'Index',
                title: TITLE
            };
        }
    }
};
