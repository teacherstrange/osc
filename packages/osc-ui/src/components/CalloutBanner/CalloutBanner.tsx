import { Slot } from '@radix-ui/react-slot';
import type { ComponentPropsWithoutRef } from 'react';
import React, { createContext, useContext } from 'react';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';

import './callout-banner.scss';

interface SharedProps {
    /**
     * Custom class
     */
    className?: string;
}

/* -------------------------------------------------------------------------------------------------
 * CalloutBanner
 * -----------------------------------------------------------------------------------------------*/
export interface CalloutBannerProps extends SharedProps, ComponentPropsWithoutRef<'aside'> {
    /**
     * The variant of the callout banner
     * @default primary
     **/
    variant?: 'primary' | 'secondary';
}

const BannerContext = createContext(null);

export const CalloutBanner = (props: CalloutBannerProps) => {
    const { children, className, variant = 'primary', ...rest } = props;

    const variantModifier = useModifier('c-callout-banner', variant);
    const classes = classNames('c-callout-banner', variantModifier, className);

    return (
        <BannerContext.Provider value={{ variant }}>
            <aside className={classes} {...rest}>
                {children}
            </aside>
        </BannerContext.Provider>
    );
};

/* -------------------------------------------------------------------------------------------------
 * CalloutBannerTitle
 * -----------------------------------------------------------------------------------------------*/
export interface CalloutBannerTitleProps extends SharedProps, ComponentPropsWithoutRef<'h2'> {}

export const CalloutBannerTitle = (props: CalloutBannerProps) => {
    const { children, className } = props;
    const { variant } = useBannerContext();

    const variantModifier = useModifier('c-callout-banner__ttl', variant);
    const classes = classNames(
        'c-callout-banner__ttl',
        variantModifier,
        't-font-secondary',
        'u-lh-1',
        className
    );

    return <h2 className={classes}>{children}</h2>;
};

/* -------------------------------------------------------------------------------------------------
 * CalloutContentGroup
 * -----------------------------------------------------------------------------------------------*/
export interface CalloutContentGroupProps extends SharedProps, ComponentPropsWithoutRef<'div'> {
    /**
     * Merges its props onto its immediate child
     */
    asChild?: boolean;
    /**
     * Sets the flex property to auto
     * By default it's fixed to 1 so it doesn't shrink, setting this to true will allow it to shrink if needed
     * @default false
     */
    willShrink?: boolean;
}

export const CalloutContentGroup = (props: CalloutContentGroupProps) => {
    const { asChild, children, willShrink = false, className } = props;
    const { variant } = useBannerContext();

    const variantModifier = useModifier('c-callout-banner__content-group', variant);
    const flexModifier = useModifier('c-callout-banner__content-group', 'shrink');

    const classes = classNames(
        'c-callout-banner__content-group',
        willShrink ? flexModifier : '',
        variantModifier,
        className
    );

    const Component = asChild ? Slot : 'div';

    return <Component className={classes}>{children}</Component>;
};

/* -------------------------------------------------------------------------------------------------
 * CalloutButtonGroup
 * -----------------------------------------------------------------------------------------------*/
export interface CalloutButtonGroupProps extends SharedProps, ComponentPropsWithoutRef<'div'> {}

export const CalloutButtonGroup = (props: CalloutButtonGroupProps) => {
    const { children, className } = props;
    const { variant } = useBannerContext();

    const variantModifier = useModifier('c-callout-banner__btn-group', variant);
    const classes = classNames('c-callout-banner__btn-group', variantModifier, className);

    return <div className={classes}>{children}</div>;
};

/* -------------------------------------------------------------------------------------------------
 * CalloutFooter
 * -----------------------------------------------------------------------------------------------*/
export interface CalloutFooterProps extends SharedProps, ComponentPropsWithoutRef<'div'> {
    /**
     * Merges its props onto its immediate child
     */
    asChild?: boolean;
    /**
     * Offsets the footer to the right
     * @default false
     */
    isOffset?: boolean;
}

export const CalloutFooter = (props: CalloutFooterProps) => {
    const { asChild, children, isOffset, className } = props;
    const { variant } = useBannerContext();

    const offsetModifier = useModifier('c-callout-banner__footer', 'offset');
    const variantModifier = useModifier('c-callout-banner__footer', variant);
    const classes = classNames(
        'c-callout-banner__footer',
        variantModifier,
        isOffset ? offsetModifier : '',
        className
    );

    const Component = asChild ? Slot : 'div';

    return <Component className={classes}>{children}</Component>;
};

/* -------------------------------------------------------------------------------------------------
 * useBannerContext
 * -----------------------------------------------------------------------------------------------*/
const useBannerContext = () => {
    const context = useContext(BannerContext);

    // if `undefined`, throw an error
    if (context === undefined) {
        throw new Error('useCardContext was used outside of its Provider');
    }

    return context;
};
