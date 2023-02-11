import groq from 'groq';
import { MODULE_CONTENT } from './content';

export const MODULE_TEXT_GRID = groq`
    _key,
    _type,
    heading,
    hasInlineHeading,
    items[] {
        _key,
        content {
            ${MODULE_CONTENT}
        },
        icon,
    }
`;
