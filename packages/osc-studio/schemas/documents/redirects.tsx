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
                'The page you want to redirect from. Must be a relative url e.g. /blog/post or /page',
            validation: (Rule) =>
                Rule.required().custom((context) => {
                    const startsWithSlash = /(^\/\w+)/g;

                    if (!startsWithSlash.test(context)) {
                        return 'The slug be relative (starts with "/")';
                    }

                    return true;
                })
        },
        {
            name: 'destination',
            title: 'To',
            type: 'reference',
            to: PAGE_REFERENCES,
            description: 'The page you want to redirect to',
            options: {
                disableNew: true // Stop ability to create new pages from this screen
            },
            validation: (Rule) => Rule.required()
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
            },
            validation: (Rule) => Rule.required()
        }
    ],
    preview: {
        select: {
            title: 'source',
            subtitle: 'destination.title',
            storeSubTitle: 'destination.store.title'
        },
        prepare(selection) {
            const { title, subtitle, storeSubTitle } = selection;

            return {
                title,
                subtitle: `Redirected to ${subtitle ? subtitle : storeSubTitle}`
            };
        }
    }
};
