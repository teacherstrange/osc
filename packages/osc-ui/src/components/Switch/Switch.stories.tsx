import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Switch';
import { Switch } from './Switch';

export default {
    title: 'osc-ui/Switch',
    component: Switch,
    parameters: {
        docs: {
            description: {
                component:
                    'A control that allows the user to toggle between checked and not checked. Extended from the [Radix Switch primitive](https://www.radix-ui.com/docs/primitives/components/switch).'
            }
        }
    },
    argTypes: {
        asChild: {
            description:
                'Change the component to the HTML tag or custom component of the only child.'
        },
        checked: {
            description:
                'The controlled state of the switch. Must be used in conjunction with `onCheckedChange`.',
            type: {
                name: 'boolean',
                summary: 'boolean'
            }
        },
        onCheckedChange: {
            description: 'Event handler called when the state of the switch changes.',
            type: {
                name: 'function',
                summary: '(checked: boolean) => void'
            }
        },
        defaultChecked: {
            description:
                'The state of the switch when it is initially rendered. Use when you do not need to control its state.',
            type: {
                name: 'boolean',
                summary: 'boolean'
            }
        },
        disabled: {
            description: 'When `true`, prevents the user from interacting with the switch.',
            type: {
                name: 'boolean',
                summary: 'boolean'
            }
        },
        required: {
            description:
                'When `true`, indicates that the user must check the switch before the owning form can be submitted.',
            type: {
                name: 'boolean',
                summary: 'boolean'
            }
        },
        name: {
            description:
                'The name of the switch. Submitted with its owning form as part of a name/value pair.',
            type: {
                name: 'string',
                summary: 'string'
            }
        },
        value: {
            description: 'The value given as data when submitted with a `name`.',
            type: {
                name: 'string',
                summary: 'string'
            }
        },
        className: {
            description: 'Custom class'
        },
        id: {
            description: 'Custom ID'
        }
    }
} as Meta;

const Template: Story<Props> = (args) => <Switch {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
