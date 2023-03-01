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
            type: 'string',
        },
    ],
};
