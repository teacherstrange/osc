import groq from 'groq';

export const ROW_SETTINGS = groq`
    rowSettings {
        _type,
        backgroundColor,
        paddingBottom,
        paddingTop,
        marginBottom,
        container
    }
`;
