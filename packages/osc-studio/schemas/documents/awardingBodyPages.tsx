import { MODULES } from '../../constants.js';
import { StarIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { validateSlug } from '../../utils/validateSlug';

export default defineType({
    name: 'awardingBodyPages',
    title: 'Awarding Body Pages',
    type: 'document',
    icon: StarIcon,
    groups: [
        {
            default: true,
            name: 'editorial',
            title: 'Editorial',
        },
    ],
    fields: [
        // Title
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        // Slug
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
            validation: validateSlug,
        }),

        // Modules
        defineField({
            name: 'modules',
            title: 'Modules',
            type: 'array',
            of: MODULES,
            group: 'editorial',
        }),
    ],
});
