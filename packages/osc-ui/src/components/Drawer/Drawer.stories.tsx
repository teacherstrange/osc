import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import type { DrawerProps } from './Drawer';
import {
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from './Drawer';

export default {
    title: 'osc-ui/Dialogs/Drawer',
    component: Drawer,
    subcomponents: {
        DrawerTrigger,
        DrawerContent,
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

export const FullHeight = FullHeightTemplate.bind({});
FullHeight.args = {
    ...Primary.args,
};
