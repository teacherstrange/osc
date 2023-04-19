import groq from 'groq';
import { CHILD_MODULES } from '../childModules';

export const MODULE_TABS = groq`
    _key,
    _type,
    marginBottom,
    marginBottom,
    paddingBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    tabItem[] {
        _type,
        _key,
        title,
        modules[] {
            _type,
            ${CHILD_MODULES}
        }
    }
`;
