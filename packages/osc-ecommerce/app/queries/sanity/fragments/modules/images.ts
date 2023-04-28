import groq from 'groq';

export const MODULE_IMAGES = groq`
    _key,
    _type,
    "alt": image.alt,
    "src": coalesce(image.image.derived[0].secure_url, image.image.secure_url),
    "width": image.image.width,
    "height": image.image.height,
    "responsiveImages": image.responsiveImages[] {
        _key,
        _type,
        "src": coalesce(image.derived[0].secure_url, image.secure_url),
        "width": image.width,
        "height": image.height,
    },
    "imageStyles": image.imageStyles
`;
