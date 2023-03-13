import { DocumentIcon } from '@sanity/icons';

const FORMS = [{ type: 'form.contactForm' }, { type: 'form.prospectusForm' }];

export default {
    name: 'module.forms',
    title: 'Forms',
    type: 'object',
    icon: DocumentIcon,
    groups: [
        {
            name: 'forms',
            title: 'Forms',
        },
    ],
    fields: [{ name: 'form', title: 'Form', type: 'array', of: FORMS, group: 'forms' }],
    preview: {
        select: {
            name: 'form',
        },
        prepare(selection: Record<string, any>) {
            const form = selection.name;
            return {
                title: form[0]._type,
                subtitle: 'Form',
            };
        },
    },
};
