import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import './modal.scss';

interface CloseProps<T> extends ButtonHTMLAttributes<T> {
    children: ReactNode;
}

const ModalCloseButton = forwardRef<
    ElementRef<typeof Dialog.Close>,
    ComponentPropsWithoutRef<typeof Dialog.Close>
>((props: CloseProps<HTMLButtonElement>, forwardedRef) => {
    const { children, ...attr } = props;

    return (
        <Dialog.Close asChild>
            <button aria-label="Close" {...attr} ref={forwardedRef}>
                {children}
            </button>
        </Dialog.Close>
    );
});
ModalCloseButton.displayName = 'ModalCloseButton';

export interface Props {
    open?: boolean;
    onOpenChange?: () => void;
    ModalButtonText: string;
    title: string;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    hideHeaderCloseButton: boolean;
    hideFooterCloseButton: boolean;
    disableOutsideClick?: boolean;
    overlayColour: string;
    primaryActionButton: boolean;
    primaryActionButtonText: string;
    onClick: () => void;
    modalDescription: string;
}

export const Modal = (props: Props) => {
    const {
        open,
        onOpenChange,
        ModalButtonText,
        title,
        size,
        children,
        hideHeaderCloseButton,
        hideFooterCloseButton,
        disableOutsideClick,
        primaryActionButton,
        primaryActionButtonText,
        onClick,
        modalDescription,
    } = props;
    const width = `c-modal--${size}`;
    const classes = classNames('c-modal', width);

    return (
        <Dialog.Root modal open={open} onOpenChange={onOpenChange}>
            <Dialog.Trigger asChild>
                <button>{ModalButtonText}</button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="c-modal__overlay" />

                <Dialog.Content
                    onPointerDownOutside={disableOutsideClick ? (e) => e.preventDefault() : null}
                    className={classes}
                >
                    <header className="c-modal__header">
                        <Dialog.Title>{title}</Dialog.Title>
                        {!hideHeaderCloseButton ? (
                            <ModalCloseButton>
                                <Cross2Icon />
                            </ModalCloseButton>
                        ) : null}
                    </header>
                    <Dialog.Description className="c-modal__description sr-only">
                        {modalDescription}
                    </Dialog.Description>

                    <div>{children}</div>

                    <footer className="c-modal__footer">
                        {!hideFooterCloseButton ? <ModalCloseButton>Close</ModalCloseButton> : null}

                        {primaryActionButton ? (
                            <button onClick={onClick}>{primaryActionButtonText}</button>
                        ) : null}
                    </footer>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
