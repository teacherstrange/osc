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
            description: 'Sets whether the user can click outside of the modal to close it',
            table: {
                type: {
                    summary: 'boolean'
                }
            }
        },
        hideFooterCloseButton: {
            description:
                'Sets whether or not to prevent rendering of the close button in the footer',
            type: { name: 'boolean', required: true },
            table: {
                type: {
                    summary: 'boolean'
                }
            }
        },
        hideHeaderCloseButton: {
            description:
                'Sets whether or not to prevent rendering of the close button in the header',
            type: { name: 'boolean', required: true },
            table: {
                type: {
                    summary: 'boolean'
                }
            }
        },
        ModalButtonText: {
            description: 'Sets the text of the button that opens the modal',
            type: { name: 'string', required: true },
            table: {
                type: {
                    summary: 'boolean'
                }
            }
        },
        modalDescription: {
            description: 'An accessible description to be announced when the dialog is opened',
            type: { name: 'string', required: true },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        onOpenChange: {
            description: 'Event handler called when the open state of the dialog changes.',
            table: {
                type: {
                    summary: '(open: boolean) => void'
                }
            }
        },
        onClick: {
            description: 'The function that is passed to the primary action button',
            type: { name: 'function', required: true },
            table: {
                type: {
                    summary: '() => void'
                }
            }
        },
        overlayColour: {
            description: 'Colour of the overlay background',
            type: { name: 'string', required: true },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        primaryActionButton: {
            description: 'Sets whether the primary action button is visible',
            type: { name: 'boolean', required: true },
            table: {
                type: {
                    summary: 'boolean'
                }
            }
        },
        primaryActionButtonText: {
            description: 'Sets the text of the primary action button',
            type: { name: 'string', required: true },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        size: {
            description: 'Sets the size of the modal',
            control: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'] },
            type: { name: 'string', required: true },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        title: {
            description: 'Modal heading',
            type: { name: 'string', required: true },
            table: {
                type: {
                    summary: 'string'
                }
            }
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
