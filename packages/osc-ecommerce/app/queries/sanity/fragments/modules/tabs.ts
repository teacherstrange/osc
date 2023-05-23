import groq from 'groq';
import { CHILD_MODULES } from '../childModules';
import { ROW_SETTINGS } from './rowSettings';

export const MODULE_TABS = groq`
    _key,
    _type,
    marginBottom,
    marginBottom,
    paddingBottom,
    paddingTop,
    tabItem[] {
        _type,
        _key,
        title,
        modules[] {
            _type,
            ${CHILD_MODULES}
        }
    },
    ${ROW_SETTINGS}
`;
