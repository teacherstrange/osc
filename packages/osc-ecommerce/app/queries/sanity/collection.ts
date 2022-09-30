import groq from 'groq';

export const COLLECTION_QUERY = groq`
    *[ _type == "collection" && store.slug.current == $slug ] {
        _id,
        _rev,
        _type,
        store {
            id,
            gid,
            title,
            slug,
            priceRange,
            options
        }
    }
`;
