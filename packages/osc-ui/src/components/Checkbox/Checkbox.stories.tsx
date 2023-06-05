import type { Meta, Story } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';

import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';
import { checkboxSchema } from './mockSchema';

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
                <CheckboxGroup
                    description={variation.description}
                    disabled={variation.disabled}
                    required={variation.required}
                >
                    <Checkbox
                        defaultChecked={variation.defaultChecked}
                        icon={variation.icon}
                        id={variation.id}
                        key={index}
                        name={variation.name}
                        ref={variation.ref ? selectRef : null}
                        value={variation.value}
                        variants={variation.variants}
                        size={variation.size}
                    />
                </CheckboxGroup>
            </div>
        );
    });
};

const ValidationTemplate: Story = () => {
    const [errors, setErrors] = useState({
        termsAndConditions: ['Please accept the terms and conditions'],
    });

    return (
        <div style={{ margin: '1.5em 1em' }}>
            <CheckboxGroup
                errors={errors.termsAndConditions}
                description={{
                    id: 'contact-soon',
                    value: "If you'd rather we call you sooner, check the box below",
                }}
                required={true}
            >
                <Checkbox
                    defaultChecked={false}
                    errors={errors.termsAndConditions}
                    id="termsAndConditions"
                    name="termsAndConditions"
                    required={true}
                    setErrors={setErrors}
                    schema={checkboxSchema.termsAndConditions}
                    value="Accept the terms and conditions"
                />
            </CheckboxGroup>
        </div>
    );
};

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const GroupLabel = Template.bind({});
export const S = Template.bind({});
export const XL = Template.bind({});

Primary.args = {
    variations: [
        {
            id: 'call-1',
            name: 'contact',
            state: 'default',
            value: 'Call me as soon as possible',
            size: 'm',
        },
        {
            defaultChecked: true,
            id: 'call-2',
            name: 'contact',
            state: 'selectedOption',
            value: 'Call me as soon as possible',
            size: 'm',
        },
        {
            id: 'call-3',
            name: 'contact',
            ref: true,
            state: 'hasFocus',
            value: 'Call me as soon as possible',
            size: 'm',
        },
        {
            id: 'call-4',
            name: 'contact',
            required: true,
            state: 'hasValidation',
            value: 'Call me as soon as possible',
            size: 'm',
        },
        {
            disabled: true,
            id: 'call-5',
            name: 'contact',
            state: 'isDisabled',
            value: 'Call me as soon as possible',
            size: 'm',
        },
    ],
};
Secondary.args = {
    variations: [
        {
            icon: { id: 'check', className: 'c-checkbox__is-checked' },
            id: 'course-replacement-1',
            name: 'course-replacement',
            state: 'default',
            value: 'Course replacement cover',
            variants: ['secondary'],
            size: 'm',
        },
        {
            defaultChecked: true,
            icon: { id: 'check', className: 'c-checkbox__is-checked' },
            id: 'course-replacement-2',
            name: 'course-replacement',
            state: 'selectedOption',
            value: 'Course replacement cover',
            variants: ['secondary'],
            size: 'm',
        },
        {
            icon: { id: 'check', className: 'is-checked' },
            id: 'course-replacement-3',
            name: 'course-replacement',
            ref: true,
            state: 'hasFocus',
            value: 'Course replacement cover',
            variants: ['secondary'],
            size: 'm',
        },
        {
            icon: { id: 'check', className: 'is-checked' },
            id: 'course-replacement-4',
            name: 'course-replacement',
            required: true,
            state: 'hasValidation',
            value: 'Course replacement cover',
            variants: ['secondary'],
            size: 'm',
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
            size: 'm',
        },
    ],
};

export const Validation = ValidationTemplate.bind({});

Validation.parameters = {
    docs: {
        description: {
            story: 'Validation styling for the Checkbox',
        },
    },
};

S.args = {
    variations: [
        {
            id: 'call-1',
            name: 'contact',
            state: 'default',
            value: 'Call me as soon as possible',
            size: 's',
        },
        {
            defaultChecked: true,
            id: 'call-2',
            name: 'contact',
            state: 'selectedOption',
            value: 'Call me as soon as possible',
            size: 's',
        },
        {
            id: 'call-3',
            name: 'contact',
            ref: true,
            state: 'hasFocus',
            value: 'Call me as soon as possible',
            size: 's',
        },
        {
            id: 'call-4',
            name: 'contact',
            required: true,
            state: 'hasValidation',
            value: 'Call me as soon as possible',
            size: 's',
        },
        {
            disabled: true,
            id: 'call-5',
            name: 'contact',
            state: 'isDisabled',
            value: 'Call me as soon as possible',
            size: 's',
        },
    ],
};
XL.args = {
    variations: [
        {
            id: 'call-1',
            name: 'contact',
            state: 'default',
            value: 'Call me as soon as possible',
            size: 'xl',
        },
        {
            defaultChecked: true,
            id: 'call-2',
            name: 'contact',
            state: 'selectedOption',
            value: 'Call me as soon as possible',
            size: 'xl',
        },
        {
            id: 'call-3',
            name: 'contact',
            ref: true,
            state: 'hasFocus',
            value: 'Call me as soon as possible',
            size: 'xl',
        },
        {
            id: 'call-4',
            name: 'contact',
            required: true,
            state: 'hasValidation',
            value: 'Call me as soon as possible',
            size: 'xl',
        },
        {
            disabled: true,
            id: 'call-5',
            name: 'contact',
            state: 'isDisabled',
            value: 'Call me as soon as possible',
            size: 'xl',
        },
    ],
};
