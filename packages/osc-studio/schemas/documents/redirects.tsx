import { PAGE_REFERENCES } from '../../constants.js';

export default {
    name: 'redirect',
    title: 'Redirect',
    type: 'document',
    fields: [
        {
            name: 'source',
            title: 'From',
            type: 'string',
            description:
                'The page you want to redirect from. Must be a relative url e.g. /blog/post or /page'
        },
        {
            name: 'destination',
            title: 'To',
            type: 'reference',
            to: PAGE_REFERENCES,
            description: 'The page you want to redirect to',
            options: {
                disableNew: true
            }
        },
        {
            name: 'statusCode',
            title: 'Status Code',
            type: 'number',
            initialValue: 301,
            description: '301 = permanent redirect | 302 = temporary redirect',
            options: {
                list: [301, 302],
                layout: 'dropdown'
            }
        }
    ],
    preview: {
        select: {
            title: 'source',
            subtitle: 'destination.title'
        },
        prepare(selection) {
            const { title, subtitle } = selection;

            return {
                title,
                subtitle: `Redirected to ${subtitle}`
            };
        }
    }
};
