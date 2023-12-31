import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button, ButtonGroup } from '../Button/Button';
import type { AlertModalProps } from './AlertModal';
import {
    AlertModal,
    AlertModalAction,
    AlertModalCancel,
    AlertModalContainer,
    AlertModalContent,
    AlertModalDescription,
    AlertModalInner,
    AlertModalTitle,
    AlertModalTrigger,
} from './AlertModal';

export default {
    title: 'osc-ui/Dialogs/AlertModal',
    component: AlertModal,
    subcomponents: {
        AlertModalContainer,
        AlertModalContent,
        AlertModalDescription,
        AlertModalInner,
        AlertModalTitle,
        AlertModalTrigger,
    },
    parameters: {
        docs: {
            description: {
                component:
                    'A modal dialog that interrupts the user with important content and expects a response.<br>Takes the same props as the default `Modal` component. However can only be closed by interacting with the `AlertModalAction` or `AlertModalCancel` components.',
            },
        },
    },
} as Meta;

const Template: Story<AlertModalProps> = (args) => (
    <AlertModal {...args}>
        <AlertModalTrigger asChild>
            <Button>Open modal</Button>
        </AlertModalTrigger>
        <AlertModalContent>
            <AlertModalTitle>Are you absolutely sure?</AlertModalTitle>
            <AlertModalDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
            </AlertModalDescription>

            <ButtonGroup>
                <AlertModalAction asChild>
                    <Button variant="secondary" size="sm">
                        Confirm
                    </Button>
                </AlertModalAction>

                <AlertModalCancel asChild>
                    <Button variant="tertiary" size="sm">
                        Cancel
                    </Button>
                </AlertModalCancel>
            </ButtonGroup>
        </AlertModalContent>
    </AlertModal>
);
const SecondaryTemplate: Story<AlertModalProps> = (args) => (
    <AlertModal {...args}>
        <AlertModalTrigger asChild>
            <Button>Open modal</Button>
        </AlertModalTrigger>
        <AlertModalContent variant="secondary">
            <AlertModalTitle>Are you absolutely sure?</AlertModalTitle>

            <AlertModalInner>
                <AlertModalDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                </AlertModalDescription>

                <ButtonGroup>
                    <AlertModalAction asChild>
                        <Button variant="secondary" size="sm">
                            Confirm
                        </Button>
                    </AlertModalAction>

                    <AlertModalCancel asChild>
                        <Button variant="tertiary" size="sm">
                            Cancel
                        </Button>
                    </AlertModalCancel>
                </ButtonGroup>
            </AlertModalInner>
        </AlertModalContent>
    </AlertModal>
);

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = SecondaryTemplate.bind({});
Secondary.args = {
    ...Primary.args,
};
