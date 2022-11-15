import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Modal';
import { Modal } from './Modal';

export default {
    title: 'osc-ui/Modal',
    component: Modal,
    parameters: {
        docs: {
            description: {
                component:
                    'A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.'
            }
        }
    },
    argTypes: {
        children: {
            table: {
                disable: true
            }
        },
        disableOutsideClick: {
            description: 'Sets whether the user can click outside of the modal to close it'
        },
        hideFooterCloseButton: {
            description: 'Sets whether or not to hide the close button in the footer'
        },
        hideHeaderCloseButton: {
            description: 'Sets whether or not to hide the close button in the header'
        },
        ModalButtonText: {
            description: 'Sets the text of the button that opens the modal'
        },
        modalDescription: {
            description: 'An accessible description to be announced when the dialog is opened'
        },
        onClick: {
            description: 'The function that is passed to the primary action button'
        },
        overlayColour: {
            description: 'Colour of the overlay background'
        },
        primaryActionButton: {
            description: 'Sets whether the primary action button is visible'
        },
        primaryActionButtonText: {
            description: 'Sets the text of the primary action button'
        },
        size: {
            description: 'Sets the size of the modal',
            control: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'] }
        },
        title: {
            description: 'Modal heading'
        }
    }
} as Meta;

const Template: Story<Props> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    children: <p>hello world</p>,
    ModalButtonText: 'Click to open',
    title: 'whats up',
    modalDescription: 'An accessible description to be announced when the dialog is opened',
    size: 'xs',
    hideHeaderCloseButton: false,
    hideFooterCloseButton: false,
    disableOutsideClick: false,
    overlayColour: 'grey',
    primaryActionButton: false,
    primaryActionButtonText: 'click me',
    onClick: () => {
        alert('modal cliked');
    }
};

export const Small = Template.bind({});
Small.args = {
    ...Primary.args,
    size: 'sm'
};
export const Medium = Template.bind({});
Medium.args = {
    ...Primary.args,
    size: 'md'
};

export const Large = Template.bind({});
Large.args = {
    ...Primary.args,
    size: 'lg'
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
    ...Primary.args,
    size: 'xl'
};

export const Full = Template.bind({});
Full.args = {
    ...Primary.args,
    size: 'full'
};
