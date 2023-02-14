import groq from 'groq';
import { MODULE_ACCORDION } from './modules/accordion';
import { MODULE_CARDS } from './modules/card';
import { MODULE_CAROUSEL } from './modules/carousel';
import { MODULE_CONTENT } from './modules/content';
import { MODULE_CONTENT_MEDIA } from './modules/contentMedia';
import { MODULE_FORMS } from './modules/forms';
import { MODULE_HERO } from './modules/hero';
import { MODULE_IMAGES } from './modules/images';
import { MODULE_TEXT_GRID } from './modules/textGrid';
import { MODULE_TRUSTPILOT } from './modules/trustpilot';
import { MODULE_VIDEO } from './modules/video';

export const MODULES = groq`
modules[] {
    _type,
    (_type == "module.accordion") => {
        ${MODULE_ACCORDION}
    },
    (_type == "module.trustpilot") => {
        ${MODULE_TRUSTPILOT}
    },
    (_type == "module.cards") => {
        ${MODULE_CARDS}
    },
    (_type == "module.carousel") => {
        ${MODULE_CAROUSEL}
    },
    (_type == "module.content") => {
        ${MODULE_CONTENT}
    },
    (_type == "module.contentMedia") => {
        ${MODULE_CONTENT_MEDIA}
    },
    (_type == "module.images") => {
        ${MODULE_IMAGES}
    },
    (_type == "module.hero") => {
        ${MODULE_HERO}
    },
    (_type == "module.textGrid") => {
        ${MODULE_TEXT_GRID}
    },
    (_type == "module.video") => {
      ${MODULE_VIDEO}
    },
    (_type == "module.forms") => {
      ${MODULE_FORMS}
    }
}
`;
