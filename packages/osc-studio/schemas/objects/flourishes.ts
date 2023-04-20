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
            initialValue: '',
            options: {
                layout: 'dropdown',
                list: [
                    {
                        title: 'Page - Primary',
                        value: 'flourishPrimary',
                    },
                    {
                        title: 'Page - Secondary',
                        value: 'flourishSecondary',
                    },
                    {
                        title: 'Hero - Primary',
                        value: 'flourishHeroPrimary',
                    },
                    {
                        title: 'Hero - Secondary',
                        value: 'flourishHeroSecondary',
                    },
                    {
                        title: 'Hero - Tertiary',
                        value: 'flourishHeroTertiary',
                    },
                ],
            },
        }),
    ],
});
