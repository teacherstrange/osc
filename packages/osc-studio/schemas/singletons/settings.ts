import { CogIcon } from '@sanity/icons';
import { IconPicker } from '../../components/inputs/IconPicker';
import { PAGE_REFERENCES } from '../../constants.js';

const TITLE = 'Settings';

export default {
    name: 'settings',
    title: TITLE,
    type: 'document',
    icon: CogIcon,
    groups: [
        {
            default: true,
            name: 'navigation',
            title: 'Navigation',
        },
        {
            name: 'footer',
            title: 'Footer',
        },
        {
            name: 'seo',
            title: 'SEO',
        },
        {
            name: 'social',
            title: 'Social',
        },
        {
            name: 'notFoundPage',
            title: '404 page',
        },
    ],
    fields: [
        // Menu
        {
            name: 'mainNavigation',
            title: 'Main Navigation',
            description: 'Select the menu for the main nav on the site',
            type: 'reference',
            to: { type: 'navigation' },
            group: 'navigation',
        },
        {
            name: 'actionNav',
            title: 'Action bar',
            type: 'object',
            group: 'navigation',
            options: {
                collapsed: false,
                collapsible: true,
            },
            fields: [
                {
                    name: 'search',
                    title: 'Search',
                    type: 'object',
                    options: {
                        collapsible: true,
                    },
                    fields: [
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                            inputComponent: IconPicker,
                            placeholder: 'Select an icon...',
                        },
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                        },
                    ],
                },
                {
                    name: 'account',
                    title: 'Account',
                    type: 'object',
                    options: {
                        collapsible: true,
                    },
                    fields: [
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                            inputComponent: IconPicker,
                            placeholder: 'Select an icon...',
                        },
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                        },
                        {
                            name: 'link',
                            title: 'Link',
                            type: 'reference',
                            weak: true,
                            to: PAGE_REFERENCES,
                        },
                    ],
                },
                {
                    name: 'wishlist',
                    title: 'Wishlist',
                    type: 'object',
                    options: {
                        collapsible: true,
                    },
                    fields: [
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                            inputComponent: IconPicker,
                            placeholder: 'Select an icon...',
                        },
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                        },
                        {
                            name: 'link',
                            title: 'Link',
                            type: 'reference',
                            weak: true,
                            to: PAGE_REFERENCES,
                        },
                    ],
                },
                {
                    name: 'cart',
                    title: 'Cart',
                    type: 'object',
                    options: {
                        collapsible: true,
                    },
                    fields: [
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                            inputComponent: IconPicker,
                            placeholder: 'Select an icon...',
                        },
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                        },
                    ],
                },
            ],
        },
        // Footer
        {
            name: 'footerNavigation',
            title: 'Footer Navigation',
            type: 'array',
            of: [
                {
                    name: 'navigation',
                    title: 'Navigation',
                    type: 'reference',
                    to: { type: 'navigation' },
                },
            ],
            validation: (Rule) => Rule.max(4),
            group: 'footer',
        },
        {
            name: 'footerBottomNav',
            title: 'Footer Bottom Navigation',
            type: 'reference',
            to: { type: 'navigation' },
            group: 'footer',
        },
        // SEO
        {
            name: 'seo',
            title: 'SEO',
            type: 'object',
            group: 'seo',
            description: 'Defaults for every page',
            options: {
                collapsed: false,
                collapsible: true,
            },
            fields: [
                {
                    name: 'title',
                    title: 'Site title',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: 'titleSeparator',
                    title: 'Title Separator',
                    type: 'string',
                    description:
                        'Choose the symbol to use as your title separator. This will display, for instance, between your post title and site name.',
                    options: {
                        list: ['-', '–', '—', '|'],
                        layout: 'radio',
                        direction: 'horizontal',
                    },
                },
            ],
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'schema',
            title: 'Knowledge Graph & Schema.org',
            type: 'object',
            group: 'seo',
            description:
                "This data is shown as metadata in your site. It is intended to appear in Google's Knowledge Graph. You can be either an organization, or a person.",
            options: {
                collapsed: false,
                collapsible: true,
            },
            fields: [
                {
                    name: 'organizationName',
                    title: 'Organization name',
                    type: 'string',
                },
                {
                    name: 'organizationLogo',
                    title: 'Organization logo',
                    type: 'image',
                },
            ],
        },
        {
            name: 'robots',
            title: 'Search engine visibility',
            type: 'object',
            group: 'seo',
            description: 'It is up to search engines to honor this request.',
            options: {
                collapsed: false,
                collapsible: true,
            },
            fields: [
                {
                    name: 'noIndex',
                    title: 'Discourage search engines from indexing this site',
                    type: 'boolean',
                },
            ],
        },
        // Social
        {
            name: 'social',
            title: "Organization's social profiles",
            type: 'object',
            group: 'social',
            description: 'Input any profiles on the web that belong to your organization.',
            options: {
                collapsed: false,
                collapsible: true,
            },
            fields: [
                {
                    name: 'socialProfile',
                    title: 'Social Profile',
                    type: 'array',
                    of: [{ type: 'social' }],
                },
            ],
        },
        // Not found page
        {
            name: 'notFoundPage',
            title: '404 page',
            type: 'object',
            group: 'notFoundPage',
            fields: [
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: 'body',
                    title: 'Body',
                    type: 'text',
                    rows: 2,
                },
                {
                    name: 'collection',
                    title: 'Collection',
                    type: 'reference',
                    description: 'Collection products displayed on this page',
                    weak: true,
                    to: [
                        {
                            name: 'collection',
                            type: 'collection',
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        prepare() {
            return {
                title: TITLE,
            };
        },
    },
};
