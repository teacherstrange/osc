import type { ElementType, ReactNode } from 'react';
import React, { createContext, useContext } from 'react';
import { useModifier } from '../../hooks/useModifier';
import type { PolymorphicComponentProps } from '../../types';
import { classNames } from '../../utils/classNames';

import './hero.scss';

/*
TODO: Should be able to Carousel
TODO: Content / CTA
TODO: Image / Video

TODO: Layout -- Text left / image right
TODO: Layout -- Text center / Large title over small cta
TODO: Blend mode image (blog article)
*/

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
    backgroundColor: string; // TODO: These will need to include all colours? -- maybe just set as a string?
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
interface HeroInnerProps extends SharedHeroProps {}

export const HeroInner = (props: HeroInnerProps) => {
    const { children, className } = props;
    const classes = classNames('c-hero__inner', 'o-container', className);

    return <div className={classes}>{children}</div>;
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

    const classes = classNames(
        elementClass,
        variant === 'tertiary' ? 't-font-primary' : 't-font-secondary',
        variant === 'tertiary' ? 't-font-beta' : 't-font-kilo',
        className
    );

    return (
        <Component className={classes} {...rest}>
            {children}
        </Component>
    );
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
