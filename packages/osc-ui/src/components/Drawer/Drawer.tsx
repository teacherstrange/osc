import * as Dialog from '@radix-ui/react-dialog';
import type { ComponentPropsWithoutRef, ElementRef, ElementType, ReactNode } from 'react';
import React, { createContext, forwardRef, useContext } from 'react';
import { useModifier } from '../../hooks/useModifier';
import type { Maybe, PolymorphicComponentProps } from '../../types';
import { classNames } from '../../utils/classNames';

import './drawer.scss';

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
     * @default false
     */
    isOffset?: boolean;
}

const DrawerContext = createContext<DrawerProps>(null);

export const Drawer = (props: DrawerProps) => {
    const { children, direction, isOffset } = props;

    return (
        <DrawerContext.Provider
            value={{
                direction,
                isOffset,
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
    /**
     * Swaps the trigger to a close button.
     * Useful for patterns like pinning the button to the side of the drawer
     */
    isCloseButton?: boolean;
}

export const DrawerTrigger = forwardRef<ElementRef<typeof Dialog.Trigger>, DrawerTriggerProps>(
    (props, forwardedRef) => {
        const { children, className, isPinned, isCloseButton, ...rest } = props;
        const { direction, isOffset } = useDrawerContext();
        const directionModifier = useModifier('c-drawer__trigger', isPinned && direction);
        const offsetModifier = useModifier(
            'c-drawer__trigger',
            isPinned && isOffset ? 'offset' : ''
        );

        const classes = classNames(
            'c-drawer__trigger',
            directionModifier,
            !isCloseButton ? offsetModifier : '',
            isPinned ? 'is-pinned' : '',
            className
        );

        if (isCloseButton) {
            return (
                <Dialog.Close
                    className={`${classes} c-drawer__trigger--close`}
                    {...rest}
                    ref={forwardedRef}
                >
                    {children}
                </Dialog.Close>
            );
        }

        return (
            <Dialog.Trigger className={classes} {...rest} ref={forwardedRef}>
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
     * Customise the element that your alert dialog portals into.
     * @see: https://www.radix-ui.com/docs/primitives/components/dialog#custom-portal-container
     * @default undefined
     */
    container?: Maybe<HTMLElement>;
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
    const {
        children,
        className,
        container,
        showOverlay = true,
        size = 'md',
        isFull = false,
        ...rest
    } = props;
    const { direction, isOffset } = useDrawerContext();
    const directionModifier = useModifier('c-drawer__content', direction);
    const offsetModifier = useModifier('c-drawer__content', isOffset ? 'offset' : '');
    const widthModifier = useModifier('c-drawer__content', size);

    const classes = classNames(
        'c-drawer__content',
        directionModifier,
        offsetModifier,
        widthModifier,
        isFull && 'is-full',
        className
    );

    return (
        <Dialog.Portal container={container}>
            {showOverlay ? <Dialog.Overlay className="c-drawer__overlay" /> : null}

            <Dialog.Content className={classes} {...rest}>
                <div className="c-drawer__content-inner">{children}</div>
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
        const classes = classNames('c-drawer__title t-font-l u-text-bold', className);

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
 * Drawer Container
 * -----------------------------------------------------------------------------------------------*/
export interface DrawerContainerProps extends SharedDrawerProps {
    /**
     * The content of the container
     */
    children: ReactNode;
}

export const DrawerContainer = <C extends ElementType = 'div'>(
    props: PolymorphicComponentProps<C, DrawerContainerProps>
) => {
    const { as, children, className, ...rest } = props;
    const Component = as || 'div';
    const classes = classNames('c-drawer__container', className);

    return (
        <Component className={classes} {...rest}>
            {children}
        </Component>
    );
};

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
