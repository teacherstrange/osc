import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import type { Props } from './Modal';
import { Modal } from './Modal';

describe('Modal component', () => {
    const setup = ({
        open,
        onOpenChange,
        ModalButtonText,
        title,
        modalDescription,
        hideFooterCloseButton,
        hideHeaderCloseButton,
        overlayColour,
        primaryActionButton,
        primaryActionButtonText,
        onClick
    }: Props) => {
        render(
            <Modal
                open={open}
                onOpenChange={onOpenChange}
                ModalButtonText={ModalButtonText}
                hideFooterCloseButton={hideFooterCloseButton}
                hideHeaderCloseButton={hideHeaderCloseButton}
                overlayColour={overlayColour}
                disableOutsideClick={false}
                modalDescription={modalDescription}
                primaryActionButton={primaryActionButton}
                primaryActionButtonText={primaryActionButtonText}
                onClick={onClick}
                title={title}
                size={'lg'}
            />
        );
    };

    test('renders modal with no close button', async () => {
        const user = userEvent.setup();

        setup({
            ModalButtonText: 'click to open modal',
            title: 'testing modal',
            modalDescription: 'An accessible description to be announced when the dialog is opened',
            size: 'xl',
            hideHeaderCloseButton: false,
            hideFooterCloseButton: true,
            overlayColour: 'green',
            primaryActionButton: true,
            primaryActionButtonText: 'click me',
            onClick: () => {}
        });

        await user.click(screen.getByRole('button', { name: 'click to open modal' }));

        const closeButton = document.querySelector('.c-modal__footer button[aria-label="Close"]');
        expect(closeButton).not.toBeInTheDocument();
    });

    test('renders modal with no X button', async () => {
        const user = userEvent.setup();

        setup({
            ModalButtonText: 'click to open modal',
            title: 'testing modal',
            modalDescription: 'An accessible description to be announced when the dialog is opened',
            size: 'xl',
            hideHeaderCloseButton: true,
            hideFooterCloseButton: false,
            overlayColour: 'green',
            primaryActionButton: true,
            primaryActionButtonText: 'click me',
            onClick: () => {}
        });

        await user.click(screen.getByRole('button', { name: 'click to open modal' }));

        const closeButton = document.querySelector('.c-modal__header button');
        expect(closeButton).not.toBeInTheDocument();
    });

    test('renders the primary action button', async () => {
        const user = userEvent.setup();

        setup({
            ModalButtonText: 'click to open modal',
            title: 'testing modal',
            modalDescription: 'An accessible description to be announced when the dialog is opened',
            size: 'xl',
            hideHeaderCloseButton: true,
            hideFooterCloseButton: true,
            overlayColour: 'green',
            primaryActionButton: true,
            primaryActionButtonText: 'primary action button',
            onClick: () => {}
        });

        await user.click(screen.getByRole('button', { name: 'click to open modal' }));

        expect(screen.getByText('primary action button')).toHaveTextContent(
            'primary action button'
        );
    });
});
