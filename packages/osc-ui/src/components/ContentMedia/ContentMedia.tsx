import type { ReactNode } from 'react';
import React from 'react';
import { useModifier } from '../../hooks/useModifier';
import type { Alignments } from '../../types';
import { classNames } from '../../utils/classNames';

import './content-media.scss';

/*

    TODO: Carousel?

    TODO: Media
        TODO: cover/contain option -- should be applied directly to image with o-img-- modifiers

    TODO: Layout
        TODO: Can be flipped so the text is left, the image is right and vice-versa
        TODO: Define Grid (50/50 or 60/40 etc)

    TODO: Content Alignment
        TODO: top, centre, bottom

    TODO: Select Media / Content Type
        TODO: Slides
        TODO: Form
        TODO: Content
        TODO: Trustpilot
        TODO: Video still in PR (#687)

*/
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
     * Sets the width of the block on large screens
     */
    width?: '40%' | '50%' | '60%';
    /**
     * The content or media variant
     */
    variant: 'content' | 'media';
}

export const ContentMediaBlock = (props: ContentMediaBlockProps) => {
    const { align = 'center', children, className, width = '50%', variant } = props;
    const breakpoint = '@tab';

    let widthClass: string;

    if (width === '40%') {
        widthClass = `o-grid__col--5${breakpoint}`;
    }
    if (width === '50%') {
        widthClass = `o-grid__col--6${breakpoint}`;
    }
    if (width === '60%') {
        widthClass = `o-grid__col--7${breakpoint}`;
    }

    const alignmentClass = align ? `u-self-${align}` : '';

    const classes = classNames(
        'c-content-media__block',
        `c-content-media__${variant}`,
        'o-grid__col--12',
        widthClass,
        alignmentClass,
        className
    );

    return <div className={classes}>{children}</div>;
};
