import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { TextInput } from '../TextInput/TextInput';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import type { ModalProps } from './Modal';
import {
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalDescription,
    ModalTitle,
    ModalTrigger,
} from './Modal';

export default {
    title: 'osc-ui/Dialogs/Modal',
    component: Modal,
    subcomponents: {
        ModalCloseButton,
        ModalContent,
        ModalDescription,
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

            <ModalDescription>
                An optional accessible description to be announced when the dialog is opened.
            </ModalDescription>

            <p>Modal content</p>
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

export const Primary = Template.bind({});
Primary.args = {};

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
