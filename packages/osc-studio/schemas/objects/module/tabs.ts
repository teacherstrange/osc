import { BlockElementIcon } from '@sanity/icons';
import pluralize from 'pluralize';
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'module.tabs',
    title: 'Tabs',
    type: 'object',
    icon: BlockElementIcon,
    groups: [
        {
            name: 'row',
            title: 'Row',
        },
        {
            name: 'tabs',
            title: 'Tabs',
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
