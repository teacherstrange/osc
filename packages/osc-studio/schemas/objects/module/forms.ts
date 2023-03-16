import { DocumentIcon } from '@sanity/icons';

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
            name: 'content',
            title: 'Content',
        },
        {
            name: 'settings',
            title: 'Settings',
        },
    ],
    fields: [
        {
            name: 'titleAndDescription',
            title: 'Title and Description',
            group: 'content',
            type: 'body',
        },
        {
            name: 'formId',
            title: 'Form',
            description: 'List of forms pulled in from HubSpot',
            type: 'string',
            options: {
                layout: 'select',
                list: [
                    {
                        title: 'Contact Form',
                        value: 'contact-form',
                    },
                    {
                        title: 'Prospectus Form',
                        value: 'prospectus-form',
                    },
                ],
            },
            group: 'forms',
        },
        {
            name: 'termsAndConditions',
            title: 'Terms and Conditions',
            type: 'body',
            group: 'content',
        },
        {
            name: 'actionText',
            title: 'Action Text',
            description: 'Text for the submit button',
            type: 'string',
            group: 'content',
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
            name: 'formId',
        },
        prepare(selection: Record<string, any>) {
            return {
                title: selection.name,
                subtitle: 'Form',
            };
        },
    },
};
