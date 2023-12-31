import type { ElementType, ReactNode } from 'react';
import React, { createContext, useContext, useRef } from 'react';
import { useModifier } from '../../hooks/useModifier';
import type { FlourishObject, PolymorphicComponentProps } from '../../types';
import { classNames } from '../../utils/classNames';

import { translateNodes } from '../../utils/handleMouseEvents';
import { Flourishes } from '../Flourishes/Flourishes';
import './hero.scss';

export interface SharedHeroProps {
    /**
     * The content of the hero
     */
    children: ReactNode;
    /**
     * Custom class
     */
    className?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Hero
 * -----------------------------------------------------------------------------------------------*/
export interface HeroProps extends SharedHeroProps {
    /**
     * Sets the background colour class on the hero
     */
    backgroundColor: string;
    /**
     * 'Sets the style of the hero, primary, secondary etc.'
     * @default primary
     */
    variant?: 'primary' | 'secondary' | 'tertiary';
}

export const Hero = (props: HeroProps) => {
    const { backgroundColor, children, className, variant = 'primary' } = props;
    const variantModifier = useModifier('c-hero', variant);

    const classes = classNames('c-hero', variantModifier, className);

    return (
        <HeroProvider variant={variant}>
            <div className={classes}>
                <div
                    className={`c-hero__background ${
                        backgroundColor ? `u-bg-color-${backgroundColor}` : ''
                    }`}
                />

                {children}
            </div>
        </HeroProvider>
    );
};

/* -------------------------------------------------------------------------------------------------
 * HeroInner
 * -----------------------------------------------------------------------------------------------*/
interface HeroInnerProps extends SharedHeroProps {
    /**
     * Removes the padding on the right of the container
     * @default false
     */
    pullRight?: boolean;
    /**
     * Flourish pattern to pass to the hero
     */
    flourishPattern?: FlourishObject[];
    /**
     * The colour of the flourish pattern
     */
    flourishColor?: string;
    /**
     * Adds the pattern class for the flourishes
     */
    flourishVariant?: string;
}

export const HeroInner = (props: HeroInnerProps) => {
    const { children, className, flourishPattern, flourishColor, flourishVariant } = props;
    const containerRef = useRef<HTMLDivElement | null>(null);

    const classes = classNames(
        'c-hero__inner',
        'o-container',
        props.pullRight ? 'o-container--flush-r' : '',
        className
    );

    return flourishPattern ? (
        <Flourishes
            color={flourishColor}
            pattern={flourishPattern}
            variant={flourishVariant}
            className={classes}
            ref={containerRef}
            onMouseMove={(e) => translateNodes(e, containerRef, '.c-hero__img')}
        >
            {children}
        </Flourishes>
    ) : (
        <div className={classes}>{children}</div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * HeroTitle
 * -----------------------------------------------------------------------------------------------*/
interface HeroTitleProps extends SharedHeroProps {
    /**
     * Set the style of the heading element
     * @default false
     */
    subtitle?: boolean;
}

export const HeroTitle = <C extends ElementType = 'h2'>(
    props: PolymorphicComponentProps<C, HeroTitleProps>
) => {
    const { as, children, className, subtitle, ...rest } = props;
    const Component = as || 'h2';
    const elementClass = subtitle ? 'c-hero__subttl' : 'c-hero__ttl';
    const { variant } = useHeroContext();

    let fontSize = '';

    if (variant === 'secondary') {
        fontSize = 't-font-7xl';
    } else if (variant === 'tertiary') {
        fontSize = 't-font-3xl';
    } else {
        fontSize = 't-font-6xl';
    }

    const classes = classNames(
        elementClass,
        variant === 'tertiary' ? 't-font-primary' : 't-font-secondary',
        fontSize,
        className
    );

    return (
        <Component className={classes} {...rest}>
            {children}
        </Component>
    );
};

/* -------------------------------------------------------------------------------------------------
 * HeroTitleGroup
 * -----------------------------------------------------------------------------------------------*/
export interface HeroTitleGroupProps extends SharedHeroProps {}

export const HeroTitleGroup = (props: HeroContentProps) => {
    const { children, className } = props;
    const classes = classNames('c-hero-ttl__group', className);

    return <div className={classes}>{children}</div>;
};

/* -------------------------------------------------------------------------------------------------
 * HeroContent
 * -----------------------------------------------------------------------------------------------*/
export interface HeroContentProps extends SharedHeroProps {}

export const HeroContent = (props: HeroContentProps) => {
    const { children, className } = props;
    const classes = classNames('c-hero__content', className);

    return <div className={classes}>{children}</div>;
};

/* -------------------------------------------------------------------------------------------------
 * HeroImage
 * -----------------------------------------------------------------------------------------------*/
export interface HeroImageProps extends SharedHeroProps {}

export const HeroImage = (props: HeroImageProps) => {
    const { children, className } = props;

    const classes = classNames('c-hero__img', className);

    return <div className={classes}>{children}</div>;
};

/* -------------------------------------------------------------------------------------------------
 * Hero Provider
 * -----------------------------------------------------------------------------------------------*/
const HeroContext = createContext(null);

export interface HeroProviderProps {
    /**
     * The content of the button.
     */
    children: ReactNode;
    /**
     * 'Sets the style of the hero, primary, secondary etc.'
     * @default primary
     */
    variant?: 'primary' | 'secondary' | 'tertiary';
}
export const HeroProvider = (props: HeroProviderProps) => {
    const { children, variant } = props;

    return (
        <HeroContext.Provider
            value={{
                variant,
            }}
        >
            {children}
        </HeroContext.Provider>
    );
};

/* -------------------------------------------------------------------------------------------------
 * useHeroContext
 * -----------------------------------------------------------------------------------------------*/
const useHeroContext = () => {
    const context = useContext(HeroContext);

    // if `undefined`, throw an error
    if (context === undefined) {
        throw new Error('useHeroContext was used outside of its Provider');
    }

    return context;
};
