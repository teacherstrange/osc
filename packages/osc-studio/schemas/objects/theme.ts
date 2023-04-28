import { defineField, defineType } from 'sanity';
import { ColorPicker } from '../../components/inputs/ColorPicker';

export default defineType({
    name: 'theme',
    title: 'Theme',
    type: 'object',
    fields: [
        defineField({
            name: 'color',
            title: 'Colour',
            type: 'string',
            initialValue: 'tertiary',
            components: {
                input: ColorPicker,
            },
        }),
    ],
});
