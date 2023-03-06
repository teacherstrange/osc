import type { Meta, Story } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';

import { TextInput } from './TextInput';
import { textInputSchema } from './mockSchema';

export default {
    title: 'osc-ui/TextInput',
    component: TextInput,
    parameters: {
        docs: {
            description: {
                component: 'Text Input component with Label for inputting form data',
            },
        },
    },
    argTypes: {
        action: { description: 'An action, such as a button which accepts an icon and a label' },
        defaultValue: {
            description: 'The value of the select when initially rendered.',
        },
        disabled: {
            description: 'Sets a Select component as disabled',
        },
        id: {
            description:
                'The id of the select. Submitted with its owning form as part of a name/value pair.',
        },
        icon: {
            description:
                'An icon to be used with the input which requires both the Icon and a label for accessibility',
        },
        name: {
            description: 'The name of input shown to the user which is displayed in the Label',
        },
        placeholder: { description: 'A placeholder value for the input field' },
        ref: { description: 'A ref that is forwarded to the TextInput component' },
        required: { description: 'Sets a Select as being a required field' },
        variants: { description: 'Sets the custom styles, e.g. "Secondary", "Tertiary"' },
    },
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
                <div key={i} style={{ margin: '1em', width: '300px' }}>
                    <p style={{ fontWeight: '700', padding: '.5em 0' }}>{states[item.state]}</p>
                    <TextInput {...item} ref={item.ref ? selectRef : null} />
                </div>
            ))}
        </div>
    );
};
const ValidationTemplate: Story = () => {
    const [primaryStyleErrors, setFirstnameErrors] = useState({
        firstname: ['Field is required'],
    });
    const [secondaryStyleErrors, setLastnameErrors] = useState({ lastname: ['Field is required'] });
    const [tertiaryStyleErrors, setEmailErrors] = useState({ email: ['Invalid Email'] });

    return (
        <div>
            <div
                style={{
                    margin: '1em',
                    width: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                }}
            >
                <TextInput
                    errors={primaryStyleErrors.firstname}
                    id="firstname"
                    name="First Name"
                    setErrors={setFirstnameErrors}
                    schema={textInputSchema.firstname}
                    type="text"
                />
                <TextInput
                    errors={secondaryStyleErrors.lastname}
                    id="lastname"
                    name="Last Name"
                    setErrors={setLastnameErrors}
                    schema={textInputSchema.lastname}
                    type="text"
                    variants={['secondary']}
                />
                <TextInput
                    errors={tertiaryStyleErrors.email}
                    id="email"
                    name="Email"
                    setErrors={setEmailErrors}
                    schema={textInputSchema.email}
                    type="email"
                    variants={['tertiary']}
                />
            </div>
        </div>
    );
};

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Tertiary = Template.bind({});
export const Quaternary = Template.bind({});
export const Validation = ValidationTemplate.bind({});

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
            disabled: true,
            editor: 'input',
            id: 'full-name-5',
            type: 'text',
            variants: ['secondary'],
            state: 'isDisabled',
        },
    ],
};

Secondary.parameters = {
    docs: {
        description: {
            story: 'Secondary styling for the Text Input',
        },
    },
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
            disabled: true,
            editor: 'input',
            id: 'full-name-5',
            state: 'isDisabled',
            type: 'text',
            variants: ['tertiary'],
        },
    ],
};

Tertiary.parameters = {
    docs: {
        description: {
            story: 'Tertiary styling for the Text Input',
        },
    },
};

Quaternary.args = {
    items: [
        {
            action: {
                iconId: 'search',
                size: 'sm',
                variant: 'quaternary',
            },
            editor: 'input',
            id: 'search',
            name: 'Search',
            state: 'default',
            type: 'text',
            variants: ['quaternary'],
        },
        {
            action: {
                iconId: 'search',
                size: 'sm',
                variant: 'quaternary',
            },
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

Quaternary.parameters = {
    docs: {
        description: {
            story: 'Quaternary styling for the Text Input',
        },
    },
};

Validation.parameters = {
    docs: {
        description: {
            story: 'Validation styling for the Text Input',
        },
    },
};
