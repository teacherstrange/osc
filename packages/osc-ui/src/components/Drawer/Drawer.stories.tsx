import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Header } from '../Header/Header';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import type { DrawerProps } from './Drawer';
import {
    Drawer,
    DrawerCloseButton,
    DrawerContainer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from './Drawer';

export default {
    title: 'osc-ui/Dialogs/Drawer',
    component: Drawer,
    subcomponents: {
        DrawerCloseButton,
        DrawerContainer,
        DrawerContent,
        DrawerDescription,
        DrawerTitle,
        DrawerTrigger,
    },
    parameters: {
        docs: {
            description: {
                component: 'A panel which slides out from the edge of the screen.',
            },
        },
    },
    argTypes: {
        direction: {
            control: {
                type: 'select',
            },
        },
        verticalOffset: {
            control: {
                type: 'select',
            },
        },
    },
} as Meta;

const Template: Story<DrawerProps> = (args) => {
    return (
        <Drawer {...args}>
            <DrawerTrigger asChild>
                <Button>Open Drawer</Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerCloseButton>
                    <Icon id="close" />
                    <VisuallyHidden>Close</VisuallyHidden>
                </DrawerCloseButton>

                <DrawerTitle>
                    An accessible title to be announced when the dialog is opened.
                </DrawerTitle>

                <DrawerDescription>
                    An optional accessible description to be announced when the dialog is opened.
                </DrawerDescription>

                <p>Drawer content</p>
            </DrawerContent>
        </Drawer>
    );
};

const PinnedTemplate: Story<DrawerProps> = (args) => {
    return (
        <Drawer {...args}>
            <DrawerTrigger asChild isPinned>
                <Button>Open Drawer</Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerCloseButton>
                    <Icon id="close" />
                    <VisuallyHidden>Close</VisuallyHidden>
                </DrawerCloseButton>

                <DrawerTitle>
                    An accessible title to be announced when the dialog is opened.
                </DrawerTitle>

                <DrawerDescription>
                    An optional accessible description to be announced when the dialog is opened.
                </DrawerDescription>

                <p>Drawer content</p>
            </DrawerContent>
        </Drawer>
    );
};

const SmallTemplate: Story<DrawerProps> = (args) => {
    return (
        <Drawer {...args}>
            <DrawerTrigger asChild isPinned>
                <Button>Open Drawer</Button>
            </DrawerTrigger>

            <DrawerContent size="sm">
                <DrawerCloseButton>
                    <Icon id="close" />
                    <VisuallyHidden>Close</VisuallyHidden>
                </DrawerCloseButton>

                <DrawerTitle>
                    An accessible title to be announced when the dialog is opened.
                </DrawerTitle>

                <DrawerDescription>
                    An optional accessible description to be announced when the dialog is opened.
                </DrawerDescription>

                <p>Drawer content</p>
            </DrawerContent>
        </Drawer>
    );
};

const FullHeightTemplate: Story<DrawerProps> = (args) => {
    return (
        <Drawer {...args}>
            <DrawerTrigger asChild>
                <Button>Open Drawer</Button>
            </DrawerTrigger>

            <DrawerContent size="sm" isFull>
                <DrawerCloseButton>
                    <Icon id="arrow" />
                    <VisuallyHidden>Close</VisuallyHidden>
                </DrawerCloseButton>

                <DrawerTitle>
                    An accessible title to be announced when the dialog is opened.
                </DrawerTitle>

                <DrawerDescription>
                    An optional accessible description to be announced when the dialog is opened.
                </DrawerDescription>

                <p>Drawer content</p>
            </DrawerContent>
        </Drawer>
    );
};

const CustomContainerTemplate: Story<DrawerProps> = (args) => {
    const [portal, setPortal] = useState(null);

    return (
        <>
            <Header>
                <Logo className="c-header__logo" />
            </Header>

            <DrawerContainer style={{ minHeight: '1000px' }}>
                <div className="o-container">
                    <Drawer {...args}>
                        <DrawerTrigger asChild>
                            <Button>Open Drawer</Button>
                        </DrawerTrigger>

                        <DrawerContent size="sm" isFull container={portal}>
                            <DrawerCloseButton>
                                <Icon id="arrow" />
                                <VisuallyHidden>Close</VisuallyHidden>
                            </DrawerCloseButton>

                            <DrawerTitle>
                                An accessible title to be announced when the dialog is opened.
                            </DrawerTitle>

                            <DrawerDescription>
                                An optional accessible description to be announced when the dialog
                                is opened.
                            </DrawerDescription>

                            <p>Drawer content</p>
                        </DrawerContent>
                    </Drawer>
                </div>

                <div ref={setPortal} />
            </DrawerContainer>
        </>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    direction: 'right',
};

export const PinnedTrigger = PinnedTemplate.bind({});
PinnedTrigger.args = {
    ...Primary.args,
};
PinnedTrigger.parameters = {
    docs: {
        description: {
            story: 'Pins the trigger to the edge of the drawer.',
        },
    },
};

export const Narrow = SmallTemplate.bind({});
Narrow.args = {
    ...Primary.args,
};
Narrow.parameters = {
    docs: {
        description: {
            story: 'Changes the default width of the drawer to `sm`.',
        },
    },
};

export const FullHeight = FullHeightTemplate.bind({});
FullHeight.args = {
    ...Primary.args,
};
FullHeight.parameters = {
    docs: {
        description: {
            story: "Makes the drawer fill the height of it's container",
        },
    },
};

export const CustomContainer = CustomContainerTemplate.bind({});
CustomContainer.args = {
    ...Primary.args,
};
CustomContainer.parameters = {
    docs: {
        description: {
            story: "You can set a custom container for the drawer by wrapping the drawer in the optional `DrawerContainer` add adding a sibling element as the `portal` container (see https://www.radix-ui.com/docs/primitives/components/dialog#custom-portal-container).<br>This is useful if you don't want the drawer to cover the entire app.",
        },
    },
};
