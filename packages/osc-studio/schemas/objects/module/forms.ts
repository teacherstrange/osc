import { DocumentIcon } from '@sanity/icons';

// TODO - Update so that these are pulled in dynamically on a get request to Hubspot form API. Looks like a proxy needs setting up in order to do this.
const forms = [
    { name: 'Newsletter Form', id: '9cf24fde-b8c4-4165-bff6-1a151b83259d' },
    { name: 'Contact Form', id: 'b6aca185-96b6-416f-9b03-9ce8f894ea44' },
];

export default {
    name: 'module.forms',
    title: 'Forms',
    type: 'object',
    icon: DocumentIcon,
    groups: [
        {
            name: 'forms',
            title: 'Form',
        },
        {
            name: 'settings',
            title: 'Settings',
        },
    ],
    fields: [
        {
            name: 'formNameAndId',
            title: 'Form',
            description: 'List of forms pulled in from HubSpot',
            type: 'string',
            options: {
                layout: 'select',
                list: forms.map((form) => ({
                    title: form.name,
                    value: `${form.name}, ${form.id}`,
                })),
            },
            group: 'forms',
        },
        {
            default: false,
            name: 'slideOut',
            title: 'Slide Out',
            description: 'Whether the form should slide out',
            type: 'boolean',
            group: 'settings',
        },
        {
            name: 'slideDirection',
            title: 'Slide Direction',
            description: 'Whether the form should slide out to the right or the left',
            type: 'string',
            options: {
                list: ['slide-right', 'slide-left'],
                layout: 'dropdown',
            },
            group: 'settings',
        },
        {
            name: 'slideOutText',
            title: 'Slide Out Text',
            description: 'Optional text for slide out if selected',
            type: 'string',
            group: 'settings',
        },
    ],
    preview: {
        select: {
            name: 'formNameAndId',
        },
        prepare(selection: Record<string, any>) {
            const title = selection.name.split(', ')[0];
            return {
                title: title,
                subtitle: 'Form',
            };
        },
    },
};
