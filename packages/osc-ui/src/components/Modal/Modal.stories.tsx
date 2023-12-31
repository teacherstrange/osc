import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Burger } from '../Burger/Burger';
import { Button } from '../Button/Button';
import { Header, HeaderActionBar, HeaderNav } from '../Header/Header';
import { AccessibleIcon, Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import { Navbar, NavItem, NavLink, NavList } from '../Navbar/Navbar';
import { simpleNav } from '../Navbar/navContent';
import { TextInput } from '../TextInput/TextInput';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import type { ModalProps } from './Modal';
import {
    Modal,
    ModalCloseButton,
    ModalContainer,
    ModalContent,
    ModalDescription,
    ModalInner,
    ModalTitle,
    ModalTrigger,
} from './Modal';

export default {
    title: 'osc-ui/Dialogs/Modal',
    component: Modal,
    subcomponents: {
        ModalCloseButton,
        ModalContainer,
        ModalContent,
        ModalDescription,
        ModalInner,
        ModalTitle,
        ModalTrigger,
    },
    parameters: {
        docs: {
            description: {
                component:
                    'A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.',
            },
        },
    },
} as Meta;

const Template: Story<ModalProps> = (args) => (
    <Modal {...args}>
        <ModalTrigger asChild>
            <Button>Open modal</Button>
        </ModalTrigger>
        <ModalContent>
            <ModalCloseButton>
                <Icon id="close" />
                <VisuallyHidden>Close</VisuallyHidden>
            </ModalCloseButton>

            <ModalTitle>An accessible title to be announced when the dialog is opened.</ModalTitle>

            <ModalInner>
                <ModalDescription>
                    An optional accessible description to be announced when the dialog is opened.
                </ModalDescription>

                <p>Modal content</p>
            </ModalInner>
        </ModalContent>
    </Modal>
);

const SecondaryTemplate: Story<ModalProps> = (args) => (
    <Modal {...args}>
        <ModalTrigger asChild>
            <Button>Open modal</Button>
        </ModalTrigger>
        <ModalContent variant="secondary">
            <ModalCloseButton>
                <Icon id="close" />
                <VisuallyHidden>Close</VisuallyHidden>
            </ModalCloseButton>

            <ModalTitle>An accessible title to be announced when the dialog is opened.</ModalTitle>

            <ModalInner>
                <ModalDescription>
                    An optional accessible description to be announced when the dialog is opened.
                </ModalDescription>

                <p>Modal content</p>
            </ModalInner>
        </ModalContent>
    </Modal>
);

const HasNoDescriptionTemplate: Story<ModalProps> = (args) => (
    <Modal {...args}>
        <ModalTrigger asChild>
            <Button>Open modal</Button>
        </ModalTrigger>
        <ModalContent aria-describedby={undefined}>
            <ModalCloseButton>
                <Icon id="close" />
                <VisuallyHidden>Close</VisuallyHidden>
            </ModalCloseButton>

            <ModalTitle>An accessible title to be announced when the dialog is opened.</ModalTitle>

            <p>Modal content</p>
        </ModalContent>
    </Modal>
);

const HasNoOverlayTemplate: Story<ModalProps> = (args) => (
    <Modal {...args}>
        <ModalTrigger asChild>
            <Button>Open modal</Button>
        </ModalTrigger>
        <ModalContent aria-describedby={undefined} showOverlay={false}>
            <ModalCloseButton>
                <Icon id="close" />
                <VisuallyHidden>Close</VisuallyHidden>
            </ModalCloseButton>

            <ModalTitle>An accessible title to be announced when the dialog is opened.</ModalTitle>

            <p>Modal content</p>
        </ModalContent>
    </Modal>
);

const ControlledTemplate: Story<ModalProps> = (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

    return (
        <Modal
            open={isOpen}
            onOpenChange={(b: boolean) => {
                setIsOpen(b);
                setIsLoading(!b);
            }}
            {...args}
        >
            <ModalTrigger asChild>
                <Button>Open modal</Button>
            </ModalTrigger>
            <ModalContent>
                <ModalCloseButton>
                    <Icon id="close" />
                    <VisuallyHidden>Close</VisuallyHidden>
                </ModalCloseButton>

                <ModalTitle>Edit profile</ModalTitle>

                <ModalDescription>
                    Make changes to your profile here. Click save when you're done.
                </ModalDescription>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        setIsLoading(true);
                        wait().then(() => setIsOpen(false));
                    }}
                >
                    <TextInput
                        id="fullName"
                        name="Full Name"
                        defaultValue="Sarah"
                        required
                        style={{ marginBlockEnd: '1rem' }}
                    />
                    <Button isLoading={isLoading} loadingText="Saving">
                        Save
                    </Button>
                </form>
            </ModalContent>
        </Modal>
    );
};

