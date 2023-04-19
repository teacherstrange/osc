import { defineField, defineType } from 'sanity';
import { ColorPickerRestricted } from '../../components/inputs/ColorPickerRestricted';

export default defineType({
    name: 'flourishes',
    title: 'Flourishes',
    type: 'object',
    fields: [
        defineField({
            name: 'color',
            title: 'Colour',
            type: 'string',
            initialValue: 'tertiary',
            components: {
                input: ColorPickerRestricted,
            },
        }),
        defineField({
            name: 'pattern',
            title: 'Pattern',
            type: 'string',
            initialValue: 'flourishHeroPrimary',
            options: {
                layout: 'dropdown',
                list: [
                    {
                        title: 'Primary',
                        value: 'flourishHeroPrimary',
                    },
                    {
                        title: 'Secondary',
                        value: 'flourishHeroSecondary',
                    },
                    {
                        title: 'Tertiary',
                        value: 'flourishHeroTertiary',
                    },
                ],
            },
        }),
    ],
});
