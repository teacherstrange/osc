import { StackCompactIcon } from '@sanity/icons';
import pluralize from 'pluralize';
import { joinWithAnd } from '../../../utils/joinWithAnd';

const HEADING_LEVELS = ['h2', 'h3', 'h4', 'h5', 'h6'];

export default {
    name: 'module.accordion',
    title: 'Accordion',
    type: 'object',
    icon: StackCompactIcon,
    groups: [
        {
            name: 'content',
            title: 'Content',
            default: true
        },
        {
            name: 'accordion',
            title: 'Accordion'
        }
    ],
    fields: [
        {
            name: 'content',
            title: 'Content',
            type: 'module.content',
            group: 'content'
        },
        {
            name: 'accordionHeadingLevels',
            title: 'Accordion Heading Levels',
            type: 'string',
            group: 'accordion',
            description: 'Set the appropriate heading level for the accordion headings.',
            initialValue: 'h3',
            options: {
                list: HEADING_LEVELS,
                layout: 'dropdown'
            },
            validation: (Rule) =>
                Rule.required().custom((value, { parent }) => {
                    if (typeof value === 'undefined') {
                        return true;
                    }

                    const contentBody = parent?.content?.body;

                    const lastHeading = contentBody.findLast((item) =>
                        HEADING_LEVELS.includes(item.style)
                    ).style;

                    const getDigit = (string: string) => Number(string.match(/\d+/)[0]);

                    const selectLevel = () => {
                        if (getDigit(lastHeading) === 6) {
                            return getDigit(lastHeading);
                        }

                        return getDigit(lastHeading) + 1;
                    };

                    if (getDigit(value) < getDigit(lastHeading)) {
                        return `Heading levels are out of order. It looks like the last heading you set was a ${lastHeading}; for the document order to be correct please correct your headings in the content section, or select h${selectLevel()} from the dropdown.`;
                    } else if (getDigit(value) > getDigit(lastHeading) + 1) {
                        return `Heading level has been skipped. It looks like the last heading you set was a ${lastHeading}; for the document order to be correct please correct your headings in the content section, or select h${selectLevel()} from the dropdown.`;
                    }

                    return true;
                })
        },
        {
            name: 'accordionItem',
            title: 'Accordion Item',
            type: 'array',
            of: [{ type: 'accordionItem' }],
            group: 'accordion',
            validation: (Rule) =>
                Rule.required().custom((accordion) => {
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
                })
        }
    ],
    preview: {
        select: {
            accordionCount: 'accordionItem.length'
        },
        prepare(selection: Record<string, any>) {
            const { accordionCount } = selection;
            return {
                title: 'Accordion',
                subtitle: accordionCount ? pluralize('item', accordionCount, true) : 'No items'
            };
        }
    }
};
