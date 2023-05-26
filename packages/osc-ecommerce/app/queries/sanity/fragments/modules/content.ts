import groq from 'groq';
import { IMAGE } from '../image';
import { LINK_EXTERNAL } from '../linkExternal';
import { LINK_INTERNAL } from '../linkInternal';
import { ROW_SETTINGS } from './rowSettings';

export const MODULE_CONTENT = groq`
    _key,
    horizontalAlignment,
    fullWidth,
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
    buttons[] {
        ...,
        (type == "file") => {
          "file": file.asset->url
        },
        (type == "internal") => {
             ${LINK_INTERNAL}
        },
        (type == "external") => {
            ${LINK_EXTERNAL}
        }
    },
    ${ROW_SETTINGS}
`;
