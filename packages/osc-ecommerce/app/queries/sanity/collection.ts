import groq from 'groq';
import { MODULES } from './fragments/modules';

export const COLLECTION_QUERY = groq`
    *[ _type == "collection" && store.slug.current == $slug ] {
        _id,
        _rev,
        _type,
        store,
        ${MODULES}
    }
`;
