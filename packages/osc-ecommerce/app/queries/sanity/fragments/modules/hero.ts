import groq from 'groq';
import { CAROUSEL_SETTINGS } from '../carouselSettings';
import { MODULE_CONTENT } from './content';
import { MODULE_IMAGES } from './images';

export const MODULE_HERO = groq`
    _key,
    _type,
    carouselName,
    carouselSettings {
        ${CAROUSEL_SETTINGS}
    },
    slides[] {
        _key,
        _type,
        backgroundColor,
        content {
            ${MODULE_CONTENT}
        },
        "image": {
            ${MODULE_IMAGES}
        },
        title,
        titleColor,
        variant,
        flourishes
    }
`;
