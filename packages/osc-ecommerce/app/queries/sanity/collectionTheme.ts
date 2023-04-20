import groq from 'groq';

export const COLLECTION_THEME_QUERY = groq`
    *[ _type == "collection" && store.slug.current == $slug ] {
        _id,
        theme
    }
`;
