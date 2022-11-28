import type { Meta, Story } from '@storybook/react';
import React from 'react';
import {
    Popover,
    PopoverAnchor,
    PopoverArrow,
    PopoverClose,
    PopoverContent,
    PopoverTrigger
} from './Popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';

export default {
    title: 'osc-ui/Popover',
    component: Popover,
    subcomponents: {
        PopoverAnchor,
        PopoverArrow,
        PopoverClose,
        PopoverContent,
        PopoverTrigger
    },
    argTypes: {
        children: {
            description:
                'Children consist of the subcomponents that can be put together to customise the component.'
        },
        defaultOpen: {
            name: 'defaultOpen',
            type: 'boolean',
            description:
                'The open state of the popover when it is initially rendered. Use when you do not need to control its open state.'
        },
        open: {
            name: 'open',
            type: 'boolean',
            description: `The controlled open state of the popover. Must be used in conjunction with onOpenChange.`
        },
        openChange: {
            name: 'onOpenChange',
            type: 'function',
            description: 'Event handler called when the open state of the popover changes'
        },
        modal: {
            name: 'modal',
            type: 'boolean',
            description:
                'The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.'
        }
    },
    parameters: {
        docs: {
            description: {
                component: 'Displays rich content in a portal, triggered by a button.'
            }
        }
    }
} as Meta;

const Template: Story = (args) => {
    const triggerContent = args.children[0];
    const popoverContent = args.children[1];

    return (
        <Popover>
            <PopoverTrigger className={args.className}>{triggerContent}</PopoverTrigger>
            <PopoverContent>{popoverContent}</PopoverContent>
        </Popover>
    );
};

const WithIconTemplate: Story = (args) => {
    const triggerContent = args.children[0];
    const popoverContent = args.children[1];

    return (
        <Popover>
            <PopoverTrigger className={args.className}>{triggerContent}</PopoverTrigger>
            <PopoverContent>{popoverContent}</PopoverContent>
        </Popover>
    );
};

const WithContentArrowTemplate: Story = (args) => {
    const triggerContent = args.children[0];
    const popoverContent = args.children[1];
    const popoverArrow = args.children[2];

    return (
        <Popover>
            <PopoverTrigger className={args.className}>{triggerContent}</PopoverTrigger>
            <PopoverContent>
                {popoverContent}
                {popoverArrow}
            </PopoverContent>
        </Popover>
    );
};
const WithContentCloseIconTemplate: Story = (args) => {
    const triggerContent = args.children[0];
    const popoverContent = args.children[1];
    const closeIcon = args.children[2];

    return (
        <Popover>
            <PopoverTrigger className={args.className}>{triggerContent}</PopoverTrigger>
            <PopoverContent>
                {popoverContent}
                {closeIcon}
            </PopoverContent>
        </Popover>
    );
};

const WithAnchorTemplate: Story = (args) => (
    <Popover>
        <PopoverTrigger>Click to toggle</PopoverTrigger>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Optional anchor
            <PopoverAnchor />
        </div>
        <PopoverContent {...args}>Example Popover</PopoverContent>
    </Popover>
);

export const Primary = Template.bind({});
export const WithIcon = WithIconTemplate.bind({});
export const WithContentArrow = WithContentArrowTemplate.bind({});
export const WithContentCloseIcon = WithContentCloseIconTemplate.bind({});
export const WithAnchor = WithAnchorTemplate.bind({});

Primary.args = {
    children: ['Click to Toggle', 'Example Content'],
    contentClasses: 'class-test'
};

WithIcon.args = {
    children: [<MixerHorizontalIcon key={0} />, 'Example Content'],
    className: 'c-popover__icon-button'
};
WithIcon.parameters = {
    docs: {
        description: {
            story: 'Uses an icon for the Popover "Trigger" rather than text'
        }
    }
};

WithContentArrow.args = {
    children: ['Click to Toggle', 'Example Content', <PopoverArrow key={1} />]
};
WithContentArrow.parameters = {
    docs: {
        description: {
            story: 'Creates an arrow icon in the Popover "Content" that points to the trigger'
        }
    }
};

WithContentCloseIcon.args = {
    children: [
        'Click to toggle',
        'Example Content',
        <PopoverClose className="c-popover__close" aria-label="Close" key={1}>
            <Cross2Icon />
        </PopoverClose>
    ]
};

WithAnchor.parameters = {
    docs: {
        description: {
            story: 'Anchor is an optional element to position Popover "Content" against. If not used, the content will position alongside the Popover "Trigger"'
        }
    }
};
