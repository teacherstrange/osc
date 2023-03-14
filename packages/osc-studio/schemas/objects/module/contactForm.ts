export default {
    name: 'form.contactForm',
    title: 'Contact Form',
    type: 'object',
    groups: [
        {
            name: 'content',
            title: 'Content',
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
    ],
    preview: {
        prepare() {
            return { title: 'Contact Form' };
        },
    },
};
