import * as TabPrimitive from '@radix-ui/react-tabs';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';

import './tabs.scss';

export interface SharedTabProps {
    /**
     * Custom class
     */
    className?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Tabs
 * -----------------------------------------------------------------------------------------------*/
export interface TabProps
    extends ComponentPropsWithoutRef<typeof TabPrimitive.Root>,
        SharedTabProps {}

export const Tabs = forwardRef<ElementRef<typeof TabPrimitive.Root>, TabProps>(
    (props, forwardedRef) => {
        const { children, className, ...rest } = props;
        const classes = classNames('c-tabs', className);

        return (
            <TabPrimitive.Root className={classes} {...rest} ref={forwardedRef}>
                {children}
            </TabPrimitive.Root>
        );
    }
);
Tabs.displayName = 'Tabs';

/* -------------------------------------------------------------------------------------------------
 * Tab List
 * -----------------------------------------------------------------------------------------------*/
export interface TabListProps
    extends ComponentPropsWithoutRef<typeof TabPrimitive.List>,
        SharedTabProps {}

export const TabList = forwardRef<ElementRef<typeof TabPrimitive.List>, TabListProps>(
    (props, forwardedRef) => {
        const { children, className, ...rest } = props;
        const classes = classNames('c-tabs__list', className);

        return (
            <TabPrimitive.List className={classes} {...rest} ref={forwardedRef}>
                {children}
            </TabPrimitive.List>
        );
    }
);
TabList.displayName = 'TabList';

/* -------------------------------------------------------------------------------------------------
 * Tab Trigger
 * -----------------------------------------------------------------------------------------------*/
export interface TabTriggerProps
    extends ComponentPropsWithoutRef<typeof TabPrimitive.Trigger>,
        SharedTabProps {}

export const TabTrigger = forwardRef<ElementRef<typeof TabPrimitive.Trigger>, TabTriggerProps>(
    (props, forwardedRef) => {
        const { children, className, ...rest } = props;
        const classes = classNames('c-tabs__trigger u-text-uppercase u-text-bold', className);

        return (
            <TabPrimitive.Trigger className={classes} {...rest} ref={forwardedRef}>
                {children}
            </TabPrimitive.Trigger>
        );
    }
);
TabTrigger.displayName = 'TabTrigger';

/* -------------------------------------------------------------------------------------------------
 * Tab Content
 * -----------------------------------------------------------------------------------------------*/
export interface TabContentProps
    extends ComponentPropsWithoutRef<typeof TabPrimitive.Content>,
        SharedTabProps {}

export const TabContent = forwardRef<ElementRef<typeof TabPrimitive.Content>, TabContentProps>(
    (props, forwardedRef) => {
        const { children, className, ...rest } = props;
        const classes = classNames('c-tabs__content', className);

        return (
            // Force mount so content is findable on the page
            <TabPrimitive.Content className={classes} forceMount {...rest} ref={forwardedRef}>
                {children}
            </TabPrimitive.Content>
        );
    }
);
TabContent.displayName = 'TabContent';
