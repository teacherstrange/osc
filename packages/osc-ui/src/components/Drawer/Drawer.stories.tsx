import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Header } from '../Header/Header';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import { TextArea } from '../TextArea/TextArea';
import { TextInput } from '../TextInput/TextInput';
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
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

    return (
        <Drawer
            open={isOpen}
            onOpenChange={(b: boolean) => {
                setIsOpen(b);
                setIsLoading(!b);
            }}
            {...args}
        >
            <DrawerTrigger asChild isPinned className="c-btn--no-shadow">
                <Button>Contact us</Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerTitle>Contact us</DrawerTitle>

                <DrawerDescription>
                    Our student advisors are eager to help - call us now on 0330 822 2686.
                    Alternatively fill out the form below and we'll get back to you.
                </DrawerDescription>

                <form
                    className="c-form c-form__hubspot"
                    onSubmit={(event) => {
                        event.preventDefault();
                        setIsLoading(true);
                        wait().then(() => setIsOpen(false));
                    }}
                >
                    <div className="c-form__inner-container">
                        <TextInput id="name" name="Full name" placeholder="Your full name" />
                        <TextInput
                            id="email"
                            name="Email"
                            type="email"
                            placeholder="Your email address"
                        />
                        <TextInput
                            id="phone"
                            name="Telephone number"
                            type="tel"
                            placeholder="Your phone number"
                        />
                        <TextArea id="message" name="Enquiry" />
                        <Button isFull isLoading={isLoading} loadingText="Sending">
                            Send Enquiry
                        </Button>
                        <p className="t-font-s">
                            By completing this form you are expressing interest in Open Study
                            College. We will send you information about our courses and any special
                            offers we think will be useful to you. You will be able to unsubscribe
                            at anytime. See our Privacy Policy.
                        </p>
                    </div>
                </form>
            </DrawerContent>
        </Drawer>
    );
};

const SmallTemplate: Story<DrawerProps> = (args) => {
    return (
        <Drawer {...args}>
            <DrawerTrigger asChild>
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
                    <Icon id="arrow" className="o-icon--lg" />
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
                                <Icon id="arrow" className="o-icon--lg" />
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
    isOffset: true,
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
    verticalOffset: 0,
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
    verticalOffset: 0,
};
CustomContainer.parameters = {
    docs: {
        description: {
            story: "You can set a custom container for the drawer by wrapping the drawer in the optional `DrawerContainer` add adding a sibling element as the `portal` container (see https://www.radix-ui.com/docs/primitives/components/dialog#custom-portal-container).<br>This is useful if you don't want the drawer to cover the entire app.",
        },
    },
};
