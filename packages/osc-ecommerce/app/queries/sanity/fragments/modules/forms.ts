import groq from 'groq';

export const MODULE_FORMS = groq`
    _key,
    _type,
    actionText,
    formId,
    slideDirection,
    slideOut,
    slideOutText,
    termsAndConditions,
    titleAndDescription
`;
