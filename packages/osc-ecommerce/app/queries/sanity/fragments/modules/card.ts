import groq from 'groq';
import { LINK_EXTERNAL } from '../linkExternal';
import { LINK_INTERNAL } from '../linkInternal';

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
          reference->
        },
        _type == 'card.post' => {
          _key,
          _type,
          backgroundColor,
          fullWidth,
          reference->
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
    }

`;
