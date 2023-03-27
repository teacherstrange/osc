import * as Dialog from '@radix-ui/react-dialog';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import React, { createContext, forwardRef, useContext, useEffect, useState } from 'react';
import useElementSize from '../../hooks/useElementSize';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';

import './drawer.scss';

// TODO: pinned animation not working in safari
// TODO: stop it sliding over the page when it loads :S

export interface SharedDrawerProps {
    /**
     * Custom class
     */
    className?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Drawer
 * -----------------------------------------------------------------------------------------------*/
export interface DrawerProps
    extends ComponentPropsWithoutRef<typeof Dialog.Root>,
        SharedDrawerProps {
    /**
     * Direction the drawer should slide in from
     * If the trigger has the `isPinned` prop, this will also position the trigger to the edge of the drawer.
     */
    direction: 'top' | 'right' | 'bottom' | 'left';
    /**
     * Distance from the top of the screen
     * @default 120
     */
    verticalOffset?: 0 | 120;
}

const DrawerContext = createContext(null);

export const Drawer = (props: DrawerProps) => {
    const { children, direction, verticalOffset = 120 } = props;
    const [drawerContentSize, setDrawerContentSize] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });

    return (
        <DrawerContext.Provider
            value={{
                direction,
                drawerContentSize,
                setDrawerContentSize,
                verticalOffset,
            }}
        >
            <Dialog.Root className="c-drawer" {...props}>
                {children}
            </Dialog.Root>
        </DrawerContext.Provider>
    );
};
Drawer.displayName = 'Drawer';

/* -------------------------------------------------------------------------------------------------
 * Drawer Trigger
 * -----------------------------------------------------------------------------------------------*/
export interface DrawerTriggerProps
    extends ComponentPropsWithoutRef<typeof Dialog.Trigger>,
        SharedDrawerProps {
    /**
     * Pins the trigger to the edge of the drawer.
     */
    isPinned?: boolean;
}

export const DrawerTrigger = forwardRef<ElementRef<typeof Dialog.Trigger>, DrawerTriggerProps>(
    (props, forwardedRef) => {
        const { children, className, isPinned, ...rest } = props;
        const { direction, drawerContentSize, verticalOffset } = useDrawerContext();
        const directionModifier = useModifier('c-drawer__trigger', isPinned && direction);

        const classes = classNames(
            'c-drawer__trigger',
            directionModifier,
            isPinned ? 'is-pinned' : '',
            className
        );

        return (
            <Dialog.Trigger
                className={classes}
                {...rest}
                ref={forwardedRef}
                style={{
                    ['--drawer-content-height' as string]: drawerContentSize.height,
                    ['--drawer-content-width' as string]: drawerContentSize.width,
                    ['--drawer-vertical-offset' as string]: verticalOffset,
                    ...rest.style,
                }}
            >
                {children}
            </Dialog.Trigger>
        );
    }
);
DrawerTrigger.displayName = 'DrawerTrigger';

/* -------------------------------------------------------------------------------------------------
 * Drawer Content
 * -----------------------------------------------------------------------------------------------*/
export interface DrawerContentProps
    extends ComponentPropsWithoutRef<typeof Dialog.Content>,
        SharedDrawerProps {
    /**
     * Whether to display the overlay or not
     * @default true
     */
    showOverlay?: boolean;
    /**
     * Width of the content area
     * @default md
     */
    size?: 'sm' | 'md';
    /**
     * Sets the drawer container to fill the height of its container
     * @default false
     */
    isFull?: boolean;
}

export const DrawerContent = (props: DrawerContentProps) => {
    const { children, className, showOverlay = true, size = 'md', isFull = false, ...rest } = props;
    const { direction, setDrawerContentSize, verticalOffset } = useDrawerContext();
    const directionModifier = useModifier('c-drawer__content', direction);
    const widthModifier = useModifier('c-drawer__content', size);
    const [contentRef, { height, width }] = useElementSize();

    const classes = classNames(
        'c-drawer__content',
        directionModifier,
        widthModifier,
        isFull && 'is-full',
        className
    );

    useEffect(() => {
        setDrawerContentSize({ height, width });
    }, [setDrawerContentSize, height, width]);

    return (
        <Dialog.Portal>
            {showOverlay ? <Dialog.Overlay className="c-drawer__overlay" /> : null}

            <Dialog.Content
                className={classes}
                {...rest}
                ref={contentRef}
                style={{
                    ['--drawer-content-height' as string]: height,
                    ['--drawer-content-width' as string]: width,
                    ['--drawer-vertical-offset' as string]: verticalOffset,
                    ...rest.style,
                }}
            >
                {children}
            </Dialog.Content>
        </Dialog.Portal>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Drawer Title
 * -----------------------------------------------------------------------------------------------*/
export interface DrawerTitleProps
    extends ComponentPropsWithoutRef<typeof Dialog.Title>,
        SharedDrawerProps {}

export const DrawerTitle = forwardRef<ElementRef<typeof Dialog.Title>, DrawerTitleProps>(
    (props, forwardedRef) => {
        const { children, className, ...rest } = props;
        const classes = classNames('c-drawer__title t-font-m u-text-bold', className);

        return (
            <Dialog.Title className={classes} {...rest} ref={forwardedRef}>
                {children}
            </Dialog.Title>
        );
    }
);
DrawerTitle.displayName = 'DrawerTitle';

/* -------------------------------------------------------------------------------------------------
 * Drawer Description
 * -----------------------------------------------------------------------------------------------*/
export interface DrawerDescriptionProps
    extends ComponentPropsWithoutRef<typeof Dialog.Description>,
        SharedDrawerProps {}

export const DrawerDescription = forwardRef<
    ElementRef<typeof Dialog.Description>,
    DrawerDescriptionProps
>((props, forwardedRef) => {
    const { children, className, ...rest } = props;
    const classes = classNames('c-drawer__description', className);

    return (
        <Dialog.Description className={classes} {...rest} ref={forwardedRef}>
            {children}
        </Dialog.Description>
    );
});
DrawerDescription.displayName = 'DrawerDescription';

/* -------------------------------------------------------------------------------------------------
 * Drawer Close Button
 * -----------------------------------------------------------------------------------------------*/
export interface DrawerCloseButtonProps
    extends ComponentPropsWithoutRef<typeof Dialog.Close>,
        SharedDrawerProps {}

export const DrawerCloseButton = forwardRef<
    ElementRef<typeof Dialog.Close>,
    DrawerCloseButtonProps
>((props, forwardedRef) => {
    const { children, className, ...rest } = props;
    const classes = classNames('c-drawer__close', className);

    return (
        <Dialog.Close className={classes} {...rest} ref={forwardedRef}>
            {children}
        </Dialog.Close>
    );
});
DrawerCloseButton.displayName = 'DrawerCloseButton';

/* -------------------------------------------------------------------------------------------------
 * useDrawerContext
 * -----------------------------------------------------------------------------------------------*/
const useDrawerContext = () => {
    const context = useContext(DrawerContext);

    // if `undefined`, throw an error
    if (context === undefined) {
        throw new Error('useDrawerContext was used outside of its Provider');
    }

    return context;
};
