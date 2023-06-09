import type { PortableTextBlock } from '@portabletext/types';

import { StackCompactIcon } from '@sanity/icons';
import pluralize from 'pluralize';
import { defineField, defineType } from 'sanity';
import { joinWithAnd } from '../../../utils/joinWithAnd';

const HEADING_LEVELS = ['h2', 'h3', 'h4', 'h5', 'h6'];

export default defineType({
    name: 'module.accordion',
    title: 'Accordion',
    type: 'object',
    icon: StackCompactIcon,
    groups: [
        {
            name: 'row',
            title: 'Row',
        },
        {
            name: 'content',
            title: 'Content',
            default: true,
        },
        {
            name: 'accordion',
            title: 'Accordion',
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
            name: 'content',
            title: 'Content',
            type: 'module.content',
            group: 'content',
        }),
        defineField({
            name: 'accordionHeadingLevels',
            title: 'Accordion Heading Levels',
            type: 'string',
            group: 'accordion',
            description: 'Set the appropriate heading level for the accordion headings.',
            initialValue: 'h3',
            options: {
                list: HEADING_LEVELS,
                layout: 'dropdown',
            },
            validation: (Rule) =>
                Rule.required().custom((currentValue, context) => {
                    const { content } = context.parent as {
                        content: { body: PortableTextBlock[] };
                    };

                    if (typeof currentValue === 'undefined' || !content) {
                        return true;
                    }

                    const contentBody = content && content?.body;

                    if (!contentBody) {
                        return true;
                    }

                    // @ts-ignore -- not actually sure why findLast does not exist?
                    const findLastHeading = contentBody.findLast(
                        (item: PortableTextBlock) =>
                            item.style && HEADING_LEVELS.includes(item.style)
                    );

                    // If there are no headings in the content body, pass the validation early
                    // so we're not restricting users to having to include a heading in the content block
                    if (!findLastHeading) {
                        return true;
                    }

                    const lastHeading = findLastHeading.style;

                    const getDigit = (string: string) =>
                        string ? Number(string.match(/\d+/)![0]) : 0;

                    const selectLevel = () => {
                        if (getDigit(lastHeading) === 6) {
                            return getDigit(lastHeading);
                        }

                        return getDigit(lastHeading) + 1;
                    };

                    if (getDigit(currentValue) < getDigit(lastHeading)) {
                        return `Heading levels are out of order. It looks like the last heading you set was a ${lastHeading}; for the document order to be correct please correct your headings in the content section, or select h${selectLevel()} from the dropdown.`;
                    } else if (getDigit(currentValue) > getDigit(lastHeading) + 1) {
                        return `Heading level has been skipped. It looks like the last heading you set was a ${lastHeading}; for the document order to be correct please correct your headings in the content section, or select h${selectLevel()} from the dropdown.`;
                    }

                    return true;
                }),
        }),
        defineField({
            name: 'accordionItem',
            title: 'Accordion Item',
            type: 'array',
            of: [{ type: 'accordionItem' }],
            group: 'accordion',
            validation: (Rule) =>
                Rule.required().custom((currentValue) => {
                    const accordion = currentValue as {
                        content: { body: PortableTextBlock[] };
                        defaultOpen: boolean;
                        heading: string;
                    }[];

                    if (typeof accordion === 'undefined') {
                        return true;
                    }

                    const defaultOpen = accordion.filter(
                        (accordion) => accordion.defaultOpen === true
                    );

                    const accordionHeadings = defaultOpen.map((accordion) => accordion.heading);

                    if (defaultOpen.length > 1) {
                        return `You can't have multiple accordion items open by default. It looks like ${joinWithAnd(
                            accordionHeadings
                        )} are set to be open by default.`;
                    }

                    return true;
                }),
        }),
    ],
    preview: {
        select: {
            accordionItem: 'accordionItem',
        },

        prepare(selection) {
            const { accordionItem } = selection;
            const accordionCount = accordionItem?.length;

            return {
                title: 'Accordion',
                subtitle: accordionCount ? pluralize('item', accordionCount, true) : 'No items',
            };
        },
    },
});
