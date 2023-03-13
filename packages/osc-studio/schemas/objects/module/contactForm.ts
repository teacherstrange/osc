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
            name: 'title',
            title: 'Title',
            group: 'content',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            group: 'content',
            type: 'body',
        },
        {
            name: 'termsAndConditions',
            title: 'Terms and Conditions',
            type: 'body',
            group: 'content',
        },
    ],
    preview: {
        prepare() {
            return { title: 'Contact Form' };
        },
    },
};
