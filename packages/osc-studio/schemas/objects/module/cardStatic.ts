import { ColorPicker } from '../../../components/inputs/ColorPicker';

export default {
    name: 'card.static',
    title: 'Static Card',
    type: 'object',
    groups: [
        {
            name: 'content',
            title: 'Content',
            default: true,
        },
        {
            name: 'media',
            title: 'Media',
        },
    ],
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image.desktop',
            group: 'media',
        },
        {
            name: 'heading',
            title: 'Heading',
            type: 'string',
            group: 'content',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'headingStyles',
            title: 'Heading Styles',
            type: 'object',
            group: 'content',
            fields: [
                {
                    name: 'smallHeading',
                    title: 'Small Heading',
                    type: 'boolean',
                    initialValue: false,
                },
                {
                    name: 'headingColor',
                    title: 'Heading Colour',
                    type: 'string',
                    inputComponent: ColorPicker,
                },
            ],
            options: {
                columns: 2,
            },
        },
        {
            name: 'showSubHeading',
            title: 'Show Sub Heading',
            type: 'boolean',
            initialValue: false,
            group: 'content',
        },
        {
            name: 'subHeading',
            title: 'Sub Heading',
            type: 'string',
            group: 'content',
            hidden: ({ parent }) => parent.showSubHeading === false,
        },
        {
            name: 'content',
            title: 'Content',
            type: 'bodyNoHeadings',
            group: 'content',
        },
        {
            name: 'button',
            title: 'Button',
            type: 'module.button',
            group: 'content',
        },
        {
            name: 'showFooter',
            title: 'Show Footer',
            type: 'boolean',
            description: 'Show a footer on the card.',
            initialValue: false,
            group: 'content',
        },
        {
            name: 'footer',
            title: 'Footer',
            type: 'bodyNoHeadings',
            group: 'content',
            hidden: ({ parent }) => parent.showFooter === false,
        },
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare(selection: Record<string, any>) {
            const title = selection.title;

            return {
                title,
                subtitle: 'Static Card',
            };
        },
    },
};
