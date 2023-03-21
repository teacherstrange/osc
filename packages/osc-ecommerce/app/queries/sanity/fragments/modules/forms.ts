import groq from 'groq';

export const MODULE_FORMS = groq`
    _key,
    _type,
    formNameAndId,
    slideDirection,
    slideOut,
    slideOutText,
    termsAndConditions,
    titleAndDescription
`;
