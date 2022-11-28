import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Popover';
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
            defaultValue: 'false',
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

const Template: Story<Props> = (args) => (
    <Popover>
        {args.children[0]}
        <PopoverContent {...args}>
            Example Popover
            {args.children[1]}
        </PopoverContent>
    </Popover>
);

const WithAnchorTemplate: Story<Props> = (args) => (
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
export const WithIcon = Template.bind({});
export const WithPopoverArrow = Template.bind({});
export const WithPopoverCloseIcon = Template.bind({});
export const WithAnchor = WithAnchorTemplate.bind({});
WithAnchor.parameters = {
    docs: {
        description: {
            story: 'Anchor is an optional element to position Popover "Content" against. If not used, the content will position alongside the Popover "Trigger"'
        }
    }
};

Primary.args = {
    children: [<PopoverTrigger key={0}>Click to toggle</PopoverTrigger>]
};

WithIcon.args = {
    children: [
        <PopoverTrigger className="c-popover__icon-button" aria-label="Update dimensions" key={0}>
            <MixerHorizontalIcon />
        </PopoverTrigger>
    ]
};
WithIcon.parameters = {
    docs: {
        description: {
            story: 'Uses an icon for the Popover "Trigger" rather than text'
        }
    }
};

WithPopoverArrow.args = {
    children: [<PopoverTrigger key={0}>Click to toggle</PopoverTrigger>, <PopoverArrow key={1} />]
};
WithPopoverArrow.parameters = {
    docs: {
        description: {
            story: 'Creates an arrow icon in the Popover "Content" that points to the trigger'
        }
    }
};

WithPopoverCloseIcon.args = {
    children: [
        <PopoverTrigger key={0}>Click to toggle</PopoverTrigger>,
        <PopoverClose className="c-popover__close" aria-label="Close" key={1}>
            <Cross2Icon />
        </PopoverClose>
    ]
};
