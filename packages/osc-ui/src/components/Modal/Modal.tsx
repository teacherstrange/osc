import * as Dialog from '@radix-ui/react-dialog';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';

import { useModifier } from '../../hooks/useModifier';
import type { Maybe } from '../../types';
import './modal.scss';

export interface SharedModalProps {
    /**
     * Custom class
     */
    className?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Modal
 * -----------------------------------------------------------------------------------------------*/
export interface ModalProps
    extends ComponentPropsWithoutRef<typeof Dialog.Root>,
        Omit<SharedModalProps, 'className'> {}

export const Modal = (props: ModalProps) => {
    const { children } = props;

    return <Dialog.Root {...props}>{children}</Dialog.Root>;
};
Modal.displayName = 'Modal';

/* -------------------------------------------------------------------------------------------------
 * Modal Trigger
 * -----------------------------------------------------------------------------------------------*/
export interface ModalTriggerProps
    extends ComponentPropsWithoutRef<typeof Dialog.Trigger>,
        SharedModalProps {}

export const ModalTrigger = forwardRef<ElementRef<typeof Dialog.Trigger>, ModalTriggerProps>(
    (props, forwardedRef) => {
        const { children, className, ...rest } = props;
        const classes = classNames('c-modal__trigger', className);

        return (
            <Dialog.Trigger className={classes} {...rest} ref={forwardedRef}>
                {children}
            </Dialog.Trigger>
        );
    }
);
ModalTrigger.displayName = 'ModalTrigger';

/* -------------------------------------------------------------------------------------------------
 * Modal Content
 * -----------------------------------------------------------------------------------------------*/
export interface ModalContentProps
    extends ComponentPropsWithoutRef<typeof Dialog.Content>,
        SharedModalProps {
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
     * 'Sets the size of the button'
     * @default md
     */
    size?: 'sm' | 'md' | 'lg' | 'full';
    /**
     * Positions the modal content around it's container
     * @default center
     */
    position?: 'tr' | 'tl' | 'br' | 'bl' | 'c';
    /**
     * Sets the style of the Modal, primary, secondary etc.
     * @default primary
     */
    variant?: 'primary' | 'secondary';
}

export const ModalContent = forwardRef<ElementRef<typeof Dialog.Content>, ModalContentProps>(
    (props, forwardedRef) => {
        const {
            children,
            className,
            container,
            position = 'c',
            showOverlay = true,
            size = 'md',
            variant = 'primary',
            ...rest
        } = props;
        const sizeModifier = useModifier('c-modal__content', size);
        const variantModifier = useModifier('c-modal__content', variant);

        const classes = classNames('c-modal__content', variantModifier, sizeModifier);

        const overlayModifier = useModifier('c-modal__overlay', !showOverlay && 'hidden');
        const overlayClasses = classNames('c-modal__overlay', overlayModifier);

        const positionModifier = useModifier('c-modal__overlay-inner', position);
        const overlayInnerClasses = classNames(
            'o-container c-modal__overlay-inner',
            positionModifier
        );

        return (
            <Dialog.Portal container={container}>
                <Dialog.Overlay className={overlayClasses}>
                    <div className={overlayInnerClasses}>
                        <Dialog.Content className={classes} {...rest} ref={forwardedRef}>
                            {children}
                        </Dialog.Content>
                    </div>
                </Dialog.Overlay>
            </Dialog.Portal>
        );
    }
);
ModalContent.displayName = 'ModalContent';

/* -------------------------------------------------------------------------------------------------
 * Modal Title
 * -----------------------------------------------------------------------------------------------*/
export interface ModalTitleProps
    extends ComponentPropsWithoutRef<typeof Dialog.Title>,
        SharedModalProps {}

export const ModalTitle = forwardRef<ElementRef<typeof Dialog.Title>, ModalTitleProps>(
    (props, forwardedRef) => {
        const { children, className, ...rest } = props;
        const classes = classNames('c-modal__ttl t-font-m u-text-bold', className);

        return (
            <Dialog.Title className={classes} {...rest} ref={forwardedRef}>
                {children}
            </Dialog.Title>
        );
    }
);
ModalTitle.displayName = 'ModalTitle';

/* -------------------------------------------------------------------------------------------------
 * Modal Description
 * -----------------------------------------------------------------------------------------------*/
export interface ModalDescriptionProps
    extends ComponentPropsWithoutRef<typeof Dialog.Description>,
        SharedModalProps {}

export const ModalDescription = forwardRef<
    ElementRef<typeof Dialog.Description>,
    ModalDescriptionProps
>((props, forwardedRef) => {
    const { children, className, ...rest } = props;
    const classes = classNames('c-modal__desc', className);

    return (
        <Dialog.Description className={classes} {...rest} ref={forwardedRef}>
            {children}
        </Dialog.Description>
    );
});
ModalDescription.displayName = 'ModalTitle';

/* -------------------------------------------------------------------------------------------------
 * Modal Close Button
 * -----------------------------------------------------------------------------------------------*/
export interface ModalCloseButtonProps
    extends ComponentPropsWithoutRef<typeof Dialog.Close>,
        SharedModalProps {}

export const ModalCloseButton = forwardRef<ElementRef<typeof Dialog.Close>, ModalCloseButtonProps>(
    (props, forwardedRef) => {
        const { children, className, ...rest } = props;
        const classes = classNames('c-modal__close', className);

        return (
            <Dialog.Close className={classes} {...rest} ref={forwardedRef}>
                {children}
            </Dialog.Close>
        );
    }
);
ModalCloseButton.displayName = 'ModalCloseButton';
