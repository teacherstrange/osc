import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'accordionItem',
    title: 'Accordion Item',
    type: 'object',
    fields: [
        defineField({
            name: 'defaultOpen',
            title: 'Open by default',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'module.content',
            validation: (Rule) => Rule.required(),
        }),
    ],
});
