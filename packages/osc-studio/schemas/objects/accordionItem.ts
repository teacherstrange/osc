export default {
    name: 'accordionItem',
    title: 'Accordion Item',
    type: 'object',
    fields: [
        {
            name: 'defaultOpen',
            title: 'Open by default',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: (Rule) => Rule.required()
        },
        {
            name: 'content',
            title: 'Content',
            type: 'module.content',
            validation: (Rule) => Rule.required()
        }
    ]
};
