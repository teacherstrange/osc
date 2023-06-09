import groq from 'groq';
import { ROW_SETTINGS } from './rowSettings';

export const MODULE_RECOMMENDED_PRODUCTS = groq`
    _key,
    _type,
    heading,
    numberOfProducts,
    carouselSettings,
    ${ROW_SETTINGS}
`;
