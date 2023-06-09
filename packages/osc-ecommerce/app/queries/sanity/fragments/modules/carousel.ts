import groq from 'groq';
import { MODULE_IMAGES } from './images';
import { ROW_SETTINGS } from './rowSettings';

export const MODULE_CAROUSEL = groq`
    _key,
    _type,
    carouselName,
    slides[] {
        "image": {
            ${MODULE_IMAGES}
        }
    },
    settings,
    ${ROW_SETTINGS}
`;
