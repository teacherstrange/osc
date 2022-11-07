import groq from 'groq';

export const REDIRECT = groq`
    *[_type == 'redirect' && source == $slug] {
        _id,
        source,
        statusCode,
        "destination": destination->{
            _type,
            "slug": coalesce(slug.current, store.slug.current)
        },
    }
`;
