import { screen } from '@testing-library/react';
import React from 'react';
import { render } from 'test-utils';
import { Icon } from '../Icon/Icon';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import {
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from './Drawer';

const content = {
    open: 'Open Drawer',
    title: 'An accessible title to be announced when the dialog is opened.',
    description: 'An optional accessible description to be announced when the dialog is opened.',
};

test('renders the drawer component', () => {
    render(
        <Drawer direction="right">
            <DrawerTrigger>{content.open}</DrawerTrigger>

            <DrawerContent>
                <DrawerCloseButton>
                    <Icon id="close" />
                    <VisuallyHidden>Close</VisuallyHidden>
                </DrawerCloseButton>

                <DrawerTitle>{content.title}</DrawerTitle>

                <DrawerDescription>{content.description}</DrawerDescription>

                <p>Drawer content</p>
            </DrawerContent>
        </Drawer>
    );

    expect(screen.getByRole('button', { name: content.open, hidden: true })).toBeVisible();
    expect(document.querySelector('.c-drawer__overlay')).toBeVisible();
    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Close' })).toBeVisible();
    expect(
        screen.getByRole('heading', {
            name: content.title,
        })
    ).toBeVisible();
    expect(screen.getByText(content.description)).toBeVisible();
    expect(screen.getByText('Drawer content')).toBeVisible();
});

test('renders the drawer component without a description', () => {
    render(
        <Drawer direction="right">
            <DrawerTrigger>{content.open}</DrawerTrigger>

            <DrawerContent aria-describedby={undefined}>
                <DrawerCloseButton>
                    <Icon id="close" />
                    <VisuallyHidden>Close</VisuallyHidden>
                </DrawerCloseButton>

                <DrawerTitle>{content.title}</DrawerTitle>

                <p>Drawer content</p>
            </DrawerContent>
        </Drawer>
    );

    expect(screen.queryByText(content.description)).not.toBeInTheDocument();
});

test('renders the drawer without an overlay', () => {
    render(
        <Drawer direction="right">
            <DrawerTrigger>{content.open}</DrawerTrigger>

            <DrawerContent showOverlay={false}>
                <DrawerCloseButton>
                    <Icon id="close" />
                    <VisuallyHidden>Close</VisuallyHidden>
                </DrawerCloseButton>

                <DrawerTitle>{content.title}</DrawerTitle>

                <DrawerDescription>{content.description}</DrawerDescription>

                <p>Drawer content</p>
            </DrawerContent>
        </Drawer>
    );

    expect(document.querySelector('.c-drawer__overlay')).not.toBeInTheDocument();
});

test('adds the content height and width variables to the trigger and the content', () => {
    render(
        <Drawer direction="right">
            <DrawerTrigger>{content.open}</DrawerTrigger>

            <DrawerContent>
                <DrawerCloseButton>
                    <Icon id="close" />
                    <VisuallyHidden>Close</VisuallyHidden>
                </DrawerCloseButton>

                <DrawerTitle>{content.title}</DrawerTitle>

                <DrawerDescription>{content.description}</DrawerDescription>

                <p>Drawer content</p>
            </DrawerContent>
        </Drawer>
    );

    // Expect them to be 0 here as we don't have a viewport to work with
    expect(screen.getByRole('button', { name: content.open, hidden: true })).toHaveStyle(
        '--drawer-content-height:0;--drawer-content-width:0'
    );
    expect(screen.getByRole('dialog')).toHaveStyle(
        '--drawer-content-height:0;--drawer-content-width:0'
    );
});

test('adds size modifier class', () => {
    const { rerender } = render(
        <Drawer direction="right">
            <DrawerTrigger>{content.open}</DrawerTrigger>

            <DrawerContent>
                <DrawerCloseButton>
                    <Icon id="close" />
                    <VisuallyHidden>Close</VisuallyHidden>
                </DrawerCloseButton>

                <DrawerTitle>{content.title}</DrawerTitle>

                <DrawerDescription>{content.description}</DrawerDescription>

                <p>Drawer content</p>
            </DrawerContent>
        </Drawer>
    );
    expect(screen.getByRole('dialog')).toHaveClass('c-drawer__content--md');

    rerender(
        <Drawer direction="right">
            <DrawerTrigger>{content.open}</DrawerTrigger>

            <DrawerContent size="sm">
                <DrawerCloseButton>
                    <Icon id="close" />
                    <VisuallyHidden>Close</VisuallyHidden>
                </DrawerCloseButton>

                <DrawerTitle>{content.title}</DrawerTitle>

                <DrawerDescription>{content.description}</DrawerDescription>

                <p>Drawer content</p>
            </DrawerContent>
        </Drawer>
    );
    expect(screen.getByRole('dialog')).toHaveClass('c-drawer__content--sm');
});

test('adds full height modifier', () => {
    render(
        <Drawer direction="right">
            <DrawerTrigger>{content.open}</DrawerTrigger>

            <DrawerContent isFull>
                <DrawerCloseButton>
                    <Icon id="close" />
                    <VisuallyHidden>Close</VisuallyHidden>
                </DrawerCloseButton>

                <DrawerTitle>{content.title}</DrawerTitle>

                <DrawerDescription>{content.description}</DrawerDescription>

                <p>Drawer content</p>
            </DrawerContent>
        </Drawer>
    );
    expect(screen.getByRole('dialog')).toHaveClass('is-full');
});
