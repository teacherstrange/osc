import { Slot } from '@radix-ui/react-slot';
import type { ComponentPropsWithoutRef } from 'react';
import React from 'react';
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
export interface CalloutBannerProps extends SharedProps, ComponentPropsWithoutRef<'aside'> {}

export const CalloutBanner = (props: CalloutBannerProps) => {
    const { children, className, ...rest } = props;

    const classes = classNames('c-callout-banner', className);

    return (
        <aside className={classes} {...rest}>
            {children}
        </aside>
    );
};

/* -------------------------------------------------------------------------------------------------
 * CalloutBannerTitle
 * -----------------------------------------------------------------------------------------------*/
export interface CalloutBannerTitleProps extends SharedProps, ComponentPropsWithoutRef<'h2'> {}

export const CalloutBannerTitle = (props: CalloutBannerProps) => {
    const { children, className } = props;
    const classes = classNames('c-callout-banner__ttl', 't-font-secondary', 'u-lh-1', className);

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
}

export const CalloutContentGroup = (props: CalloutContentGroupProps) => {
    const { asChild, children, className } = props;
    const classes = classNames('c-callout-banner__content-group', className);
    const Component = asChild ? Slot : 'div';

    return <Component className={classes}>{children}</Component>;
};

/* -------------------------------------------------------------------------------------------------
 * CalloutButtonGroup
 * -----------------------------------------------------------------------------------------------*/
export interface CalloutButtonGroupProps extends SharedProps, ComponentPropsWithoutRef<'div'> {}

export const CalloutButtonGroup = (props: CalloutButtonGroupProps) => {
    const { children, className } = props;
    const classes = classNames('c-callout-banner__btn-group', className);

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
}

export const CalloutFooter = (props: CalloutFooterProps) => {
    const { asChild, children, className } = props;
    const classes = classNames('c-callout-banner__footer', className);
    const Component = asChild ? Slot : 'div';

    return <Component className={classes}>{children}</Component>;
};
