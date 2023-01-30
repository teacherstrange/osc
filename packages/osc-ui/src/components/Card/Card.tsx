import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import useElementSize from '../../hooks/useElementSize';
import { useModifier } from '../../hooks/useModifier';
import type { Headings } from '../../types';
import { classNames } from '../../utils/classNames';
import type { SharedButtonProps } from '../Button/Button';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

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

/* -------------------------------------------------------------------------------------------------
 * Card
 * -----------------------------------------------------------------------------------------------*/
export interface CardProps extends SharedCardProps, HTMLAttributes<HTMLDivElement> {
    /**
     * Makes the whole card the click target for the button.
     * @default false
     */
    blockLink?: boolean;
    /**
     * Sets the size of the card
     *
     * @default md
     */
    size?: 'sm' | 'md' | 'lg';
}
const CardContext = createContext(null);

export const Card = (props: CardProps) => {
    const { blockLink, children, className, size = 'md', ...attr } = props;
    const [cardInnerHeight, setCardInnerHeight] = useState<number>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const sizeModifier = useModifier('c-card', size);

    const classes = classNames('c-card', sizeModifier, blockLink && 'is-block-link', className);

    const context = {
        cardInnerHeight,
        setCardInnerHeight,
    };

    useEffect(() => {
        if (blockLink) {
            const card = cardRef.current;
            // We can expect the only button to be a Button component which is identified by the `c-btn` class
            // By using querySelector we're only selecting the first button
            const button = card.querySelector('.c-btn') as HTMLButtonElement;

            const handleClick = (e: MouseEvent) => {
                // Prevent event bubbling when clicking directly on the button element.
                // Without this clicking directly on the button will fire two events
                // which could cause some uninteded bugs.
                if (e.target !== button) button.click();
            };

            card.addEventListener('click', handleClick);

            return () => {
                card.removeEventListener('click', handleClick);
            };
        }
    }, [blockLink]);

    return (
        <CardContext.Provider value={context}>
            <div
                className={classes}
                {...attr}
                style={{
                    ...attr.style,
                    ['--c-card-inner-height' as string]: cardInnerHeight && `${cardInnerHeight}px`,
                }}
                ref={cardRef}
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
 * Card Body Inner
 * -----------------------------------------------------------------------------------------------*/
export interface CardBodyInnerProps extends SharedCardProps, HTMLAttributes<HTMLDivElement> {}

export const CardBodyInner = (props: CardBodyInnerProps) => {
    const { children, className, ...attr } = props;
    const classes = classNames('c-card__body-inner', className);

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

/* -------------------------------------------------------------------------------------------------
 * Card Callout
 * -----------------------------------------------------------------------------------------------*/
export interface CardCalloutProps extends SharedCardProps, HTMLAttributes<HTMLDivElement> {}

export const CardCallout = (props: CardCalloutProps) => {
    const { children, className, ...attr } = props;
    const classes = classNames('c-card__callout', className);

    return (
        <div className={classes} {...attr}>
            {children}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Card Price Tag
 * -----------------------------------------------------------------------------------------------*/
export interface CardPriceTagProps extends SharedCardProps, HTMLAttributes<HTMLDivElement> {
    /**
     * The content of the component,
     * this component accepts up to two children & they must be an element.
     */
    children:
        | ReactElement<HTMLParagraphElement>
        | [ReactElement<HTMLParagraphElement>, ReactElement<HTMLParagraphElement>];
}

export const CardPriceTag = (props: CardPriceTagProps) => {
    const { children, className, ...attr } = props;
    const classes = classNames('c-card__price-tag', className);

    return (
        <div className={classes} {...attr}>
            {children}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * CardWishListButton
 * -----------------------------------------------------------------------------------------------*/
export interface CardWishListButtonProps
    extends Pick<SharedButtonProps, 'className' | 'isDisabled' | 'size'> {
    /**
     * Accessible label for the icon
     */
    label: string;
}

export const CardWishListButton = (props: CardWishListButtonProps) => {
    const { className, label, ...attr } = props;
    const classes = classNames('c-card__wishlist-btn', className);

    return (
        <Button className={classes} variant="quaternary" {...attr}>
            {/* // TODO: replace with with `Icon` component */}
            {/* // TODO: This also needs a tooltip see 'collection-design' in Figma */}
            <Icon label={label}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{
                        stroke: 'currentColor',
                        fill: 'transparent',
                        strokeWidth: '2px',
                    }}
                >
                    <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
                </svg>
            </Icon>
        </Button>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Blog Card
 * -----------------------------------------------------------------------------------------------*/
export interface BlogCardProps extends CardProps, HTMLAttributes<HTMLDivElement> {
    /**
     * Card variation
     */
    variant?: 'featured' | 'media-object';
}

export const BlogCard = (props: BlogCardProps) => {
    const { children, className, variant, ...attr } = props;
    const variantModifier = useModifier('c-card', variant);

    const classes = classNames('c-card--blog', variantModifier, className);

    return (
        <Card className={classes} {...attr}>
            {children}
        </Card>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Collection Card
 * -----------------------------------------------------------------------------------------------*/
export interface CollectionCardProps extends CardProps, HTMLAttributes<HTMLDivElement> {}

export const CollectionCard = (props: CollectionCardProps) => {
    const { children, className, ...attr } = props;
    const classes = classNames('c-card--collection', className);

    return (
        <Card className={classes} {...attr}>
            {children}
        </Card>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Course Card
 * -----------------------------------------------------------------------------------------------*/
export interface CourseCardProps extends CardProps, HTMLAttributes<HTMLDivElement> {
    /**
     * Makes the card fill the width of its container
     * @default false
     */
    isFull?: boolean;
}

export const CourseCard = (props: CourseCardProps) => {
    const { children, className, isFull, ...attr } = props;
    const classes = classNames('c-card--course', isFull && 'is-full', className);

    return (
        <Card className={classes} {...attr}>
            {children}
        </Card>
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
