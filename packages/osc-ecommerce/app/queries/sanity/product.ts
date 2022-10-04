import groq from 'groq';
import { MODULES } from './fragments/modules';

export const PRODUCT_QUERY = groq`
    *[ _type == "product" && store.slug.current == $slug ] {
        _id,
        _rev,
        _type,
        store {
            id,
            gid,
            title,
            slug,
            priceRange,
            variants[]{
                _key,
                _ref
            }
        },
        ${MODULES},
    }
`;
