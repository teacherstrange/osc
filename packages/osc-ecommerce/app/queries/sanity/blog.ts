import groq from 'groq';
import { SEO } from './fragments/seo';

export const BLOG_QUERY = groq`
    *[ _type == "blog" ] {
        _id,
        _rev,
        _type,
        title,
        ${SEO}
    }
`;
