import groq from 'groq';
import { MODULE_CONTENT } from './content';
import { MODULE_IMAGES } from './images';

export const MODULE_CONTENT_MEDIA = groq`
    _key,
    _type,
    layout,
    marginBottom,
    paddingBottom,
    paddingTop,
    carouselName,
    carouselSettings,
    slides[] {
        _key,
        _type,
        content {
            ${MODULE_CONTENT}
        },
        contentAlignment,
        layoutDirection,
        layoutGrid,
        media {
            carouselName,
            carouselSettings,
            mediaType[] {
                (_type == "contentMediaImage") => {
                    imageFit,
                    "image": {
                        ${MODULE_IMAGES}
                    }
                }
            }
        }
    }
`;
