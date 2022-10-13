import groq from 'groq';

export const SEO = groq`
  "seo": {
    "description": seo.description,
    "title": coalesce(seo.title, title)
  }
`;
