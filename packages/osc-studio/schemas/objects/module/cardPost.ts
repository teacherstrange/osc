import { ColorPicker } from '../../../components/inputs/ColorPicker';

export default {
    name: 'card.post',
    title: 'Post Card',
    type: 'object',
    fields: [
        {
            name: 'reference',
            type: 'reference',
            weak: true,
            to: { type: 'post' },
            options: {
                disableNew: true,
            },
        },
        {
            name: 'backgroundColor',
            title: 'Background Colour',
            type: 'string',
            inputComponent: ColorPicker,
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'fullWidth',
            title: 'Full Width',
            type: 'boolean',
            intialValue: false,
        },
    ],
    preview: {
        select: {
            title: 'reference.title',
        },
        prepare(selection: Record<string, any>) {
            const title = selection.title;

            return {
                title,
                subtitle: 'Post Card',
            };
        },
    },
};
