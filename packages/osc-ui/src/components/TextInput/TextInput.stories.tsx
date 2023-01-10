import type { Meta, Story } from '@storybook/react';
import React, { useEffect, useRef } from 'react';

import { TextInput } from './TextInput';
import { ExclamationTriangleIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

export default {
    title: 'osc-ui/TextInput',
    component: TextInput,
    parameters: {
        docs: {
            description: {
                component: 'Input component',
            },
        },
    },
    argTypes: {},
} as Meta;

const states = {
    default: 'Default',
    hasValue: 'Has Value',
    hasFocus: 'Has Focus',
    isDisabled: 'Is Disabled',
    hasValidation: 'Has Validation',
    inline: 'Inline',
    inlineIcon: 'Inline Icon',
};

const Template: Story = ({ items }) => {
    const selectRef = useRef(null);

    useEffect(() => {
        selectRef.current?.focus();
    }, []);

    return (
        <div>
            {items.map((item, i) => (
                <div key={i} style={{ margin: '1em' }}>
                    <p style={{ fontWeight: '700', padding: '.5em 0' }}>{states[item.state]}</p>
                    <TextInput {...item} ref={item.ref ? selectRef : null} />
                </div>
            ))}
        </div>
    );
};

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Tertiary = Template.bind({});
export const Quaternary = Template.bind({});

Primary.args = {
    items: [
        {
            name: 'Full Name',
            editor: 'input',
            id: 'full-name-1',
            required: true,
            type: 'text',
            state: 'default',
        },
        {
            defaultValue: 'Sarah',
            name: 'Full Name',
            editor: 'input',
            id: 'full-name-2',
            required: true,
            type: 'text',
            state: 'hasValue',
        },
        {
            name: 'Full Name',
            editor: 'input',
            id: 'full-name-3',
            ref: true,
            required: true,
            type: 'text',
            state: 'hasFocus',
        },
        {
            name: 'Full Name',
            editor: 'input',
            icon: { content: <ExclamationTriangleIcon />, label: 'Exclamation Triangle Icon' },
            id: 'full-name-4',
            required: true,
            type: 'text',
            state: 'hasValidation',
            variants: ['error'],
            wasSubmitted: true,
        },
        {
            defaultValue: 'Sarah',
            name: 'Full Name',
            disabled: true,
            editor: 'input',
            id: 'full-name-5',
            type: 'text',
            state: 'isDisabled',
        },
    ],
};

Secondary.args = {
    items: [
        {
            name: 'Full Name',
            editor: 'input',
            id: 'full-name-1',
            type: 'text',
            variants: ['secondary'],
            state: 'default',
        },
        {
            defaultValue: 'Sarah',
            name: 'Full Name',
            editor: 'input',
            id: 'full-name-2',
            type: 'text',
            variants: ['secondary'],
            state: 'hasValue',
        },
        {
            name: 'Full Name',
            editor: 'input',
            id: 'full-name-3',
            ref: true,
            type: 'text',
            variants: ['secondary'],
            state: 'hasFocus',
        },
        {
            name: 'Full Name',
            editor: 'input',
            icon: { content: <ExclamationTriangleIcon />, label: 'Exclamation Triangle Icon' },
            id: 'full-name-4',
            required: true,
            type: 'text',
            variants: ['secondary', 'error'],
            state: 'hasValidation',
            wasSubmitted: true,
        },
        {
            name: 'Full Name',
            disabled: true,
            editor: 'input',
            id: 'full-name-5',
            type: 'text',
            variants: ['secondary'],
            state: 'isDisabled',
        },
    ],
};

Tertiary.args = {
    items: [
        {
            name: 'Full Name',
            editor: 'input',
            id: 'full-name-1',
            state: 'default',
            type: 'text',
            variants: ['tertiary'],
        },
        {
            defaultValue: 'Sarah',
            name: 'Full Name',
            editor: 'input',
            id: 'full-name-2',
            state: 'hasValue',
            type: 'text',
            variants: ['tertiary'],
        },
        {
            name: 'Full Name',
            editor: 'input',
            id: 'full-name-3',
            ref: true,
            state: 'hasFocus',
            type: 'text',
            variants: ['tertiary'],
        },
        {
            name: 'Full Name',
            editor: 'input',
            icon: { content: <ExclamationTriangleIcon />, label: 'Exclamation Triangle Icon' },
            id: 'full-name-4',
            required: true,
            state: 'hasValidation',
            type: 'text',
            variants: ['tertiary', 'error'],
            wasSubmitted: true,
        },
        {
            name: 'Full Name',
            disabled: true,
            editor: 'input',
            id: 'full-name-5',
            state: 'isDisabled',
            type: 'text',
            variants: ['tertiary'],
        },
    ],
};

Quaternary.args = {
    items: [
        {
            action: { type: 'submit', icon: <MagnifyingGlassIcon />, label: 'Magnifying Glass' },
            editor: 'input',
            id: 'search',
            name: 'Search',
            state: 'default',
            type: 'text',
            variants: ['quaternary'],
        },
        {
            action: { type: 'submit', icon: <MagnifyingGlassIcon />, label: 'Magnifying Glass' },
            defaultValue: 'GCSE English',
            editor: 'input',
            id: 'search-1',
            name: 'Search',
            state: 'hasValue',
            type: 'text',
            variants: ['quaternary'],
        },
    ],
};
