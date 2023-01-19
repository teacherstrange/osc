import groq from 'groq';

const buildUrls = groq`
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
    }
`;

export const NAV_QUERY = groq`
    *[ _type == "navigation" && navigationId.current == $id && !(_id in path("drafts.**")) ] {
        ...,
        "navigationId": navigationId.current,
        navigationItem[] {
            ...,
            "internalLink": internalLink-> {
                "title": coalesce(store.title, title),
                ${buildUrls}
            },
            items[] {
                ...,
                items[] {
                    ...,
                    items[] {
                        ...,
                        "internalLink": internalLink-> {
                            "title": coalesce(store.title, title),
                            ${buildUrls}
                        }
                    },
                    "internalLink": internalLink-> {
                        "title": coalesce(store.title, title),
                        ${buildUrls}
                    },
                }
            }
        }
    }
`;
