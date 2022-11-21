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
        <PopoverTrigger>Click to toggle</PopoverTrigger>
        <PopoverContent {...args}>Example Popover</PopoverContent>
    </Popover>
);
const TemplateTwo: Story<Props> = (args) => (
    <Popover>
        <PopoverTrigger className="c-popover__icon-button" aria-label="Update dimensions">
            <MixerHorizontalIcon />
        </PopoverTrigger>
        <PopoverContent {...args}>Example Popover</PopoverContent>
    </Popover>
);
const TemplateThree: Story<Props> = (args) => (
    <Popover>
        <PopoverTrigger>Click to toggle</PopoverTrigger>
        <PopoverContent {...args}>
            Example Popover
            <PopoverArrow />
        </PopoverContent>
    </Popover>
);
const TemplateFour: Story<Props> = (args) => (
    <Popover>
        <PopoverTrigger>Click to toggle</PopoverTrigger>
        <PopoverContent {...args}>
            Example Popover
            <PopoverClose className="c-popover__close" aria-label="Close">
                <Cross2Icon />
            </PopoverClose>
        </PopoverContent>
    </Popover>
);
const TemplateFive: Story<Props> = (args) => (
    <Popover>
        <PopoverTrigger>Click to toggle</PopoverTrigger>
        <PopoverAnchor
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%'
            }}
        />
        <PopoverContent {...args}>Example Popover</PopoverContent>
    </Popover>
);

export const Primary = Template.bind({});
export const WithIcon = TemplateTwo.bind({});
export const WithPopoverArrow = TemplateThree.bind({});
export const WithPopoverCloseIcon = TemplateFour.bind({});
export const WithAnchor = TemplateFive.bind({});
