import groq from 'groq';

export const ROW_SETTINGS = groq`
    settings {
        _type,
        backgroundColor,
        paddingBottom,
        paddingTop,
        marginBottom,
        container
    }
`;
