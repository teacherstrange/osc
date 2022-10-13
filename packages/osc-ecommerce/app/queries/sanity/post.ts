import groq from 'groq';
import { SEO } from './fragments/seo';

export const POST_QUERY = groq`
    *[ _type == "post" && slug.current == $slug ] {
        _id,
        _rev,
        _type,
        title,
        ${SEO}
    }
`;
