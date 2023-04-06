import * as AlertDialog from '@radix-ui/react-alert-dialog';
import React, { forwardRef } from 'react';

import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { useModifier } from '../../hooks/useModifier';
import type { Maybe } from '../../types';
import { classNames } from '../../utils/classNames';

export interface SharedAlertModalProps {
    /**
     * Custom class
     */
    className?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Alert Modal
 * -----------------------------------------------------------------------------------------------*/
export interface AlertModalProps
    extends ComponentPropsWithoutRef<typeof AlertDialog.Root>,
        SharedAlertModalProps {}

export const AlertModal = (props: AlertModalProps) => {
    const { children } = props;

    return (
        <AlertDialog.Root className="c-modal" {...props}>
            {children}
        </AlertDialog.Root>
    );
};
AlertModal.displayName = 'AlertModal';

/* -------------------------------------------------------------------------------------------------
 * Alert Modal Trigger
 * -----------------------------------------------------------------------------------------------*/
export interface AlertModalTriggerProps
    extends ComponentPropsWithoutRef<typeof AlertDialog.Trigger>,
        SharedAlertModalProps {}

export const AlertModalTrigger = forwardRef<
    ElementRef<typeof AlertDialog.Trigger>,
    AlertModalTriggerProps
>((props, forwardedRef) => {
    const { children, className, ...rest } = props;
    const classes = classNames('c-modal__trigger', className);

    return (
        <AlertDialog.Trigger className={classes} {...rest} ref={forwardedRef}>
            {children}
        </AlertDialog.Trigger>
    );
});
AlertModalTrigger.displayName = 'AlertModalTrigger';

/* -------------------------------------------------------------------------------------------------
 * Alert Modal Content
 * -----------------------------------------------------------------------------------------------*/
export interface ModalContentProps
    extends ComponentPropsWithoutRef<typeof AlertDialog.Content>,
        SharedAlertModalProps {
    /**
     * Customise the element that your alert dialog portals into.
     * @see: https://www.radix-ui.com/docs/primitives/components/alert-dialog#custom-portal-container
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
}

export const AlertModalContent = forwardRef<
    ElementRef<typeof AlertDialog.Content>,
    ModalContentProps
>((props, forwardedRef) => {
    const { children, className, container, showOverlay = true, size = 'md', ...rest } = props;
    const sizeModifier = useModifier('c-modal__content', size);
    const classes = classNames('c-modal__content', sizeModifier, className);

    return (
        <AlertDialog.Portal container={container}>
            {showOverlay ? <AlertDialog.Overlay className="c-modal__overlay" /> : null}

            <AlertDialog.Content className={classes} {...rest} ref={forwardedRef}>
                {children}
            </AlertDialog.Content>
        </AlertDialog.Portal>
    );
});
AlertModalContent.displayName = 'AlertModalContent';

/* -------------------------------------------------------------------------------------------------
 * Alert Modal Title
 * -----------------------------------------------------------------------------------------------*/
export interface AlertModalTitleProps
    extends ComponentPropsWithoutRef<typeof AlertDialog.Title>,
        SharedAlertModalProps {}

export const AlertModalTitle = forwardRef<
    ElementRef<typeof AlertDialog.Title>,
    AlertModalTitleProps
>((props, forwardedRef) => {
    const { children, className, ...rest } = props;
    const classes = classNames('c-modal__ttl t-font-m u-text-bold', className);

    return (
        <AlertDialog.Title className={classes} {...rest} ref={forwardedRef}>
            {children}
        </AlertDialog.Title>
    );
});
AlertModalTitle.displayName = 'AlertModalTitle';

/* -------------------------------------------------------------------------------------------------
 * Alert Modal Description
 * -----------------------------------------------------------------------------------------------*/
export interface AlertModalDescriptionProps
    extends ComponentPropsWithoutRef<typeof AlertDialog.Description>,
        SharedAlertModalProps {}

export const AlertModalDescription = forwardRef<
    ElementRef<typeof AlertDialog.Description>,
    AlertModalDescriptionProps
>((props, forwardedRef) => {
    const { children, className, ...rest } = props;
    const classes = classNames('c-modal__desc', className);

    return (
        <AlertDialog.Description className={classes} {...rest} ref={forwardedRef}>
            {children}
        </AlertDialog.Description>
    );
});
AlertModalDescription.displayName = 'AlertModalTitle';

/* -------------------------------------------------------------------------------------------------
 * Alert Modal Action
 * -----------------------------------------------------------------------------------------------*/
export interface ModalActionProps
    extends ComponentPropsWithoutRef<typeof AlertDialog.Action>,
        SharedAlertModalProps {}

export const AlertModalAction = forwardRef<ElementRef<typeof AlertDialog.Action>, ModalActionProps>(
    (props, forwardedRef) => {
        const { children, className, ...rest } = props;
        const classes = classNames('c-modal__action', className);

        return (
            <AlertDialog.Action className={classes} {...rest} ref={forwardedRef}>
                {children}
            </AlertDialog.Action>
        );
    }
);
AlertModalAction.displayName = 'AlertModalAction';

/* -------------------------------------------------------------------------------------------------
 * Alert Modal Cancel
 * -----------------------------------------------------------------------------------------------*/
export interface ModalCancelProps
    extends ComponentPropsWithoutRef<typeof AlertDialog.Action>,
        SharedAlertModalProps {}

export const AlertModalCancel = forwardRef<ElementRef<typeof AlertDialog.Action>, ModalCancelProps>(
    (props, forwardedRef) => {
        const { children, className, ...rest } = props;
        const classes = classNames('c-modal__action', className);

        return (
            <AlertDialog.Action className={classes} {...rest} ref={forwardedRef}>
                {children}
            </AlertDialog.Action>
        );
    }
);
AlertModalCancel.displayName = 'AlertModalCancel';
