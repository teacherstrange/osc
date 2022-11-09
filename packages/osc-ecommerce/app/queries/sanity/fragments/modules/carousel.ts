import groq from 'groq';
import { MODULE_IMAGES } from './images';

// pick the info you want
// TODO: ak add fields from props
export const MODULE_CAROUSEL = groq`
    _key,
    height,
    active,
    startIndex,
    mediaArray[] {
      ${MODULE_IMAGES}
    },
    delay,
    slidesPerPage,
    slideGap,
    axis,
    loop,
`;
