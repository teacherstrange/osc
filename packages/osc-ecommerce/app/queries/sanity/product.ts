import groq from 'groq';
import { MODULES } from './fragments/modules';
import { SEO } from './fragments/seo';

export const PRODUCT_QUERY = groq`
    *[ _type == "product" && store.slug.current == $slug && !(_id in path("drafts.**")) ] {
        _id,
        _rev,
        _type,
        store,
        upperContent,
        // Merge theme query into product
        ...(*[_type == "collection" && store.slug.current == $collection][0] {
            theme
        }),
        ${MODULES},
        ${SEO}
    }
`;
