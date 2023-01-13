import type { Meta, Story } from '@storybook/react';
import React, { useEffect, useRef } from 'react';

import { TextArea } from './TextArea';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

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
};

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
                    <div key={i} style={{ margin: '1em' }}>
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

export const Primary = Template.bind({});

Primary.args = {
    variations: [
        {
            cols: 65,
            editor: 'input',
            id: 'enquiry-1',
            name: 'Enquiry',
            required: 'required',
            rows: 2,
            type: 'text',
            state: 'default',
        },
        {
            cols: 65,
            defaultValue:
                'Donec volutpat quis libero eu fringilla. Aenean ultrices, elit ut varius condimentum, libero ligula aliquam lorem, eu volutpat quam purus ut leo. Etiam consectetur viverra augue.',
            editor: 'input',
            id: 'enquiry-2',
            name: 'Enquiry',
            rows: 2,
            type: 'text',
            state: 'hasValue',
        },
        {
            cols: 65,
            defaultValue:
                'Donec volutpat quis libero eu fringilla. Aenean ultrices, elit ut varius condimentum, libero ligula aliquam lorem, eu volutpat quam purus ut leo. Etiam consectetur viverra augue.',
            editor: 'input',
            id: 'enquiry-3',
            name: 'Enquiry',
            ref: true,
            rows: 2,
            type: 'text',
            state: 'hasFocus',
        },
        {
            cols: 65,
            editor: 'input',
            id: 'enquiry-4',
            icon: {
                content: <ExclamationTriangleIcon />,
                label: 'Exclamation Triangle Icon',
                type: 'error',
            },
            name: 'Enquiry',
            required: true,
            rows: 2,
            type: 'text',
            state: 'hasValidation',
            wasSubmitted: true,
        },
        {
            cols: 65,
            defaultValue:
                'Donec volutpat quis libero eu fringilla. Aenean ultrices, elit ut varius condimentum, libero ligula aliquam lorem, eu volutpat.',
            disabled: true,
            editor: 'input',
            id: 'enquiry-5',
            name: 'Enquiry',
            rows: 2,
            type: 'text',
            state: 'isDisabled',
        },
    ],
};
