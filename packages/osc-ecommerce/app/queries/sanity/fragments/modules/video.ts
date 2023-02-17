import groq from 'groq';

export const MODULE_VIDEO = groq`
    _key,
    _type,
    videoImage {
        "alt": alt,
        "src": coalesce(image.derived[0].secure_url, image.secure_url),
        "width": image.width,
        "height": image.height,
        "responsiveImages": responsiveImages[] {
            _key,
            _type,
            "src": coalesce(derived[0].secure_url, secure_url),
            "width": width,
            "height": height,
        }
    },
    videoSettings,
    videoType,
    videoUrl,
    content
`;
