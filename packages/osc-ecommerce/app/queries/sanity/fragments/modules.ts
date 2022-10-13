import groq from 'groq';
import { MODULE_TRUSTPILOT } from './modules/trustpilot';

export const MODULES = groq`
modules[] {
    _type,
    (_type == "module.trustpilot") => {
        ${MODULE_TRUSTPILOT}
    },
}
`;
