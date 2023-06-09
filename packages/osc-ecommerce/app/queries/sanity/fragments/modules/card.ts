import groq from 'groq';
import { PATHS } from '~/constants';
import { LINK_EXTERNAL } from '../linkExternal';
import { LINK_INTERNAL } from '../linkInternal';
import { MODULE_IMAGES } from './images';
import { ROW_SETTINGS } from './rowSettings';

export const MODULE_CARDS = groq`
    ...,
    card[] {
        _type == 'card.bio' => {
          _key,
          _type,
          reference->
        },
        _type == 'card.course' => {
          _key,
          _type,
          reference->
        },
        _type == 'card.collection' => {
          _key,
          _type,
          variant,
          reference->{
            store,
            theme {
                color,
                pattern,
            },
            "featuredImage": {
                ${MODULE_IMAGES}
            },
            "slug": "/${PATHS.COLLECTIONS}/" + store.slug.current,
          }
        },
        _type == 'card.post' => {
          _key,
          _type,
          backgroundColor,
          fullWidth,
          reference->{
            title,
            theme {
                color
            },
            "featuredImage": {
                ${MODULE_IMAGES}
            },
            modules[] {
                (_type == "module.hero") => {
                    slides[0] {
                        titleColor,
                        backgroundColor,
                        "image": {
                            ${MODULE_IMAGES}
                        }
                    }
                }
            },
            "slug": "/${PATHS.BLOG}/" + slug.current,
          },
        },
        _type == 'card.static' => {
            _key,
            _type,
            button {
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
            content,
            footer,
            heading,
            headingStyles {
                ...
            },
            image,
            showFooter,
            showSubHeading,
            subHeading
        },
    },
    ${ROW_SETTINGS}
`;
