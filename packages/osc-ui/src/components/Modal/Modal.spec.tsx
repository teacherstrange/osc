import { Icon } from '@radix-ui/react-select';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from 'test-utils';
import { Button } from '../Button/Button';
import {
    AlertModal,
    AlertModalAction,
    AlertModalCancel,
    AlertModalContent,
    AlertModalDescription,
    AlertModalTitle,
    AlertModalTrigger,
} from './AlertModal';
import {
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalDescription,
    ModalTitle,
    ModalTrigger,
} from './Modal';

const content = {
    open: 'Open modal',
    title: 'An accessible title to be announced when the dialog is opened.',
    description: 'An optional accessible description to be announced when the dialog is opened.',
};

describe('Modal', () => {
    test('renders the modal component', async () => {
        const user = userEvent.setup();

        render(
            <Modal>
                <ModalTrigger asChild>
                    <Button>{content.open}</Button>
                </ModalTrigger>
                <ModalContent>
                    <ModalCloseButton>
                        <Icon id="close" />
                        <VisuallyHidden>Close</VisuallyHidden>
                    </ModalCloseButton>

                    <ModalTitle>{content.title}</ModalTitle>
                    <ModalDescription>{content.description}</ModalDescription>
                    <p>Modal content</p>
                </ModalContent>
            </Modal>
        );

        await user.click(screen.getByRole('button', { name: content.open }));

        expect(document.querySelector('.c-modal__overlay')).toBeVisible();
        expect(screen.getByRole('dialog')).toBeVisible();
        expect(screen.getByRole('button', { name: 'Close' })).toBeVisible();
        expect(
            screen.getByRole('heading', {
                name: content.title,
            })
        ).toBeVisible();
        expect(screen.getByText(content.description)).toBeVisible();
        expect(screen.getByText('Modal content')).toBeVisible();
    });

    test('renders the modal component without a description', async () => {
        const user = userEvent.setup();

        render(
            <Modal>
                <ModalTrigger asChild>
                    <Button>{content.open}</Button>
                </ModalTrigger>
                <ModalContent aria-describedby={undefined}>
                    <ModalCloseButton>
                        <Icon id="close" />
                        <VisuallyHidden>Close</VisuallyHidden>
                    </ModalCloseButton>

                    <ModalTitle>{content.title}</ModalTitle>
                    <p>Modal content</p>
                </ModalContent>
            </Modal>
        );

        await user.click(screen.getByRole('button', { name: content.open }));

        expect(screen.queryByText(content.description)).not.toBeInTheDocument();
    });

    test('renders the modal without an overlay', async () => {
        const user = userEvent.setup();

        render(
            <Modal>
                <ModalTrigger asChild>
                    <Button>{content.open}</Button>
                </ModalTrigger>
                <ModalContent showOverlay={false}>
                    <ModalCloseButton>
                        <Icon id="close" />
                        <VisuallyHidden>Close</VisuallyHidden>
                    </ModalCloseButton>

                    <ModalTitle>{content.title}</ModalTitle>
                    <ModalDescription>{content.description}</ModalDescription>
                    <p>Modal content</p>
                </ModalContent>
            </Modal>
        );

        await user.click(screen.getByRole('button', { name: content.open }));

        expect(document.querySelector('.c-modal__overlay')).not.toBeInTheDocument();
    });
});

describe('AlertModal', () => {
    test('renders the modal as an alert dialog', async () => {
        const user = userEvent.setup();

        render(
            <AlertModal>
                <AlertModalTrigger asChild>
                    <Button>{content.open}</Button>
                </AlertModalTrigger>
                <AlertModalContent showOverlay={false}>
                    <AlertModalTitle>{content.title}</AlertModalTitle>
                    <AlertModalDescription>{content.description}</AlertModalDescription>
                    <AlertModalAction>Confirm</AlertModalAction>
                    <AlertModalCancel>Cancel</AlertModalCancel>
                </AlertModalContent>
            </AlertModal>
        );

        await user.click(screen.getByRole('button', { name: content.open }));

        expect(screen.getByRole('alertdialog')).toBeVisible();
        expect(
            screen.getByRole('heading', {
                name: content.title,
            })
        ).toBeVisible();
        expect(screen.getByText(content.description)).toBeVisible();
        expect(screen.getByRole('button', { name: 'Confirm' })).toBeVisible();
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeVisible();
    });
});
