import type { HTMLAttributes, ReactNode } from 'react';
import type { Headings } from '../../types';
// import type { PortableTextComponents } from '@portabletext/react';
import React from 'react';
import { classNames } from '../../utils/classNames';

import { useModifier } from '../../hooks/useModifier';
import './card.scss';

// TODO: Course card (separate component)
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
    variant?: 'post';
}

/* -------------------------------------------------------------------------------------------------
 * Card
 * -----------------------------------------------------------------------------------------------*/
export const Card = (props: CardProps) => {
    const { children, className, variant, ...attr } = props;
    const variantModifier = useModifier('c-card', variant);
    const classes = classNames('c-card', variantModifier, className);

    return (
        <div className={classes} {...attr}>
            {children}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Card Image
 * -----------------------------------------------------------------------------------------------*/
export interface CardImageProps extends SharedCardProps, HTMLAttributes<HTMLDivElement> {}

export const CardImage = (props: CardImageProps) => {
    const { children, className, ...attr } = props;
    const classes = classNames('c-card__img', className);

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
 * Card Heading
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
     */
    is?: 'subtitle';
}

export const CardTitle = (props: CardTitleProps) => {
    const { as: Component = 'h2', children, className, is, ...attr } = props;

    const elementClass = is ? 'c-card__subttl' : 'c-card__ttl';
    const classes = classNames(elementClass, className);

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
export interface CardFooterProps extends SharedCardProps, HTMLAttributes<HTMLDivElement> {}

export const CardFooter = (props: CardFooterProps) => {
    const { children, className, ...attr } = props;
    const classes = classNames('c-card__footer', className);

    return (
        <footer className={classes} {...attr}>
            {children}
        </footer>
    );
};
