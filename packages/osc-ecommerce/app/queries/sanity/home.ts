import groq from 'groq';
import { SEO } from './fragments/seo';

export const HOME_QUERY = groq`
    *[ _type == "home" ] {
        _id,
        _rev,
        _type,
        title,
        ${SEO}
    }
`;
