import groq from 'groq';
import { MODULES } from './fragments/modules';
import { SEO } from './fragments/seo';

export const AWARDING_BODIES_QUERY = groq`
    *[ _type == "awardingBodyPages" && slug.current == $slug && !(_id in path("drafts.**")) ] {
        _id,
        _rev,
        _type,
        title,
        ${MODULES},
        ${SEO}
    }
`;
