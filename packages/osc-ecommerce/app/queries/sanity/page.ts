import groq from 'groq';
import { SEO } from './fragments/seo';

export const PAGE_QUERY = groq`
    *[ _type == "page" && slug.current == $slug ] {
        _id,
        _rev,
        _type,
        title,
        ${SEO}
    }
`;
