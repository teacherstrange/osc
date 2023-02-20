import type { ReactNode } from 'react';
import React from 'react';
import { useModifier } from '../../hooks/useModifier';
import type { Alignments, Columns } from '../../types';
import { classNames } from '../../utils/classNames';

import './content-media.scss';

interface SharedProps {
    /**
     * The content of the ContentMedia
     */
    children: ReactNode;
    /**
     * Custom class
     */
    className?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Content Media
 * -----------------------------------------------------------------------------------------------*/
export interface ContentMediaProps extends SharedProps {
    /**
     * Sets whether the media appears above the content or below it on small screens
     * @default auto
     */
    mobileMediaPosition?: 'auto' | 'above' | 'below';
}

export const ContentMedia = (props: ContentMediaProps) => {
    const { children, className, mobileMediaPosition = 'auto' } = props;

    const imgPositionModifier = useModifier('c-content-media', `media-pos-${mobileMediaPosition}`);

    const classes = classNames('c-content-media', 'o-grid', imgPositionModifier, className);

    return <div className={classes}>{children}</div>;
};

/* -------------------------------------------------------------------------------------------------
 * Content Media Block
 * -----------------------------------------------------------------------------------------------*/
interface ContentMediaBlockProps extends SharedProps {
    /**
     * Vertically align the item in the grid
     * @default start
     */
    align?: Alignments;
    /**
     * Sets the number of columns the item should span on large screens
     * @default 6
     */
    cols?: Columns;
    /**
     * The content or media variant
     */
    variant: 'content' | 'media';
}

export const ContentMediaBlock = (props: ContentMediaBlockProps) => {
    const { align = 'center', children, className, cols = 6, variant } = props;
    const breakpoint = '@tab';

    const alignmentClass = align ? `u-self-${align}` : '';

    const classes = classNames(
        'c-content-media__block',
        `c-content-media__${variant}`,
        'o-grid__col--12',
        `o-grid__col--${cols}${breakpoint}`,
        alignmentClass,
        className
    );

    return <div className={classes}>{children}</div>;
};

/* -------------------------------------------------------------------------------------------------
 * Content Media FormContainer
 * -----------------------------------------------------------------------------------------------*/
interface ContentMediaFormProps extends SharedProps {}

export const ContentMediaFormContainer = (props: ContentMediaFormProps) => {
    const { children, className } = props;
    const classes = classNames('c-content-media__form-cntnr', className);

    return <div className={classes}>{children}</div>;
};
