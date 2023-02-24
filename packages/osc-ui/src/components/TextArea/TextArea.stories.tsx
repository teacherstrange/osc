import type { Meta, Story } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';
import { TextArea } from './TextArea';
import { textAreaSchema } from './mockSchema';

export default {
    title: 'osc-ui/TextArea',
    component: TextArea,
    parameters: {
        docs: {
            description: {
                component: 'TextArea component is a multi-line text input control',
            },
        },
    },
} as Meta;

const states = {
    default: 'Default',
    hasValue: 'Has Value',
    hasFocus: 'Has Focus',
    isDisabled: 'Is Disabled',
    hasValidation: 'Has Validation',
};

const Template: Story = ({ variations }) => {
    const selectRef = useRef(null);

    useEffect(() => {
        selectRef.current?.focus();
    }, []);

    return (
        <div>
            {variations.map((variant, i) => {
                return (
                    <div key={i} style={{ margin: '1em', width: '500px' }}>
                        <p style={{ fontWeight: '700', padding: '.5em 0' }}>
                            {states[variant.state]}
                        </p>
                        <TextArea {...variant} ref={variant.ref ? selectRef : null} />
                    </div>
                );
            })}
        </div>
    );
};
const ValidationTemplate: Story = () => {
    const [errors, setErrors] = useState({ enquiry: ['Field is required'] });
    return (
        <div style={{ margin: '1em', width: '500px' }}>
            <TextArea
                errors={errors.enquiry}
                id="enquiry"
                name="Enquiry"
                required={true}
                schema={textAreaSchema}
                setErrors={setErrors}
            />
        </div>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    variations: [
        {
            editor: 'input',
            id: 'enquiry-1',
            name: 'Enquiry',
            required: 'required',
            type: 'text',
            state: 'default',
        },
        {
            defaultValue:
                'Donec volutpat quis libero eu fringilla. Aenean ultrices, elit ut varius condimentum, libero ligula aliquam lorem, eu volutpat quam purus ut leo. Etiam consectetur viverra augue.',
            editor: 'input',
            id: 'enquiry-2',
            name: 'Enquiry',
            type: 'text',
            state: 'hasValue',
        },
        {
            defaultValue:
                'Donec volutpat quis libero eu fringilla. Aenean ultrices, elit ut varius condimentum, libero ligula aliquam lorem, eu volutpat quam purus ut leo. Etiam consectetur viverra augue.',
            editor: 'input',
            id: 'enquiry-3',
            name: 'Enquiry',
            ref: true,
            type: 'text',
            state: 'hasFocus',
        },
        {
            defaultValue:
                'Donec volutpat quis libero eu fringilla. Aenean ultrices, elit ut varius condimentum, libero ligula aliquam lorem, eu volutpat.',
            disabled: true,
            editor: 'input',
            id: 'enquiry-5',
            name: 'Enquiry',
            type: 'text',
            state: 'isDisabled',
        },
    ],
};

export const Validation = ValidationTemplate.bind({});

Validation.parameters = {
    docs: {
        description: {
            story: 'Validation styling for the Text Area',
        },
    },
};
