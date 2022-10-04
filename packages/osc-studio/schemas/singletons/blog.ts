import { MasterDetailIcon } from '@sanity/icons';
import { validateSlug } from '../../utils/validateSlug';
import { MODULES } from '../../constants.js';

const TITLE = 'Blog';

export default {
    name: 'blog',
    title: TITLE,
    type: 'document',
    icon: MasterDetailIcon,
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
            validation: validateSlug,
            initialValue: TITLE.toLowerCase()
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
