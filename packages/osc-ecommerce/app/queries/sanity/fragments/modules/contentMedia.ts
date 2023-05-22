import groq from 'groq';
import { MODULE_CONTENT } from './content';
import { MODULE_IMAGES } from './images';
import { ROW_SETTINGS } from './rowSettings';

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
                },
                (_type == 'module.forms') => {
                    _key,
                    _type,
                    "formName": string::split(formNameAndId, ", ")[0],
                    "formId": string::split(formNameAndId, ", ")[1],
                    marginBottom,
                    paddingBottom,
                    paddingTop,
                },
            }
        }
    },
    ${ROW_SETTINGS}
`;
