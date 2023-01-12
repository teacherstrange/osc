import type { Meta, Story } from '@storybook/react';
import React, { useEffect, useRef } from 'react';

import { CheckIcon } from '@radix-ui/react-icons';
import { Checkbox } from './Checkbox';

export default {
    title: 'osc-ui/Checkbox',
    component: Checkbox,
    parameters: {
        docs: {
            description: {
                component:
                    'A control that allows the user to toggle between checked and not checked.',
            },
        },
    },
} as Meta;

const states = {
    default: 'Default',
    groupLabel: 'Group Label',
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

    return variations.map((variation, index) => {
        return (
            <div key={index} style={{ margin: '1.5em 1em' }}>
                <p style={{ fontWeight: '700' }}>{states[variation.state]}</p>
                <Checkbox
                    defaultChecked={variation.defaultChecked}
                    description={variation.description}
                    disabled={variation.disabled}
                    icon={variation.icon}
                    id={variation.id}
                    key={index}
                    name={variation.name}
                    ref={variation.ref ? selectRef : null}
                    required={variation.required}
                    value={variation.value}
                    variants={variation.variants}
                    wasSubmitted={variation.wasSubmitted}
                />
            </div>
        );
    });
};

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const GroupLabel = Template.bind({});

Primary.args = {
    variations: [
        { id: 'call-1', name: 'contact', state: 'default', value: 'Call me as soon as possible' },
        {
            defaultChecked: true,
            id: 'call-2',
            name: 'contact',
            state: 'selectedOption',
            value: 'Call me as soon as possible',
        },
        {
            id: 'call-3',
            name: 'contact',
            ref: true,
            state: 'hasFocus',
            value: 'Call me as soon as possible',
        },
        {
            id: 'call-4',
            name: 'contact',
            required: true,
            state: 'hasValidation',
            value: 'Call me as soon as possible',
            wasSubmitted: true,
        },
        {
            disabled: true,
            id: 'call-5',
            name: 'contact',
            state: 'isDisabled',
            value: 'Call me as soon as possible',
        },
    ],
};
Secondary.args = {
    variations: [
        {
            icon: <CheckIcon />,
            id: 'course-replacement-1',
            name: 'course-replacement',
            state: 'default',
            value: 'Course replacement cover',
            variants: ['secondary'],
        },
        {
            defaultChecked: true,
            icon: <CheckIcon />,
            id: 'course-replacement-2',
            name: 'course-replacement',
            state: 'selectedOption',
            value: 'Course replacement cover',
            variants: ['secondary'],
        },
        {
            icon: <CheckIcon />,
            id: 'course-replacement-3',
            name: 'course-replacement',
            ref: true,
            state: 'hasFocus',
            value: 'Course replacement cover',
            variants: ['secondary'],
        },
        {
            icon: <CheckIcon />,
            id: 'course-replacement-4',
            name: 'course-replacement',
            required: true,
            state: 'hasValidation',
            value: 'Course replacement cover',
            variants: ['secondary'],
            wasSubmitted: true,
        },
    ],
};

GroupLabel.args = {
    variations: [
        {
            description: {
                id: 'contact-soon',
                value: "If you'd rather we call you sooner, check the box below",
            },
            id: 'call-5',
            name: 'contact',
            state: 'groupLabel',
            value: 'Call me as soon as possible',
        },
    ],
};
