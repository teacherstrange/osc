import groq from 'groq';
import { MODULE_TRUSTPILOT } from './modules/trustpilot';
import { MODULE_CAROUSEL } from './modules/carousel';

export const MODULES = groq`
modules[] {
    _type,
    (_type == "module.trustpilot") => {
        ${MODULE_TRUSTPILOT}
    },
    (_type == "module.carousel") => {
        ${MODULE_CAROUSEL}
    },
}
`;
