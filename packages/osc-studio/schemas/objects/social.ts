import { IconPicker } from '../../components/inputs/IconPicker';

export default {
    name: 'social',
    title: 'Social',
    type: 'object',
    fields: [
        {
            name: 'icon',
            title: 'Icon',
            type: 'string',
            inputComponent: IconPicker,
        },
        {
            name: 'socialProfile',
            title: 'Social Profile',
            type: 'url',
        },
    ],
    preview: {
        select: {
            url: 'socialProfile',
        },
        prepare(selection: Record<string, any>) {
            const { url } = selection;

            return {
                title: url,
            };
        },
    },
};
