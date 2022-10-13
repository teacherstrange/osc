import groq from 'groq';
import { MODULES } from './fragments/modules';
import { SEO } from './fragments/seo';

export const POST_QUERY = groq`
    *[ _type == "post" && slug.current == $slug ] {
        _id,
        _rev,
        _type,
        title,
        ${MODULES},
        ${SEO}
    }
`;
