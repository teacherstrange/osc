import groq from 'groq';
import { PORTABLE_TEXT } from '../portableText';

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
            body[] {
                ${PORTABLE_TEXT}
            }
        }
    },
    content {
        body[] {
            ${PORTABLE_TEXT}
        }
    }
`;
