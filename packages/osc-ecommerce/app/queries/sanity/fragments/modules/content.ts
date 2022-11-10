import groq from 'groq';
import { IMAGE } from '../image';
import { LINK_EXTERNAL } from '../linkExternal';
import { LINK_INTERNAL } from '../linkInternal';

export const MODULE_CONTENT = groq`
    _key,
    "backgroundColor": backgroundColor.value ,
    horizontalAlignment,
    marginBottom,
    paddingBottom,
    paddingTop,
    "textColor": textColor.value,
    body[] {
        ...,
    ${IMAGE},
    markDefs[] {
        ...,
        (_type == 'annotationLinkInternal') => {
            ${LINK_INTERNAL}
        },
        (_type == 'annotationLinkExternal') => {
            ${LINK_EXTERNAL}
        }
    }
    },
`;
