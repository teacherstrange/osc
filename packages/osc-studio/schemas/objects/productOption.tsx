import { SunIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
    title: 'Product option',
    name: 'productOption',
    type: 'object',
    icon: SunIcon,
    readOnly: true,
    fields: [
        // Name
        defineField({
            title: 'Name',
            name: 'name',
            type: 'string',
        }),
        // Values
        defineField({
            title: 'Values',
            name: 'values',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
    preview: {
        select: {
            name: 'name',
        },
        prepare(selection) {
            const { name } = selection;

            return {
                title: name,
            };
        },
    },
});
