import type { PortableTextComponents } from '@portabletext/react';
import { PortableText as ReactPortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { Link } from '@remix-run/react';
import React from 'react';
import colors from '../../../../../tokens/colors';
import sizes from '../../../../../tokens/fluid-scale';
import typography from '../../../../../tokens/typography';
import { useSpacing } from '../../hooks/useSpacing';
import type { Maybe, Spacing } from '../../types';
import { classNames } from '../../utils/classNames';
import { Button, ButtonGroup, CopyButton } from '../Button/Button';
import { Image } from '../Image/Image';
import { List, ListItem } from '../List/List';

import './content.scss';

export interface ButtonProps {
    _key: string;
    _type: string;
    externalLink?: {
        newWindow?: boolean;
        url?: string;
    };
    file?: string;
    label: string;
    reference?: object;
    type: string;
    email?: string;
    slug?: string;
    telephone?: string;
    textToCopy?: string;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary'; // TODO: This and the button component should share this
}

export interface Props {
    align?: 'left' | 'centre' | 'right';
    backgroundColor?: Maybe<string>;
    className?: string;
    marginBottom?: Maybe<Spacing>;
    paddingBottom?: Maybe<Spacing>;
    paddingTop?: Maybe<Spacing>;
    value: PortableTextBlock[];
    buttons?: ButtonProps[];
}

// Create the decorator markup
const setDecorators = () => {
    const decorator = {};

    Object.keys(colors.default).forEach((color) => {
        decorator[`span u-color-${color}`] = ({ children }) => {
            return <span className={`u-color-${color}`}>{children}</span>;
        };
    });

    sizes.steps.forEach((size) => {
        decorator[`span t-font-${size}`] = ({ children }) => {
            return <span className={`t-font-${size}`}>{children}</span>;
        };
    });

    Object.keys(typography)
        .filter((type) => type.includes('font'))
        .forEach((type) => {
            // Exclude the -font- prefix as it's part of the object key
            decorator[`span t-${type}`] = ({ children }) => {
                return <span className={`t-${type}`}>{children}</span>;
            };
        });

    return decorator;
};

// This content component is built around the content that is exported from our Sanity studio.
// The portabletext component allows us to take the array generated and move through it, assigning the correct components to each child.
// https://github.com/portabletext/react-portabletext
const portableTextComponents: PortableTextComponents = {
    block: {
        h1: ({ children }) => <h1>{children}</h1>,
        h2: ({ children }) => <h2>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        h4: ({ children }) => <h4>{children}</h4>,
        h5: ({ children }) => <h5>{children}</h5>,
        h6: ({ children }) => <h6>{children}</h6>,
        normal: ({ children }) => <p>{children}</p>,
    },
    list: {
        bullet: ({ children }) => <List variant="ul">{children}</List>,
        number: ({ children }) => <List variant="ol">{children}</List>,
    },
    listItem: {
        bullet: ({ children }) => <ListItem>{children}</ListItem>,
        number: ({ children }) => <ListItem>{children}</ListItem>,
    },
    marks: {
        ...setDecorators(),
        'strong u-text-med': ({ children }) => {
            return <strong className="u-text-med">{children}</strong>;
        },
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
        },
    },
    types: {
        'module.images': ({ value }) => {
            const { alt, image } = value;
            const src = image.image.derived
                ? image.image.derived[0].secure_url
                : image.image.secure_url;
            const { width, height } = image.image;

            return <Image alt={alt} src={src} width={width} height={height} />;
        },
    },
};

// TODO: sb - images
export const Content = (props: Props) => {
    const {
        align = 'left',
        backgroundColor,
        className,
        marginBottom,
        paddingTop,
        paddingBottom,
        value,
        buttons,
        ...other
    } = props;

    // ? Perhaps better to simply apply the class and pass them as a value from Sanity?
    const alignClass = align ? `c-content__inner--${align}` : '';
    const marginBottomClass = useSpacing('margin', 'bottom', marginBottom);
    const paddingTopClass = useSpacing('padding', 'top', paddingTop);
    const paddingBottomClass = useSpacing('padding', 'bottom', paddingBottom);

    const classes = classNames(
        'c-content',
        paddingTopClass,
        paddingBottomClass,
        marginBottomClass,
        backgroundColor && `u-bg-color-${backgroundColor}`,
        className
    );

    return (
        <div className={classes ? classes : null} {...other}>
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
                                telephone,
                                type,
                                textToCopy,
                            } = button;

                            switch (type) {
                                case 'file':
                                    return (
                                        <Button key={_key} as="a" href={file} download>
                                            {label}
                                        </Button>
                                    );

                                case 'email':
                                    return (
                                        <Button key={_key} as="a" href={`mailto:${email}`}>
                                            {label}
                                        </Button>
                                    );

                                case 'telephone':
                                    return (
                                        <Button key={_key} as="a" href={`tel:${telephone}`}>
                                            {label}
                                        </Button>
                                    );

                                case 'external':
                                    return (
                                        <Button
                                            key={_key}
                                            as="a"
                                            href={externalLink.url}
                                            target={externalLink.newWindow ? '_blank' : null}
                                        >
                                            {label}
                                        </Button>
                                    );

                                case 'internal':
                                    return (
                                        <Button key={_key} as="link" to={slug}>
                                            {label}
                                        </Button>
                                    );

                                case 'copy to clipboard':
                                    return (
                                        <CopyButton key={_key} textToCopy={textToCopy}>
                                            {label}
                                        </CopyButton>
                                    );

                                default:
                                    return <Button key={_key}>{label}</Button>;
                            }
                        })}
                    </ButtonGroup>
                ) : null}
            </div>
        </div>
    );
};
