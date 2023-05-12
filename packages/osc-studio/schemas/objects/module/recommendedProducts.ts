import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { ColorPicker } from '../../../components/inputs/ColorPicker';
import { SPACING } from '../../../constants';

export default defineType({
    name: 'module.recommendedProducts',
    title: 'Recommended Products',
    type: 'object',
    icon: TagIcon,
    groups: [
        {
            name: 'spacing',
            title: 'Spacing',
        },
        {
            name: 'products',
            title: 'Products',
            default: true,
        },
    ],
    fields: [
        defineField({
            name: 'marginBottom',
            title: 'Push Region',
            type: 'string',
            description: 'Spacing you would like between this region and the next.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
        }),
        defineField({
            name: 'paddingTop',
            title: 'Inner Padding Top',
            type: 'string',
            description: 'Inner padding at the top of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            initialValue: '5xl',
            group: 'spacing',
        }),
        defineField({
            name: 'paddingBottom',
            title: 'Inner Padding Bottom',
            type: 'string',
            description: 'Inner padding at the bottom of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            initialValue: '4xl',
            group: 'spacing',
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            initialValue: 'You may also like',
            group: 'products',
        }),
        defineField({
            name: 'backgroundColor',
            title: 'Background Colour',
            type: 'string',
            components: {
                input: ColorPicker,
            },
            initialValue: 'neutral-300',
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
