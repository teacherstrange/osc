import groq from 'groq';
import { MODULES } from './fragments/modules';
import { SEO } from './fragments/seo';

export const BLOG_QUERY = groq`
    *[ _type == "blog" && !(_id in path("drafts.**")) ] {
        _id,
        _rev,
        _type,
        title,
        ${MODULES},
        ${SEO}
    }
`;
