import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

// TODO - Update so that these are pulled in dynamically on a get request to Hubspot form API. Looks like a proxy needs setting up in order to do this.
const forms = [
    { name: 'Newsletter Form', id: '9cf24fde-b8c4-4165-bff6-1a151b83259d' },
    { name: 'Contact Form', id: 'b6aca185-96b6-416f-9b03-9ce8f894ea44' },
    { name: 'Prospectus Form', id: 'ec135217-340a-46cf-93b7-59a2ab1e509e' },
    { name: 'Callback Form', id: 'fe5ae92f-faeb-4d04-b8e0-72619d5459f5' },
];

export default defineType({
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
        defineField({
            name: 'formNameAndId',
            title: 'Form',
            description: 'List of forms pulled in from HubSpot',
            type: 'string',
            options: {
                layout: 'dropdown',
                list: forms.map((form) => ({
                    title: form.name,
                    value: `${form.name}, ${form.id}`,
                })),
            },
            group: 'forms',
        }),
        defineField({
            name: 'slideOut',
            title: 'Slide Out',
            description: 'Whether the form should slide out',
            type: 'boolean',
            group: 'settings',
        }),
        defineField({
            name: 'slideDirection',
            title: 'Slide Direction',
            description: 'Whether the form should slide out to the right or the left',
            type: 'string',
            options: {
                list: ['slide-right', 'slide-left'],
                layout: 'dropdown',
            },
            group: 'settings',
        }),
        defineField({
            name: 'slideOutText',
            title: 'Slide Out Text',
            description: 'Optional text for slide out if selected',
            type: 'string',
            group: 'settings',
        }),
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
});
