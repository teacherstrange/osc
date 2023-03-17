import { IconPicker } from '../../components/inputs/IconPicker';

export default {
    name: 'textGridItem',
    title: 'Text Grid Item',
    type: 'object',
    fields: [
        {
            name: 'icon',
            title: 'Icon',
            type: 'string',
            components: {
                input: IconPicker,
            },
            placeholder: 'Select an icon...',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'module.content',
        },
    ],
    preview: {
        select: {
            content: 'content',
        },
        prepare(selection) {
            const title = selection.content.body[0].children[0].text; // display the first item from the body content

            return {
                title,
                subtitle: 'Grid item',
            };
        },
    },
};
