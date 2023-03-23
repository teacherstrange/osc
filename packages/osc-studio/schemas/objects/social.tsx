import { defineField, defineType } from 'sanity';
import { IconPicker } from '../../components/inputs/IconPicker';

export default defineType({
    name: 'social',
    title: 'Social',
    type: 'object',
    fields: [
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            components: {
                input: IconPicker,
            },
        }),
        defineField({
            name: 'socialProfile',
            title: 'Social Profile',
            type: 'url',
        }),
    ],
    preview: {
        select: {
            url: 'socialProfile',
            icon: 'icon',
        },
        prepare(selection) {
            const { url, icon } = selection;

            return {
                title: url,
                media: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 25 25"
                        fill="none"
                    >
                        <use href={`/static/spritesheet.svg#${icon}`} />
                    </svg>
                ),
            };
        },
    },
});
