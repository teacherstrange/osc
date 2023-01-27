import type { HTMLAttributes, ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import useElementSize from '../../hooks/useElementSize';
import { useModifier } from '../../hooks/useModifier';
import type { Headings } from '../../types';
import { classNames } from '../../utils/classNames';

import './card.scss';

// TODO: Layout (grid/carousel)

export interface SharedCardProps {
    /**
     * The content of the component
     */
    children?: ReactNode;
    /**
     * Custom class
     */
    className?: string;
}

export interface CardProps extends SharedCardProps, HTMLAttributes<HTMLDivElement> {
    /**
     * Card variation
     */
    variant?: 'blog' | 'collection' | 'course';
    /**
     * Set the sub variant of the card -- only available for certain variants
     * TODO: Type this 👆
     */
    subVariant?: 'featured' | 'media-object';
    /**
     * Sets the size of the card
     *
     * @default md
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Makes the card fill the width of its container
     * @default false
     */
    isFull?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * Card
 * -----------------------------------------------------------------------------------------------*/
const CardContext = createContext(null);

export const Card = (props: CardProps) => {
    const { children, className, isFull, size = 'md', variant, subVariant, ...attr } = props;
    const [cardInnerHeight, setCardInnerHeight] = useState<number>(null);
    const variantModifier = useModifier('c-card', variant);
    const sizeModifier = useModifier('c-card', size);
    const subVariantClass = `is-${subVariant}`;
    const classes = classNames(
        'c-card',
        variantModifier,
        sizeModifier,
        subVariantClass,
        isFull && 'is-full',
        className
    );

    const context = {
        cardInnerHeight,
        setCardInnerHeight,
    };

    return (
        <CardContext.Provider value={context}>
            <div
                className={classes}
                style={{
                    ...attr.style,
                    ['--c-card-inner-height' as string]: cardInnerHeight && `${cardInnerHeight}px`,
                }}
                {...attr}
            >
                {children}
            </div>
        </CardContext.Provider>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Card Image
 * -----------------------------------------------------------------------------------------------*/
export interface CardImageProps extends SharedCardProps, HTMLAttributes<HTMLDivElement> {
    /**
     * Sets the `is-rounded` className for the image
     *
     * @default false
     */
    isRounded?: boolean;
}

export const CardImage = (props: CardImageProps) => {
    const { children, className, isRounded, ...attr } = props;
    const classes = classNames('c-card__img', isRounded && 'is-rounded', className);

    return (
        <div className={classes} {...attr}>
            {children}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Card Inner
 * -----------------------------------------------------------------------------------------------*/
export interface CardInnerProps extends SharedCardProps, HTMLAttributes<HTMLDivElement> {}

export const CardInner = (props: CardInnerProps) => {
    const { children, className, ...attr } = props;
    const { setCardInnerHeight } = useCardContext();
    const classes = classNames('c-card__inner', className);
    const [innerRef, { height }] = useElementSize();

    useEffect(() => {
        setCardInnerHeight(height);
    }, [setCardInnerHeight, height]);

    return (
        <section className={classes} ref={innerRef} {...attr}>
            {children}
        </section>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Card Header
 * -----------------------------------------------------------------------------------------------*/
export interface CardHeaderProps extends SharedCardProps, HTMLAttributes<HTMLDivElement> {}

export const CardHeader = (props: CardHeaderProps) => {
    const { children, className, ...attr } = props;
    const classes = classNames('c-card__header', className);

    return (
        <header className={classes} {...attr}>
            {children}
        </header>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Card Title
 * -----------------------------------------------------------------------------------------------*/
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    /**
     * Set the heading element of the card
     *
     * @default h2
     */
    as?: Headings;
    /**
     * Set the style of the heading element
     * @default false
     */
    subtitle?: boolean;
    /**
     * Sets the size of the title
     * @default false
     */
    isSmall?: boolean;
}

export const CardTitle = (props: CardTitleProps) => {
    const { as: Component = 'h2', children, className, isSmall, subtitle, ...attr } = props;

    const elementClass = subtitle ? 'c-card__subttl' : 'c-card__ttl';
    const classes = classNames(elementClass, isSmall && 'is-small', className);

    return (
        <Component className={classes} {...attr}>
            {children}
        </Component>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Card Body
 * -----------------------------------------------------------------------------------------------*/
export interface CardBodyProps extends SharedCardProps, HTMLAttributes<HTMLDivElement> {}

export const CardBody = (props: CardBodyProps) => {
    const { children, className, ...attr } = props;
    const classes = classNames('c-card__body', className);

    return (
        <div className={classes} {...attr}>
            {children}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Card Footer
 * -----------------------------------------------------------------------------------------------*/
export interface CardFooterProps extends SharedCardProps, HTMLAttributes<HTMLDivElement> {
    /**
     * Adds the `has-border-top` class to the footer
     *
     * @default false
     */
    hasBorderTop?: boolean;
    /**
     * Adds the `has-border-bottom` class to the footer
     *
     * @default false
     */
    hasBorderBottom?: boolean;
}

export const CardFooter = (props: CardFooterProps) => {
    const { children, className, hasBorderTop, hasBorderBottom, ...attr } = props;
    const classes = classNames(
        'c-card__footer',
        hasBorderTop && 'has-border-top',
        hasBorderBottom && 'has-border-bottom',
        className
    );

    return (
        <footer className={classes} {...attr}>
            {children}
        </footer>
    );
};

/* -------------------------------------------------------------------------------------------------
 * useCardContext
 * -----------------------------------------------------------------------------------------------*/
const useCardContext = () => {
    const context = useContext(CardContext);

    // if `undefined`, throw an error
    if (context === undefined) {
        throw new Error('useCardContext was used outside of its Provider');
    }

    return context;
};
