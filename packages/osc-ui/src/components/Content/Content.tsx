import type { PortableTextComponents } from '@portabletext/react';
import { PortableText as ReactPortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { Link } from '@remix-run/react';
import type { FC } from 'react';
import React from 'react';
import { useSpacing } from '../../hooks/useSpacing';
import type { Spacing, Themes } from '../../types';
import { classNames } from '../../utils/classNames';
import { Button, ButtonGroup } from '../Button/Button';
import { List, ListItem } from '../List/List';

import './content.scss';

interface ButtonProps {
    _key: string;
    _type: 'button';
    colour: Themes;
    externalLink?: {
        newWindow?: boolean;
        url: string;
    };
    file?: string;
    label: string;
    type: string;
    email?: string;
    slug?: string;
    textToCopy?: string;
}

export interface Props {
    align?: 'left' | 'centre' | 'right';
    backgroundColor?: string;
    className?: string;
    marginBottom?: Spacing;
    paddingBottom?: Spacing;
    paddingTop?: Spacing;
    textColor?: string;
    value: PortableTextBlock[];
    buttons?: ButtonProps[];
}

// This content component is built around the content that is exported from our Sanity studio.
// The portabletext component allows us to take the array generated and move through it, assiging the correct components to each child.
// https://github.com/portabletext/react-portabletext
const portableTextComponents: PortableTextComponents = {
    block: {
        h1: ({ children }) => <h1>{children}</h1>,
        h2: ({ children }) => <h2>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        h4: ({ children }) => <h4>{children}</h4>,
        h5: ({ children }) => <h5>{children}</h5>,
        h6: ({ children }) => <h6>{children}</h6>,
        normal: ({ children }) => <p>{children}</p>
    },
    list: {
        bullet: ({ children }) => <List variant="ul">{children}</List>,
        number: ({ children }) => <List variant="ol">{children}</List>
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

            return <Link to={path}>{children}</Link>;
        },
        annotationLinkExternal: ({ value, children }) => {
            return (
                <a href={value?.url} target={value?.newWindow ? '_blank' : null} rel="noreferrer">
                    {children}
                </a>
            );
        },
        annotationLinkEmail: ({ value, children }) => {
            const email = value?.email ? `mailto:${value?.email}` : undefined;

            return <a href={email}>{children}</a>;
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
        buttons,
        ...other
    } = props;

    // ? Perhaps better to simply apply the class and pass them as a value from Sanity?
    const alignClass = align ? `c-content__inner--${align}` : '';
    const marginBottomClass = useSpacing('margin', 'bottom', marginBottom);
    const paddingTopClass = useSpacing('padding', 'top', paddingTop);
    const paddingBottomClass = useSpacing('padding', 'bottom', paddingBottom);

    const classes = classNames(paddingTopClass, paddingBottomClass, marginBottomClass, className);

    return (
        <article
            className={classes ? classes : null}
            {...other}
            style={{
                backgroundColor: backgroundColor,
                color: textColor
            }}
        >
            <div className="c-content">
                <div className={`c-content__inner ${alignClass}`}>
                    <ReactPortableText value={value} components={portableTextComponents} />

                    {buttons && buttons.length > 0 ? (
                        <ButtonGroup>
                            {buttons.map((button) => {
                                const {
                                    _key,
                                    email,
                                    externalLink,
                                    file,
                                    label,
                                    slug,
                                    type,
                                    textToCopy
                                } = button;

                                switch (type) {
                                    case 'file':
                                        return (
                                            <Button key={_key} action="anchor" href={file}>
                                                {label}
                                            </Button>
                                        );

                                    case 'email':
                                        return (
                                            <Button
                                                key={_key}
                                                action="anchor"
                                                href={`mailto:${email}`}
                                            >
                                                {label}
                                            </Button>
                                        );

                                    case 'external':
                                        return (
                                            <Button
                                                key={_key}
                                                action="anchor"
                                                href={externalLink.url}
                                                target={externalLink.newWindow ? '_blank' : null}
                                            >
                                                {label}
                                            </Button>
                                        );

                                    case 'internal':
                                        return (
                                            <Button key={_key} action="link" to={slug}>
                                                {label}
                                            </Button>
                                        );

                                    case 'copy to clipboard':
                                        return (
                                            <Button
                                                key={_key}
                                                action="copy"
                                                textToCopy={textToCopy}
                                            >
                                                {label}
                                            </Button>
                                        );

                                    default:
                                        return <Button key={_key}>{label}</Button>;
                                }
                            })}
                        </ButtonGroup>
                    ) : null}
                </div>
            </div>
        </article>
    );
};
