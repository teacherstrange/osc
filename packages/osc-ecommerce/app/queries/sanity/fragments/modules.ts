import groq from 'groq';
import { CHILD_MODULES } from './childModules';
import { MODULE_TABS } from './modules/tabs';

export const MODULES = groq`
modules[] {
    _type,
    ${CHILD_MODULES},
    (_type == "module.tabs") => {
      ${MODULE_TABS}
    }
}
`;
