import groq from 'groq';
import { MODULE_CONTENT } from './content';
import { ROW_SETTINGS } from './rowSettings';

export const MODULE_TEXT_GRID = groq`
    _key,
    _type,
    heading,
    hasInlineHeading,
    marginBottom,
    paddingBottom,
    paddingTop,
    items[] {
        _key,
        content {
            ${MODULE_CONTENT}
        },
        icon,
    },
    ${ROW_SETTINGS},
`;
