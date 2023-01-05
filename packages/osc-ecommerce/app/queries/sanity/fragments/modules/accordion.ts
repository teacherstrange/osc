import groq from 'groq';
import { MODULE_CONTENT } from './content';

export const MODULE_ACCORDION = groq`
    _key,
    _type,
    accordionHeadingLevels,
    accordionItem[] {
        _key,
        _type,
        defaultOpen,
        heading,
        content {
            ${MODULE_CONTENT}
        }
    },
    content {
        ${MODULE_CONTENT}
    }
`;
