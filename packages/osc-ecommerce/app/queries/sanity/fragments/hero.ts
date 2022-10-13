import groq from 'groq';
import { IMAGE } from './image';
import { LINK_EXTERNAL } from './linkExternal';
import { LINK_INTERNAL } from './linkInternal';
import { PORTABLE_TEXT } from './portableText';

export const HERO = groq`
    showHero,
    hero {
        body[] {
            ${PORTABLE_TEXT}
        },
        image {
            _type,
            ${IMAGE}
        },
        links[] {
            (_type == 'linkInternal') => {
                title,
                ${LINK_INTERNAL}
            },
            (_type == 'linkExternal') => {
                ${LINK_EXTERNAL}
            }
        },
    }
`;
