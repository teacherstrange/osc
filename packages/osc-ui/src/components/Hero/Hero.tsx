import type { ElementType, ReactNode } from 'react';
import React from 'react';
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
        <div className={classes}>
            <div
                className={`c-hero__background ${
                    backgroundColor ? `u-bg-color-${backgroundColor}` : ''
                }`}
            />
            {children}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * HeroInner
 * -----------------------------------------------------------------------------------------------*/
interface HeroInnerProps extends SharedHeroProps {}

export const HeroInner = (props: HeroInnerProps) => {
    const { children, className } = props;
    const classes = classNames('c-hero__inner', 'o-container', 'o-grid', className);

    return <div className={classes}>{children}</div>;
};

/* -------------------------------------------------------------------------------------------------
 * HeroTitle
 * -----------------------------------------------------------------------------------------------*/
interface HeroTitleProps extends SharedHeroProps {}

export const HeroTitle = <C extends ElementType = 'h2'>(
    props: PolymorphicComponentProps<C, HeroTitleProps>
) => {
    const { as, children, className, ...rest } = props;
    const Component = as || 'h2';

    const classes = classNames(
        'c-hero__ttl',
        'o-grid__col--start-1 o-grid__col--7',
        't-font-secondary',
        't-font-kilo',
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

    const classes = classNames(
        'c-hero__content',
        'o-grid__col--start-1 o-grid__col--12 o-grid__col--7@tab',
        't-font-epsilon',
        className
    );

    return <div className={classes}>{children}</div>;
};

/* -------------------------------------------------------------------------------------------------
 * HeroImage
 * -----------------------------------------------------------------------------------------------*/
export interface HeroImageProps extends SharedHeroProps {}

export const HeroImage = (props: HeroImageProps) => {
    const { children, className } = props;

    const classes = classNames(
        'c-hero__img',
        'o-grid__col--start-5 o-grid__col--start-8@tab o-grid__col--8 o-grid__col--5@tab',
        className
    );

    return <div className={classes}>{children}</div>;
};
