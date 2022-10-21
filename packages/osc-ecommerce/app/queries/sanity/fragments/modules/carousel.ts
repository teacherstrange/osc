import groq from 'groq';

// pick the info you want
// TODO: ak add fields from props
export const MODULE_CAROUSEL = groq`
    _key,
    height,
    active,
    startIndex,
    mediaArray[] {
      ...,
      image {
        asset-> {
          url,
          _id
        }
      }
    },
    delay,
    slidesPerPage,
    slideGap,
    axis,
    loop,
`;
