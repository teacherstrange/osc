import type { HTMLAttributes, ReactNode } from 'react';
import React from 'react';
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
    variant?: 'blog' | 'blog-featured' | 'media-object' | 'collection' | 'course';
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
export const Card = (props: CardProps) => {
    const { children, className, isFull, size = 'md', variant, ...attr } = props;
    const variantModifier = useModifier('c-card', variant);
    const sizeModifier = useModifier('c-card', size);
    const classes = classNames(
        'c-card',
        variantModifier,
        sizeModifier,
        isFull && 'is-full',
        className
    );

    return (
        <div className={classes} {...attr}>
            {children}
        </div>
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
    const classes = classNames('c-card__inner', className);

    return (
        <section className={classes} {...attr}>
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
