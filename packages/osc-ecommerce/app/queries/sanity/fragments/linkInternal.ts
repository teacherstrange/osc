import groq from 'groq';

export const LINK_INTERNAL = groq`
    _key,
    _type,
    ...reference->{
        "documentType": _type,
        (_type == "collection") => {
            "slug": "/collections/" + store.slug.current,
            },
        (_type == "home") => {
            "slug": "/",
        },
        (_type == "blog") => {
            "slug": '/' + slug.current,
        },
        (_type == "page") => {
            "slug": '/' + slug.current,
        },
        (_type == "post") => {
            "slug": "/blog/" + slug.current,
        },
        (_type == "product") => {
            "slug": "/products/" + store.slug.current,
        },
    }
`;
