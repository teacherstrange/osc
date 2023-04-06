import * as TabPrimitive from '@radix-ui/react-tabs';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { classNames } from '../../utils/classNames';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
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

export const TabList = (props: TabListProps) => {
    const { children, className, ...rest } = props;

    const ref = useRef<HTMLDivElement | null>(null);
    const innerRef = useRef<HTMLDivElement | null>(null);
    const [scrollStart, setScrollStart] = useState<boolean>(false);
    const [scrollEnd, setScrollEnd] = useState<boolean>(false);

    const intersection = useIntersectionObserver(innerRef, {
        root: ref.current,
        rootMargin: '0px',
        threshold: 1,
    });

    const classes = classNames(
        'c-tabs__list',
        scrollStart ? 'c-tabs__list--shadow-l' : '',
        scrollEnd ? 'c-tabs__list--shadow-r' : '',
        className
    );

    useEffect(() => {
        // IF the innerRef is intersecting then set the scroll end state to false
        setScrollEnd(intersection?.isIntersecting ? false : true);
    }, [intersection]);

    useEffect(() => {
        const element = ref.current;

        // Set the scroll state when element is scrolled left or right
        const handleScroll = () => {
            const rect = innerRef.current.getBoundingClientRect();
            const posLeft = rect.left;
            // Subtract the offset position of the element so we can ignore any padding applied to elements further up the tree; then round down
            const posRight = Math.floor(rect.right - element.offsetLeft);

            posLeft <= 0 ? setScrollStart(true) : setScrollStart(false);
            posRight > element.clientWidth ? setScrollEnd(true) : setScrollEnd(false);
        };

        element.addEventListener('scroll', handleScroll);

        return () => {
            element.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={classes} ref={ref}>
            <TabPrimitive.List className="c-tabs__list-inner" {...rest} ref={innerRef}>
                {children}
            </TabPrimitive.List>
        </div>
    );
};

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
            <TabPrimitive.Content className={classes} {...rest} ref={forwardedRef}>
                {children}
            </TabPrimitive.Content>
        );
    }
);
TabContent.displayName = 'TabContent';