const PositionedTemplate: Story<ModalProps> = (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    return (
        <>
            <Header>
                <Burger
                    id="mob-menu-trigger"
                    label="Open mobile menu"
                    isOpen={isOpen}
                    aria-expanded={isOpen}
                    aria-controls="header-nav"
                    className="u-hidden-from@desk"
                    onClick={() => setIsOpen(!isOpen)}
                />

                <Logo className="c-header__logo" />

                <HeaderActionBar>
                    <Button variant="quaternary" className="u-hidden-until@desk">
                        <AccessibleIcon label="Search">
                            <Icon id="search" />
                        </AccessibleIcon>
                    </Button>

                    <a href="/" className="u-hidden-until@desk">
                        <AccessibleIcon label="My account">
                            <Icon id="user" />
                        </AccessibleIcon>
                    </a>

                    <a href="/" className="u-hidden-until@desk">
                        <AccessibleIcon label="Wishlist">
                            <Icon id="heart" />
                        </AccessibleIcon>
                    </a>

                    <Modal {...args}>
                        <ModalTrigger asChild>
                            <Button variant="quaternary">
                                <AccessibleIcon label="Bag">
                                    <Icon id="bag" />
                                </AccessibleIcon>
                            </Button>
                        </ModalTrigger>

                        <ModalContent
                            size="sm"
                            position="tr"
                            variant="secondary"
                            container={container}
                        >
                            <ModalCloseButton>
                                <Icon id="close" />
                                <VisuallyHidden>Close</VisuallyHidden>
                            </ModalCloseButton>

                            <ModalTitle>
                                Your Bag, <span className="t-font-s u-text-reg">0 items</span>
                            </ModalTitle>

                            <ModalInner>
                                <p>Your bag is currently empty.</p>

                                <Button variant="secondary" isFull>
                                    View my bag
                                </Button>
                            </ModalInner>
                        </ModalContent>
                    </Modal>
                </HeaderActionBar>

                <HeaderNav
                    id="header-nav"
                    aria-labelledby="mob-menu-trigger"
                    data-state={isOpen ? 'open' : 'closed'}
                    isOpen={isOpen}
                >
                    <Navbar>
                        <NavList>
                            {simpleNav.map((item, index) => (
                                <NavItem key={index}>
                                    <NavLink href={item.href}>{item.label}</NavLink>
                                </NavItem>
                            ))}
                        </NavList>
                    </Navbar>
                </HeaderNav>
            </Header>

            <ModalContainer
                as="section"
                style={{
                    minHeight: '500px',
                }}
                ref={setContainer}
            />
        </>
    );
};

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = SecondaryTemplate.bind({});
Secondary.args = {
    ...Primary.args,
};
Secondary.parameters = {
    docs: {
        description: {
            story: 'The secondary variant of the modal. Has a background colour on the header and works best by including the `ModalInner` component which ensures the spacing is consistent.',
        },
    },
};

export const HasNoDescription = HasNoDescriptionTemplate.bind({});
HasNoDescription.args = {
    ...Primary.args,
};
HasNoDescription.parameters = {
    docs: {
        description: {
            story: 'If you choose to omit the description above, then make sure to pass `aria-describedby={undefined}` to the `ModalContent`',
        },
    },
};

export const HasNoOverlay = HasNoOverlayTemplate.bind({});
HasNoOverlay.args = {
    ...Primary.args,
};
HasNoOverlay.parameters = {
    docs: {
        description: {
            story: 'Remove the overlay by passing `showOverlay={false}` to the `ModalContent`',
        },
    },
};

export const ControlledModal = ControlledTemplate.bind({});
ControlledModal.args = {
    ...Primary.args,
};
ControlledModal.parameters = {
    docs: {
        description: {
            story: 'Can be opened and closed programmatically, i.e when a form submits.',
        },
    },
};

export const PositionedModal = PositionedTemplate.bind({});
PositionedModal.args = {
    ...Primary.args,
};
PositionedModal.parameters = {
    docs: {
        description: {
            story: "You can position the Modal within it's container by passing the `position` prop to the `ModalContent`. You can use this in conjunction with the `ModalContainer` component to position it within the context of another container, rather than the window. This is useful for creating things like minicarts or other modals positioned against the header.",
        },
    },
};
