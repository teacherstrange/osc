import { StarFilledIcon } from '@radix-ui/react-icons';
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'testimonials',
    title: 'Testimonials',
    type: 'document',
    icon: StarFilledIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'quote',
            title: 'Quote',
            type: 'body',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'situation',
            title: 'Situation',
            type: 'string',
        }),
        defineField({
            name: 'referenceMultiSelect',
            title: 'Associated Courses',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'product' } }],
        }),
    ],
});
