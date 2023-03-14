export default {
    name: 'form.prospectusForm',
    title: 'Prospectus Form',
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
            type: 'string',
            group: 'content',
        },
    ],
};
