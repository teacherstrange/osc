import React from 'react';
import type { FC } from 'react';
import { Link } from '@remix-run/react';
import type { PortableTextBlock } from '@portabletext/types';
import { PortableText as ReactPortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';
import { Link as ChakraLink, Box } from '@chakra-ui/react';
import { List } from '../List/List';
import { ListItem } from '../List/ListItem';

import './content.scss';

type SpacingOptions = 10 | 50 | 110 | 210 | '';
type ColorOptions = 'primary' | 'secondary' | 'tertiary';

export interface Props {
    align?: 'left' | 'centre' | 'right';
    backgroundColor?: ColorOptions;
    className?: string;
    marginBottom?: SpacingOptions;
    paddingBottom?: SpacingOptions;
    paddingTop?: SpacingOptions;
    textColor?: ColorOptions;
    value: PortableTextBlock[];
}

// This content component is built around the content that is exported from our Sanity studio.
// The portabletext component allows us to take the array generated and move through it, assiging the correct components to each child.
// https://github.com/portabletext/react-portabletext
const portableTextComponents: PortableTextComponents = {
    block: {
        h1: ({ children }) => <h1 className="t-font-alpha">{children}</h1>,
        h2: ({ children }) => <h2 className="t-font-beta">{children}</h2>,
        h3: ({ children }) => <h3 className="t-font-gamma">{children}</h3>,
        h4: ({ children }) => <h4 className="t-font-delta">{children}</h4>,
        h5: ({ children }) => <h5 className="t-font-epsilon">{children}</h5>,
        h6: ({ children }) => <h6 className="t-font-zeta">{children}</h6>,
        normal: ({ children }) => <p>{children}</p>
    },
    list: {
        bullet: ({ children }) => <List type="ul">{children}</List>,
        number: ({ children }) => <List type="ol">{children}</List>
    },
    listItem: {
        bullet: ({ children }) => <ListItem>{children}</ListItem>,
        number: ({ children }) => <ListItem>{children}</ListItem>
    },
    marks: {
        annotationLinkInternal: ({ value, children }) => {
            // If there is no slug fallback to the home path
            // This helps to stop Remix throwing when links are being applied in preview
            const path = value?.slug ? value?.slug : '/';

            return (
                // This Link is a Remix Link component
                <ChakraLink as={Link} to={path}>
                    {children}
                </ChakraLink>
            );
        },
        annotationLinkExternal: ({ value, children }) => {
            return (
                <ChakraLink href={value?.url} isExternal={value?.newWindow} rel="noreferrer">
                    {children}
                </ChakraLink>
            );
        },
        annotationLinkEmail: ({ value, children }) => {
            const email = value?.email ? `mailto:${value?.email}` : undefined;

            return <ChakraLink href={email}>{children}</ChakraLink>;
        }
    },
    types: {
        image: ({ value }) => {
            const { altText, dimensions, url } = value?.asset;

            return (
                <img src={url} alt={altText} width={dimensions.width} height={dimensions.height} />
            );
        }
    }
};

// TODO: sb - buttons
// TODO: sb - images
export const Content: FC<Props> = (props: Props) => {
    const {
        align = 'left',
        backgroundColor = 'primary',
        className,
        marginBottom,
        paddingTop,
        paddingBottom,
        textColor = 'secondary',
        value,
        ...other
    } = props;

    // ? Perhaps better to simply apply the class and pass them as a value from Sanity?
    const alignClass = align ? `c-content__inner--${align}` : '';
    const marginBottomClass = marginBottom ? `u-mb-${marginBottom}` : '';
    const paddingTopClass = paddingTop ? `u-pt-${paddingTop}` : '';
    const paddingBottomClass = paddingBottom ? `u-pb-${paddingBottom}` : '';

    const classes = `${paddingTopClass} ${paddingBottomClass} ${marginBottomClass} ${
        className ? className : ''
    }`.trim();

    return (
        // Am using Chakra's Box component here so we can pass the background colour prop from our theme correctly
        <Box
            as="article"
            backgroundColor={backgroundColor}
            color={textColor}
            className={classes}
            {...other}
        >
            <div className="c-content">
                <div className={`c-content__inner ${alignClass}`}>
                    <ReactPortableText value={value} components={portableTextComponents} />
                </div>
            </div>
        </Box>
    );
};
