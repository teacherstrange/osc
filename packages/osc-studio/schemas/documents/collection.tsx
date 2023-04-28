import { PackageIcon } from '@sanity/icons';
import pluralize from 'pluralize';
import { defineField, defineType } from 'sanity';
import ShopifyIcon from '../../components/icons/Shopify';
import CollectionHiddenInput from '../../components/inputs/CollectionHidden';
import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus';
import { MODULES } from '../../constants.js';

const GROUPS = [
    {
        default: true,
        name: 'editorial',
        title: 'Editorial',
    },
    {
        name: 'settings',
        title: 'Settings',
    },
    {
        name: 'shopifySync',
        title: 'Shopify sync',
        icon: ShopifyIcon,
    },
    {
        name: 'seo',
        title: 'SEO',
    },
];

export default defineType({
    name: 'collection',
    title: 'Collection',
    type: 'document',
    icon: PackageIcon,
    groups: GROUPS,
    fields: [
        // Product hidden status
        defineField({
            name: 'hidden',
            type: 'string',
            components: {
                input: CollectionHiddenInput,
            },
            group: GROUPS.map((group) => group.name),
            hidden: ({ parent }) => {
                const isDeleted = parent?.store?.isDeleted;
                return !isDeleted;
            },
        }),
        // Title (proxy)
        defineField({
            name: 'titleProxy',
            title: 'Title',
            type: 'proxyString',
            options: { field: 'store.title' },
        }),
        // Slug (proxy)
        defineField({
            name: 'slugProxy',
            title: 'Slug',
            type: 'proxyString',
            options: { field: 'store.slug.current' },
        }),
        // Modules
        defineField({
            name: 'modules',
            title: 'Modules',
            type: 'array',
            of: MODULES,
            group: 'editorial',
        }),
        // Shopify collection
        defineField({
            name: 'store',
            title: 'Shopify',
            type: 'shopifyCollection',
            description: 'Collection data from Shopify (read-only)',
            group: 'shopifySync',
        }),
        // SEO
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo.shopify',
            group: 'seo',
        }),
        // SETTINGS
        defineField({
            name: 'theme',
            title: 'Theme',
            type: 'theme',
            group: 'settings',
        }),
        defineField({
            name: 'image',
            title: 'Featured Image',
            type: 'image.desktop',
            group: 'settings',
        }),
    ],
    orderings: [
        {
            name: 'titleAsc',
            title: 'Title (A-Z)',
            by: [{ field: 'store.title', direction: 'asc' }],
        },
        {
            name: 'titleAsc',
            title: 'Title (Z-A)',
            by: [{ field: 'store.title', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            imageUrl: 'store.imageUrl',
            isDeleted: 'store.isDeleted',
            ruleCount: 'store.rules.length',
            title: 'store.title',
        },
        prepare(selection) {
            const { imageUrl, isDeleted, ruleCount, title } = selection;
            return {
                media: (
                    <ShopifyDocumentStatus
                        title={title}
                        isDeleted={isDeleted}
                        type="collection"
                        url={imageUrl}
                    />
                ),
                subtitle:
                    ruleCount > 0 ? `Automated (${pluralize('rule', ruleCount, true)})` : 'Manual',
                title,
            };
        },
    },
});
