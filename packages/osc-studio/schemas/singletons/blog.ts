import { MasterDetailIcon } from '@sanity/icons';

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
