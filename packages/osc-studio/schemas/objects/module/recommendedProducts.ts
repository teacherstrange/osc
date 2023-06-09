import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'module.recommendedProducts',
    title: 'Recommended Products',
    type: 'object',
    icon: TagIcon,
    groups: [
        {
            name: 'row',
            title: 'Row',
        },
        {
            name: 'products',
            title: 'Products',
            default: true,
        },
    ],
    fields: [
        defineField({
            name: 'rowSettings',
            title: 'Settings',
            type: 'rowSettings',
            group: 'row',
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            initialValue: 'You may also like',
            group: 'products',
        }),
        defineField({
            name: 'numberOfProducts',
            title: 'Number of Products',
            description: 'The number of recommended products to display. Max 10',
            type: 'number',
            initialValue: 4,
            validation: (Rule) => Rule.min(1).max(10),
            group: 'products',
        }),
        defineField({
            name: 'carouselSettings',
            title: 'Carousel Settings',
            type: 'carouselSettings',
            group: 'products',
        }),
    ],
    preview: {
        select: {
            title: 'heading',
            products: 'numberOfProducts',
        },
        prepare(selection) {
            return {
                title: selection.title ?? 'Recommended Products',
                subtitle: `${selection.products} products`,
            };
        },
    },
});
