import groq from 'groq';

export const MODULE_RECOMMENDED_PRODUCTS = groq`
    _key,
    _type,
    backgroundColor,
    paddingBottom,
    paddingTop,
    marginBottom,
    heading,
    numberOfProducts,
    carouselSettings
`;
