import groq from 'groq';
import { MODULES } from './fragments/modules';
import { SEO } from './fragments/seo';

export const COLLECTION_QUERY = groq`
    *[ _type == "collection" && store.slug.current == $slug && !(_id in path("drafts.**")) ] {
        _id,
        _rev,
        _type,
        store,
        ${MODULES},
        ${SEO}
    }
`;
