import { BlockElementIcon } from '@sanity/icons';
import pluralize from 'pluralize';
import { defineField, defineType } from 'sanity';
import { SPACING } from '../../../constants';

export default defineType({
    name: 'module.tabs',
    title: 'Tabs',
    type: 'object',
    icon: BlockElementIcon,
    groups: [
        {
            name: 'spacing',
            title: 'Spacing',
        },
        {
            name: 'tabs',
            title: 'Tabs',
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
            group: 'spacing',
        }),
        defineField({
            name: 'paddingLeft',
            title: 'Inner Padding Left',
            type: 'string',
            description: 'Inner padding at the left of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
        }),
        defineField({
            name: 'paddingRight',
            title: 'Inner Padding Right',
            type: 'string',
            description: 'Inner padding at the right of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
        }),
        defineField({
            name: 'tabItem',
            title: 'Tab',
            type: 'array',
            of: [{ type: 'tabItem' }],
            group: 'tabs',
        }),
    ],
    preview: {
        select: {
            tabItem: 'tabItem',
        },
        prepare(selection) {
            const { tabItem } = selection;
            const tabCount = tabItem?.length;

            return {
                title: 'Tabs',
                subtitle: tabCount ? pluralize('item', tabCount, true) : 'No items',
            };
        },
    },
});
