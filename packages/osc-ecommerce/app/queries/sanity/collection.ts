import groq from 'groq';
import { MODULES } from './fragments/modules';
import { MODULE_IMAGES } from './fragments/modules/images';
import { SEO } from './fragments/seo';

export const COLLECTION_QUERY = groq`
    *[ _type == "collection" && store.slug.current == $slug && !(_id in path("drafts.**")) ] {
        _id,
        _rev,
        _type,
        store,
        theme {
            color,
            pattern,
        },
        "featuredImage": {
            ${MODULE_IMAGES}
        },
        ${MODULES},
        ${SEO}
    }
`;

export const HIGHLIGHTED_COLLECTIONS_IMAGES_QUERY = groq`
    *[ _type == "collection" && store.slug.current == $highlightCategoryOne || store.slug.current == $highlightCategoryTwo] {"image": ${MODULE_IMAGES}, "slug": store.slug.current}
`;
