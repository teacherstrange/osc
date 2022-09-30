import groq from 'groq';
import { LINK_EXTERNAL } from './fragments/linkExternal';
import { LINK_INTERNAL } from './fragments/linkInternal';
import { PORTABLE_TEXT } from './fragments/portableText';
import { SEO } from './fragments/seo';

export const SETTINGS_QUERY = groq`
    *[ _type == "settings" ] {
        _id,
        _rev,
        _type,
        menu {
            links[] {
                (_type == 'linkInternal') => {
                    title,
                    ${LINK_INTERNAL}
                },
                (_type == 'linkExternal') => {
                    ${LINK_EXTERNAL}
                }
            },
        },
        footer {
            _type,
            links[] {
                (_type == 'linkInternal') => {
                    title,
                    ${LINK_INTERNAL}
                },
                (_type == 'linkExternal') => {
                    ${LINK_EXTERNAL}
                }
            },
            text[] {
                ${PORTABLE_TEXT}
            }
        },
        ${SEO}
    }
`;
