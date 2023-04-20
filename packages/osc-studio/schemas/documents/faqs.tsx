import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'faqs',
    title: 'FAQs',
    type: 'document',
    icon: QuestionMarkCircledIcon,
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'body',
            validation: (Rule) => Rule.required(),
        }),
    ],
});
