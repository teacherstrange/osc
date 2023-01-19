import { PaperPlaneIcon } from '@radix-ui/react-icons';

export default {
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    icon: PaperPlaneIcon,
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
        },
        {
            name: 'navigationId',
            title: 'Navigation ID',
            type: 'slug',
            options: { source: 'title' },
        },
        {
            name: 'navigationItem',
            title: 'Navigation Item',
            icon: PaperPlaneIcon,
            type: 'array',
            of: [{ type: 'navigation.item' }],
        },
    ],
};
