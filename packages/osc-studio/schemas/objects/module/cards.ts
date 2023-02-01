import { ThLargeIcon } from '@sanity/icons';
import pluralize from 'pluralize';
import { ColorPicker } from '../../../components/inputs/ColorPicker';
import { SPACING } from '../../../constants';

const CARDS = [
    { type: 'card.bio' },
    { type: 'card.course' },
    { type: 'card.collection' },
    { type: 'card.post' },
    { type: 'card.static' },
];

export default {
    name: 'module.cards',
    title: 'Cards',
    type: 'object',
    icon: ThLargeIcon,
    groups: [
        {
            default: true,
            name: 'spacing',
            title: 'Spacing',
        },
        {
            name: 'cards',
            title: 'Cards',
        },
    ],
    fields: [
        {
            name: 'marginBottom',
            title: 'Push Region',
            type: 'string',
            description: 'Spacing you would like between this region and the next.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
        },
        {
            name: 'paddingTop',
            title: 'Inner Padding Top',
            type: 'string',
            description: 'Inner padding at the top of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
        },
        {
            name: 'paddingBottom',
            title: 'Inner Padding Bottom',
            type: 'string',
            description: 'Inner padding at the bottom of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
        },
        {
            name: 'layout',
            title: 'Layout',
            type: 'string',
            description: 'Select the layout for the cards.',
            initialValue: 'grid',
            options: {
                list: ['grid', 'carousel'],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
            group: 'cards',
        },
        {
            name: 'backgroundColor',
            title: 'Background Colour',
            type: 'string',
            inputComponent: ColorPicker,
            group: 'cards',
        },
        {
            name: 'card',
            title: 'Card',
            type: 'array',
            of: CARDS,
            group: 'cards',
        },
    ],
    preview: {
        select: {
            cardCount: 'card.length',
        },
        prepare(selection: Record<string, any>) {
            const { cardCount } = selection;

            return {
                title: 'Cards',
                subtitle: cardCount ? pluralize('item', cardCount, true) : 'No items',
            };
        },
    },
};
