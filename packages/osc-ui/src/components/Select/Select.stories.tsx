import type { Meta, Story } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';

import { Select, SelectItem } from './Select';
import { courseItems, selectSchema } from './mockData';

export default {
    title: 'osc-ui/Select',
    component: Select,
    argTypes: {
        defaultValue: {
            description:
                'The value of the select when initially rendered. Use when you do not need to control the state of the select.',
        },
        description: {
            description: 'Description for the Select, can be a Label or an Icon',
        },
        disabled: {
            description: 'Sets a Select component as disabled',
        },
        groupVariants: { description: 'Sets the custom styles, e.g. "Secondary", "Tertiary"' },
        placeholder: { description: 'A placeholder value for the Select, e.g. "Please Select"' },
        ref: { description: 'A ref that is forwarded to the Select component' },
        required: { description: 'Sets a Select as being a required field' },
        name: {
            description:
                'The name of the select.  Submitted with its owning form as part of a name/value pair.',
        },
        wasSubmitted: {
            description: 'A boolean that alerts when form is submitted for error handling',
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    'Displays a list of options for the user to pick from—triggered by a button.',
            },
        },
    },
} as Meta;

const states = {
    default: 'Default',
    selectedOption: 'Selected Option',
    hasFocus: 'Has Focus',
    isDisabled: 'Is Disabled',
    hasValidation: 'Has Validation',
    inline: 'Inline',
    inlineIcon: 'Inline Icon',
};

const Template: Story = ({ selects }) => {
    const selectRef = useRef(null);

    useEffect(() => {
        selectRef.current?.focus();
    }, []);

    return (
        <div>
            {selects.map((select, i) => {
                const { items } = select;

                return (
                    <div key={i} style={{ margin: '1.5em 1em', width: '300px' }}>
                        <p style={{ fontWeight: '700' }}>{states[select.state]}</p>

                        <Select
                            defaultValue={select.defaultValue}
                            description={select.description}
                            disabled={select.disabled}
                            groupVariants={select.groupVariants}
                            placeholder={select.placeholder}
                            ref={select.ref ? selectRef : null}
                            required={select.required}
                            name={select.name}
                        >
                            {items.map((item, index) => {
                                return (
                                    <SelectItem key={index} {...item}>
                                        {item.name}
                                    </SelectItem>
                                );
                            })}
                        </Select>
                    </div>
                );
            })}
        </div>
    );
};

const ValidationTemplate: Story = () => {
    const [errors, setErrors] = useState({
        courses: ['Please choose a course'],
    });
    return (
        <div style={{ margin: '1.5em 1em', width: '300px' }}>
            <Select
                errors={errors.courses}
                required={true}
                name="courses"
                schema={selectSchema.courses}
                setErrors={setErrors}
            >
                {courseItems.map((item, index) => {
                    return (
                        <SelectItem key={index} {...item}>
                            {item.name}
                        </SelectItem>
                    );
                })}
            </Select>
        </div>
    );
};

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Tertiary = Template.bind({});
export const Validation = ValidationTemplate.bind({});

Primary.args = {
    selects: [
        {
            description: { label: 'Courses' },
            editor: 'select',
            groupVariants: [],
            items: courseItems,
            name: 'courses-1',
            required: true,
            state: 'default',
        },
        {
            description: { label: 'Courses' },
            defaultValue: 'a-level-history',
            editor: 'select',
            groupVariants: [],
            items: courseItems,
            name: 'courses-2',
            state: 'selectedOption',
        },
        {
            description: { label: 'Courses' },
            defaultValue: 'a-level-history',
            editor: 'select',
            groupVariants: [],
            items: courseItems,
            ref: true,
            name: 'courses-3',
            state: 'hasFocus',
        },
        {
            defaultValue: 'a-level-maths',
            description: { label: 'Courses' },
            disabled: true,
            editor: 'select',
            groupVariants: [],
            items: courseItems,
            name: 'courses-4',
            state: 'isDisabled',
        },
        {
            description: { label: 'Courses' },
            editor: 'select',
            items: courseItems,
            name: 'courses-5',
            required: true,
            state: 'hasValidation',
            wasSubmitted: true,
        },
        {
            description: { label: 'Courses' },
            editor: 'select',
            groupVariants: ['inline'],
            items: courseItems,
            name: 'courses-6',
            state: 'inline',
        },
    ],
};

Secondary.args = {
    selects: [
        {
            description: { label: 'Courses' },
            editor: 'select',
            groupVariants: ['secondary'],
            items: courseItems,
            name: 'courses-1',
            required: true,
            state: 'default',
        },
        {
            description: { label: 'Courses' },
            defaultValue: 'a-level-psychology',
            editor: 'select',
            groupVariants: ['secondary'],
            items: courseItems,
            name: 'courses-2',
            state: 'selectedOption',
        },
        {
            description: { label: 'Courses' },
            defaultValue: 'a-level-psychology',
            editor: 'select',
            groupVariants: ['secondary'],
            items: courseItems,
            ref: true,
            name: 'courses-3',
            state: 'hasFocus',
        },
        {
            defaultValue: 'a-level-maths',
            description: { label: 'Courses' },
            disabled: true,
            editor: 'select',
            groupVariants: ['secondary'],
            items: courseItems,
            name: 'courses-4',
            state: 'isDisabled',
        },
        {
            description: { label: 'Courses' },
            editor: 'select',
            groupVariants: ['secondary'],
            items: courseItems,
            name: 'courses-5',
            required: true,
            state: 'hasValidation',
            wasSubmitted: true,
        },
        {
            description: { label: 'Courses' },
            editor: 'select',
            groupVariants: ['inline', 'secondary'],
            items: courseItems,
            name: 'courses-6',
            state: 'inline',
        },
    ],
};

const viewItems = [
    {
        name: 'List View',
        value: 'list-view',
    },
    {
        name: 'Grid View',
        value: 'grid-view',
    },
];

Tertiary.args = {
    selects: [
        {
            editor: 'select',
            groupVariants: ['tertiary'],
            items: viewItems,
            placeholder: 'Please Select',
            name: 'view-1',
            state: 'default',
        },
        {
            editor: 'select',
            groupVariants: ['tertiary'],
            items: viewItems,
            placeholder: 'List View',
            name: 'view-2',
            state: 'selectedOption',
        },
        {
            disabled: true,
            editor: 'select',
            groupVariants: ['tertiary'],
            items: viewItems,
            placeholder: 'List View',
            name: 'view-3',
            state: 'isDisabled',
        },
        {
            editor: 'select',
            groupVariants: ['tertiary'],
            items: viewItems,
            placeholder: 'Please Select',
            name: 'view-4',
            required: true,
            state: 'hasValidation',
            wasSubmitted: true,
        },
        {
            description: { label: 'Sort By: ' },
            editor: 'select',
            groupVariants: ['inline', 'tertiary', 'bold'],
            items: viewItems,
            placeholder: 'List View',
            name: 'view-5',
            state: 'inline',
        },
        {
            description: { icon: 'list' },
            editor: 'select',
            groupVariants: ['inline', 'tertiary', 'bold'],
            items: viewItems,
            placeholder: 'List View',
            name: 'view-6',
            state: 'inlineIcon',
        },
    ],
};

Validation.args = {
    editor: 'select',
    items: courseItems,
    name: 'courses',
};
