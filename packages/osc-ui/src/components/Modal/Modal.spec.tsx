import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from 'test-utils';
import { Button } from '../Button/Button';
import { Modal, ModalAction, ModalCancel, ModalContent, ModalTrigger } from './Modal';

const content = {
    open: 'Open modal',
    title: 'An accessible title to be announced when the dialog is opened.',
    description: 'An optional accessible description to be announced when the dialog is opened.',
};

test('renders the modal component', async () => {
    const user = userEvent.setup();

    render(
        <Modal>
            <ModalTrigger asChild>
                <Button>{content.open}</Button>
            </ModalTrigger>
            <ModalContent title={content.title} description={content.description}>
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
            <ModalContent title={content.title} aria-describedby={undefined}>
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
            <ModalContent
                title={content.title}
                description={content.description}
                showOverlay={false}
            >
                <p>Modal content</p>
            </ModalContent>
        </Modal>
    );

    await user.click(screen.getByRole('button', { name: content.open }));

    expect(document.querySelector('.c-modal__overlay')).not.toBeInTheDocument();
});

test('renders the modal as an alert dialog', async () => {
    const user = userEvent.setup();

    render(
        <Modal isAlert>
            <ModalTrigger asChild>
                <Button>{content.open}</Button>
            </ModalTrigger>
            <ModalContent
                title={content.title}
                description={content.description}
                showOverlay={false}
            >
                <ModalAction>Confirm</ModalAction>

                <ModalCancel>Cancel</ModalCancel>
            </ModalContent>
        </Modal>
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
