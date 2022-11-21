import { SquareIcon } from '@sanity/icons';
import pluralize from 'pluralize';

export default {
    name: 'module.buttons',
    title: 'Buttons',
    type: 'object',
    icon: SquareIcon,
    fields: [
        {
            name: 'modules',
            title: 'Buttons',
            type: 'array',
            of: [{ type: 'module.button' }]
        }
    ],
    preview: {
        select: {
            buttonCount: 'modules.length'
        },
        prepare(selection) {
            const { buttonCount } = selection;
            return {
                subtitle: 'Buttons',
                title: buttonCount ? pluralize('button', buttonCount, true) : 'No Buttons'
            };
        }
    }
};
