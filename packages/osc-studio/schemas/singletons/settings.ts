import { CogIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { IconPicker } from '../../components/inputs/IconPicker';
import { PAGE_REFERENCES } from '../../constants.js';

const TITLE = 'Settings';

export default defineType({
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
            name: 'contact',
            title: 'Contact details',
        },
        {
            name: 'notFoundPage',
            title: '404 page',
        },
    ],
    fields: [
        // Menu
        defineField({
            name: 'mainNavigation',
            title: 'Main Navigation',
            description: 'Select the menu for the main nav on the site',
            type: 'reference',
            to: { type: 'navigation' },
            group: 'navigation',
        }),
        defineField({
            name: 'actionNav',
            title: 'Action bar',
            type: 'object',
            group: 'navigation',
            options: {
                collapsed: false,
                collapsible: true,
            },
            fields: [
                defineField({
                    name: 'search',
                    title: 'Search',
                    type: 'object',
                    options: {
                        collapsible: true,
                    },
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                            components: {
                                input: IconPicker,
                            },
                            placeholder: 'Select an icon...',
                        }),
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                        }),
                    ],
                }),
                defineField({
                    name: 'account',
                    title: 'Account',
                    type: 'object',
                    options: {
                        collapsible: true,
                    },
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                            components: {
                                input: IconPicker,
                            },
                            placeholder: 'Select an icon...',
                        }),
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                        }),
                        defineField({
                            name: 'link',
                            title: 'Link',
                            type: 'reference',
                            weak: true,
                            to: PAGE_REFERENCES,
                        }),
                    ],
                }),
                defineField({
                    name: 'wishlist',
                    title: 'Wishlist',
                    type: 'object',
                    options: {
                        collapsible: true,
                    },
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                            components: {
                                input: IconPicker,
                            },
                            placeholder: 'Select an icon...',
                        }),
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                        }),
                        defineField({
                            name: 'link',
                            title: 'Link',
                            type: 'reference',
                            weak: true,
                            to: PAGE_REFERENCES,
                        }),
                    ],
                }),
                defineField({
                    name: 'cart',
                    title: 'Cart',
                    type: 'object',
                    options: {
                        collapsible: true,
                    },
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                            components: {
                                input: IconPicker,
                            },
                            placeholder: 'Select an icon...',
                        }),
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                        }),
                    ],
                }),
            ],
        }),
        // Footer
        defineField({
            name: 'footerNavigation',
            title: 'Footer Navigation',
            type: 'array',
            of: [
                defineArrayMember({
                    name: 'navigation',
                    title: 'Navigation',
                    type: 'reference',
                    to: { type: 'navigation' },
                }),
            ],
            validation: (Rule) => Rule.max(4),
            group: 'footer',
        }),
        defineField({
            name: 'footerBottomNav',
            title: 'Footer Bottom Navigation',
            type: 'reference',
            to: { type: 'navigation' },
            group: 'footer',
        }),
        // SEO
        defineField({
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
                defineField({
                    name: 'title',
                    title: 'Site title',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
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
                }),
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
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
        }),
        defineField({
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
                defineField({
                    name: 'noIndex',
                    title: 'Discourage search engines from indexing this site',
                    type: 'boolean',
                }),
            ],
        }),
        // Social
        defineField({
            name: 'socialProfile',
            title: "Organization's social profiles",
            description: 'Input any profiles on the web that belong to your organization.',
            group: 'social',
            type: 'array',
            of: [{ type: 'social' }],
        }),
        // Contact
        defineField({
            name: 'phoneNumber',
            title: 'Phone number',
            type: 'string',
            group: 'contact',
            validation: (Rule) =>
                // regex to match phone number pattern: https://ihateregex.io/expr/phone/
                Rule.regex(/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/, {
                    name: 'phone number',
                }),
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            group: 'contact',
            validation: (Rule) =>
                // regex to match email address: https://ihateregex.io/expr/email/
                Rule.regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, {
                    name: 'email',
                }),
        }),
        // Not found page
        defineField({
            name: 'notFoundPage',
            title: '404 page',
            type: 'object',
            group: 'notFoundPage',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'body',
                    title: 'Body',
                    type: 'text',
                    rows: 2,
                }),
                defineField({
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
                }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: TITLE,
            };
        },
    },
});
