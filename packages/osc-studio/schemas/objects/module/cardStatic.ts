import { defineField, defineType } from 'sanity';
import { ColorPicker } from '../../../components/inputs/ColorPicker';

export default defineType({
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
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image.desktop',
            group: 'media',
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
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
                    components: {
                        input: ColorPicker,
                    },
                },
            ],
            options: {
                columns: 2,
            },
        }),
        defineField({
            name: 'showSubHeading',
            title: 'Show Sub Heading',
            type: 'boolean',
            initialValue: false,
            group: 'content',
        }),
        defineField({
            name: 'subHeading',
            title: 'Sub Heading',
            type: 'string',
            group: 'content',
            hidden: ({ parent }) => parent.showSubHeading === false,
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'bodyNoHeadings',
            group: 'content',
        }),
        defineField({
            name: 'button',
            title: 'Button',
            type: 'module.button',
            group: 'content',
        }),
        defineField({
            name: 'showFooter',
            title: 'Show Footer',
            type: 'boolean',
            description: 'Show a footer on the card.',
            initialValue: false,
            group: 'content',
        }),
        defineField({
            name: 'footer',
            title: 'Footer',
            type: 'bodyNoHeadings',
            group: 'content',
            hidden: ({ parent }) => parent.showFooter === false,
        }),
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare(selection) {
            const title = selection.title;

            return {
                title,
                subtitle: 'Static Card',
            };
        },
    },
});
