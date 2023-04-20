import { defineField, defineType } from 'sanity';
import { MODULES } from '../../constants';

export default defineType({
    name: 'tabItem',
    title: 'Tab Item',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        // Modules
        defineField({
            name: 'modules',
            title: 'Modules',
            type: 'array',
            // Allow any and all content types except for parent tabs.
            of: MODULES.filter((module) => module.type !== 'module.tabs'),
            validation: (Rule) => Rule.required(),
        }),
    ],
});
