import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button, ButtonGroup } from '../Button/Button';
import type { AlertModalProps } from './AlertModal';
import {
    AlertModal,
    AlertModalAction,
    AlertModalCancel,
    AlertModalContent,
    AlertModalDescription,
    AlertModalTitle,
    AlertModalTrigger,
} from './AlertModal';

export default {
    title: 'osc-ui/Dialogs/AlertModal',
    component: AlertModal,
    subcomponents: {
        AlertModalContent,
        AlertModalDescription,
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

export const Primary = Template.bind({});
Primary.args = {};
