import React from 'react';
import { OSCModal as Modal } from './Modal';
import { screen, render } from '@testing-library/react';
import type { Props } from './Modal';

describe('Modal component', () => {
    const setup = ({
        Open,
        ModalButtonText,
        title,
        hideFooterCloseButton,
        hideHeaderCloseButton,
        closeDisabled,
        overlayColour,
        primaryActionButton,
        primaryActionButtonText,
        onClick
    }: Props) => {
        render(
            <Modal
                Open={Open}
                ModalButtonText={ModalButtonText}
                hideFooterCloseButton={hideFooterCloseButton}
                hideHeaderCloseButton={hideHeaderCloseButton}
                closeDisabled={closeDisabled}
                overlayColour={overlayColour}
                primaryActionButton={primaryActionButton}
                primaryActionButtonText={primaryActionButtonText}
                onClick={onClick}
                title={title}
                size={'lg'}
            />
        );
    };

    test('renders modal with no close button', () => {
        setup({
            Open: true,
            ModalButtonText: 'click to open modal',
            title: 'testing modal',
            size: 'xl',
            hideHeaderCloseButton: true,
            hideFooterCloseButton: false,
            closeDisabled: false,
            overlayColour: 'green',
            primaryActionButton: true,
            primaryActionButtonText: 'click me',
            onClick: () => {}
        });

        expect(document.querySelector('.chakra-modal__close-btn')).toBeNull();
    });
    test('renders modal with no X button', () => {
        setup({
            Open: true,
            ModalButtonText: 'click to open modal',
            title: 'testing modal',
            size: 'xl',
            hideHeaderCloseButton: true,
            hideFooterCloseButton: true,
            closeDisabled: true,
            overlayColour: 'green',
            primaryActionButton: true,
            primaryActionButtonText: 'click me',
            onClick: () => {}
        });
        expect(document.querySelector('.o-modal-close')).toBeNull();
    });
    test('renders the primary action button', () => {
        setup({
            Open: true,
            ModalButtonText: 'click to open modal',
            title: 'testing modal',
            size: 'xl',
            hideHeaderCloseButton: true,
            hideFooterCloseButton: true,
            closeDisabled: false,
            overlayColour: 'green',
            primaryActionButton: true,
            primaryActionButtonText: 'primary action button',
            onClick: () => {}
        });

        expect(screen.getByText('primary action button')).toHaveTextContent(
            'primary action button'
        );
    });
});
