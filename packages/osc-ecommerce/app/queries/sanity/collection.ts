import groq from 'groq';
import { SEO } from './fragments/seo';

export const COLLECTION_QUERY = groq`
    *[ _type == "collection" && store.slug.current == $slug ] {
        _id,
        _rev,
        _type,
        title,
        store,
        ${SEO}
    }
`;
