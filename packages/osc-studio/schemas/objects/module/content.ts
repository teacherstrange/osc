import { EditIcon } from '@sanity/icons';

export default {
    name: 'module.content',
    title: 'Content',
    type: 'object',
    icon: EditIcon,
    fields: [
        {
            name: 'body',
            title: 'Body',
            type: 'body'
        }
    ],
    preview: {
        select: {
            title: 'body'
        },
        prepare(selection: Record<string, any>) {
            const title = selection.title[0].children[0].text; // display the first item from the body content

            return {
                subtitle: 'Content',
                title
            };
        }
    }
};
