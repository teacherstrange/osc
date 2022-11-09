import groq from 'groq';
import { MODULE_CAROUSEL } from './modules/carousel';
import { MODULE_CONTENT } from './modules/content';
import { MODULE_IMAGES } from './modules/images';
import { MODULE_TRUSTPILOT } from './modules/trustpilot';

export const MODULES = groq`
modules[] {
    _type,
    (_type == "module.trustpilot") => {
        ${MODULE_TRUSTPILOT}
    },
    (_type == "module.carousel") => {
        ${MODULE_CAROUSEL}
    },
    (_type == "module.content") => {
        ${MODULE_CONTENT}
    },
    (_type == "module.images") => {
        ${MODULE_IMAGES}
    },
}
`;
