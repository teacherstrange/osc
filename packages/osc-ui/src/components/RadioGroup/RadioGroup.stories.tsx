import type { Meta, Story } from '@storybook/react';
import React, { useEffect, useRef } from 'react';

import { RadioGroup, RadioItem } from './RadioGroup';

export default {
    title: 'osc-ui/RadioGroup',
    component: RadioGroup,
    parameters: {
        docs: {
            description: {
                component:
                    'A set of checkable buttons where no more than one of the buttons can be checked at a time.',
            },
        },
    },
    argTypes: {
        children: {
            description: 'The Radio Items',
        },
        description: {
            description: 'An optional description for the radio group',
        },
        name: {
            description:
                'The name of the group. Submitted with its owning form as part of a name/value pair',
        },
        variants: {
            description: 'Sets the custom styles, e.g. "Secondary", "Tertiary"',
        },
        wasSubmitted: {
            description: 'A boolean that alerts when form is submitted for error handling',
        },
    },
} as Meta;

const states = {
    default: 'Default',
    hasFocus: 'Has Focus',
    hasValidation: 'Has Validation',
    isDisabled: 'Is Disabled',
    selectedOption: 'Selected Option',
};

const Template: Story = ({ variations }) => {
    const selectRef = useRef(null);

    useEffect(() => {
        selectRef.current?.focus();
    }, []);

    return variations.map((variant, index) => {
        return (
            <div key={index} style={{ margin: '1.5em 1em' }}>
                <p style={{ fontWeight: '700' }}>{states[variant.state]}</p>
                <RadioGroup
                    defaultValue={variant.defaultValue}
                    description={variant.description}
                    disabled={variant.disabled}
                    name={variant.name}
                    required={variant.required}
                    variants={variant.variants}
                    wasSubmitted={variant.wasSubmitted}
                >
                    {variant.items.map((item, index) => {
                        return (
                            <RadioItem
                                id={item.id}
                                key={index}
                                name={item.name}
                                ref={item.ref ? selectRef : null}
                                value={item.value}
                            />
                        );
                    })}
                </RadioGroup>
            </div>
        );
    });
};

export const Primary = Template.bind({});
export const Secondary = Template.bind({});

Primary.args = {
    variations: [
        {
            description: { id: 'receive-newsletter-1', value: 'Receive Newsletter' },
            items: [
                { id: 'r1-yes', name: 'Yes', value: 'yes' },
                { id: 'r1-no', name: 'No', value: 'no' },
            ],
            name: 'newsletter-1',
            state: 'default',
        },
        {
            defaultValue: 'yes-2',
            description: { id: 'receive-newsletter-2', value: 'Receive Newsletter' },
            items: [
                { id: 'r2-yes', name: 'Yes', value: 'yes' },
                { id: 'r2-no', name: 'No', value: 'no' },
            ],
            name: 'newsletter-2',
            state: 'selectedOption',
        },
        {
            defaultValue: 'yes-3',
            description: { id: 'receive-newsletter-3', value: 'Receive Newsletter' },
            items: [
                { id: 'r3-yes', name: 'Yes', value: 'yes', ref: true },
                { id: 'r3-no', name: 'No', value: 'no' },
            ],
            name: 'newsletter-3',
            state: 'hasFocus',
        },
        {
            description: { id: 'receive-newsletter-4', value: 'Receive Newsletter' },
            items: [
                { id: 'r4-yes', name: 'Yes', value: 'yes' },
                { id: 'r4-no', name: 'No', value: 'no' },
            ],
            name: 'newsletter-4',
            required: true,
            state: 'hasValidation',
            wasSubmitted: true,
        },
        {
            description: { id: 'receive-newsletter-5', value: 'Receive Newsletter' },
            disabled: true,
            items: [
                { id: 'r5-yes', name: 'Yes', value: 'yes' },
                { id: 'r5-no', name: 'No', value: 'no' },
            ],
            name: 'newsletter-5',
            state: 'isDisabled',
        },
    ],
};
Secondary.args = {
    variations: [
        {
            description: { id: 'receive-newsletter-1', value: 'Receive Newsletter' },
            items: [
                { id: 'r1-yes', name: 'Yes', value: 'yes' },
                { id: 'r1-no', name: 'No', value: 'no' },
            ],
            name: 'newsletter-1',
            variants: ['secondary'],
            state: 'default',
        },
        {
            defaultValue: 'yes-2',
            description: { id: 'receive-newsletter-2', value: 'Receive Newsletter' },
            items: [
                { id: 'r2-yes', name: 'Yes', value: 'yes' },
                { id: 'r2-no', name: 'No', value: 'no' },
            ],
            name: 'newsletter-2',
            variants: ['secondary'],
            state: 'selectedOption',
        },
        {
            description: { id: 'receive-newsletter-3', value: 'Receive Newsletter' },
            items: [
                { id: 'r3-yes', name: 'Yes', value: 'yes' },
                { id: 'r3-no', name: 'No', value: 'no', ref: true },
            ],
            name: 'newsletter-3',
            variants: ['secondary'],
            state: 'hasFocus',
        },
        {
            description: { id: 'receive-newsletter-4', value: 'Receive Newsletter' },
            items: [
                { id: 'r4-yes', name: 'Yes', value: 'yes' },
                { id: 'r4-no', name: 'No', value: 'no' },
            ],
            name: 'newsletter-4',
            required: true,
            state: 'hasValidation',
            variants: ['secondary'],
            wasSubmitted: true,
        },
        {
            description: { id: 'receive-newsletter-5', value: 'Receive Newsletter' },
            disabled: true,
            items: [
                { id: 'r5-yes', name: 'Yes', value: 'yes' },
                { id: 'r5-no', name: 'No', value: 'no' },
            ],
            name: 'newsletter-5',
            variants: ['secondary'],
            state: 'isDisabled',
        },
    ],
};
