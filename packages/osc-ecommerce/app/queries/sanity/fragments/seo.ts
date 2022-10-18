import groq from 'groq';

export const SEO = groq`
  "seo": {
    "description": seo.description,
    "title": coalesce(seo.title, title),
    "image": seo.image.asset->{
      url,
      "dimensions": metadata.dimensions
    },
    "canonicalUrl": seo.canonicalUrl,
    "robots": seo.robots
  }
`;
