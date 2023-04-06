import groq from 'groq';
import { PATHS } from '~/constants';

export const buildUrls = groq`
    (_type == "collection") => {
        "slug": "/${PATHS.COLLECTIONS}/" + store.slug.current,
        },
    (_type == "home") => {
        "slug": "${PATHS.HOME}",
    },
    (_type == "blog") => {
        "slug": '/' + slug.current,
    },
    (_type == "page") => {
        "slug": '/' + slug.current,
    },
    (_type == "post") => {
        "slug": "/${PATHS.BLOG}/" + slug.current,
    },
    (_type == "product") => {
        "slug": "/${PATHS.PRODUCTS}/" + store.slug.current,
    }
`;
