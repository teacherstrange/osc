import type { Meta, Story } from '@storybook/react';
import React, { useEffect, useRef } from 'react';

import { ListBulletIcon } from '@radix-ui/react-icons';
import { Select, SelectItem } from './Select';

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
                    <div key={i} style={{ margin: '1.5em 1em' }}>
                        <p style={{ fontWeight: '700' }}>{states[select.state]}</p>
                        <Select
                            attributes={select.attributes}
                            defaultValue={select.defaultValue}
                            description={select.description}
                            groupVariants={select.groupVariants}
                            placeholder={select.placeholder}
                            ref={select.ref ? selectRef : null}
                            selectName={select.selectName}
                            wasSubmitted={select.wasSubmitted}
                        >
                            {items.map((item, index) => {
                                return (
                                    <SelectItem key={index} value={item.value}>
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

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Tertiary = Template.bind({});

const courseItems = [
    {
        itemAttributes: {},
        name: 'A Level Psychology',
        value: 'a-level-psychology',
    },
    {
        itemAttributes: {},
        name: 'A Level Computer Science',
        value: 'a-level-computer-science',
    },
    { itemAttributes: {}, name: 'A Level History', value: 'a-level-history' },
    {
        itemAttributes: {},
        name: 'A Level Sociology',
        value: 'a-level-sociology',
    },
    {
        itemAttributes: {},
        name: 'A Level Geography',
        value: 'a-level-geography',
    },
    { itemAttributes: {}, name: 'A Level French', value: 'a-level-french' },
    {
        itemAttributes: {},
        name: 'A Level German',
        value: 'a-level-german',
    },
    {
        itemAttributes: {},
        name: 'A Level Maths',
        value: 'a-level-maths',
    },
    { itemAttributes: {}, name: 'A Level Physics', value: 'a-level-physics' },
    {
        itemAttributes: {},
        name: 'A Level Biology',
        value: 'a-level-biology',
    },
];

Primary.args = {
    selects: [
        {
            attributes: { required: true },
            description: { label: 'Courses' },
            editor: 'select',
            groupVariants: [],
            items: courseItems,
            selectName: 'courses-1',
            state: 'default',
        },
        {
            attributes: {},
            description: { label: 'Courses' },
            defaultValue: 'a-level-psychology',
            editor: 'select',
            groupVariants: [],
            items: courseItems,
            selectName: 'courses-2',
            state: 'selectedOption',
        },
        {
            attributes: {},
            description: { label: 'Courses' },
            defaultValue: 'a-level-psychology',
            editor: 'select',
            groupVariants: [],
            items: courseItems,
            ref: true,
            selectName: 'courses-3',
            state: 'hasFocus',
        },
        {
            attributes: { disabled: true },
            defaultValue: 'a-level-maths',
            description: { label: 'Courses' },
            editor: 'select',
            groupVariants: [],
            items: courseItems,
            selectName: 'courses-4',
            state: 'isDisabled',
        },
        {
            attributes: { required: true },
            description: { label: 'Courses' },
            editor: 'select',
            items: courseItems,
            selectName: 'courses-5',
            state: 'hasValidation',
            wasSubmitted: true,
        },
        {
            attributes: {},
            description: { label: 'Courses' },
            editor: 'select',
            groupVariants: ['inline'],
            items: courseItems,
            selectName: 'courses-6',
            state: 'inline',
        },
    ],
};

Secondary.args = {
    selects: [
        {
            attributes: { required: true },
            description: { label: 'Courses' },
            editor: 'select',
            groupVariants: ['secondary'],
            items: courseItems,
            selectName: 'courses-1',
            state: 'default',
        },
        {
            attributes: {},
            description: { label: 'Courses' },
            defaultValue: 'a-level-psychology',
            editor: 'select',
            groupVariants: ['secondary'],
            items: courseItems,
            selectName: 'courses-2',
            state: 'selectedOption',
        },
        {
            attributes: {},
            description: { label: 'Courses' },
            defaultValue: 'a-level-psychology',
            editor: 'select',
            groupVariants: ['secondary'],
            items: courseItems,
            ref: true,
            selectName: 'courses-3',
            state: 'hasFocus',
        },
        {
            attributes: { disabled: true },
            defaultValue: 'a-level-maths',
            description: { label: 'Courses' },
            editor: 'select',
            groupVariants: ['secondary'],
            items: courseItems,
            selectName: 'courses-4',
            state: 'isDisabled',
        },
        {
            attributes: { required: true },
            description: { label: 'Courses' },
            editor: 'select',
            groupVariants: ['secondary'],
            items: courseItems,
            selectName: 'courses-5',
            state: 'hasValidation',
            wasSubmitted: true,
        },
        {
            attributes: {},
            description: { label: 'Courses' },
            editor: 'select',
            groupVariants: ['inline', 'secondary'],
            items: courseItems,
            selectName: 'courses-6',
            state: 'inline',
        },
    ],
};

const viewItems = [
    {
        itemAttributes: {},
        name: 'List View',
        value: 'list-view',
    },
    {
        itemAttributes: {},
        name: 'Grid View',
        value: 'grid-view',
    },
];

Tertiary.args = {
    selects: [
        {
            attributes: {},
            editor: 'select',
            groupVariants: ['tertiary'],
            items: viewItems,
            placeholder: 'Please Select',
            selectName: 'view-1',
            state: 'default',
        },
        {
            attributes: {},
            editor: 'select',
            groupVariants: ['tertiary'],
            items: viewItems,
            placeholder: 'List View',
            selectName: 'view-2',
            state: 'selectedOption',
        },
        {
            attributes: { disabled: true },
            editor: 'select',
            groupVariants: ['tertiary'],
            items: viewItems,
            placeholder: 'List View',
            selectName: 'view-3',
            state: 'isDisabled',
        },
        {
            attributes: { required: true },
            editor: 'select',
            groupVariants: ['tertiary'],
            items: viewItems,
            placeholder: 'Please Select',
            selectName: 'view-4',
            state: 'hasValidation',
            wasSubmitted: true,
        },
        {
            attributes: {},
            description: { label: 'Sort By: ' },
            editor: 'select',
            groupVariants: ['inline', 'tertiary', 'bold'],
            items: viewItems,
            placeholder: 'List View',
            selectName: 'view-5',
            state: 'inline',
        },
        {
            attributes: {},
            description: { icon: <ListBulletIcon /> },
            editor: 'select',
            groupVariants: ['inline', 'tertiary', 'bold'],
            items: viewItems,
            placeholder: 'List View',
            selectName: 'view-6',
            state: 'inlineIcon',
        },
    ],
};
