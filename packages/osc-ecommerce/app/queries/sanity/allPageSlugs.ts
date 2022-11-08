import groq from 'groq';

export const ALL_PAGE_SLUGS = groq`
    *[slug != null || store.slug != null] {
        _id,
        _type,
        _updatedAt,
        "slug": coalesce(slug.current, store.slug.current)
    }
`;
