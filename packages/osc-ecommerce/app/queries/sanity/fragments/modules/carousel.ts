import groq from 'groq';
import { MODULE_IMAGES } from './images';

export const MODULE_CAROUSEL = groq`
    _key,
    _type,
    carouselName,
    slides[] {
        "image": {
            ${MODULE_IMAGES}
        }
    },
    settings
`;
