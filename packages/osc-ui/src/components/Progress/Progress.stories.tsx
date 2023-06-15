import type { Meta, Story } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import type { ProgressProps } from './Progress';
import { CircularProgress, Progress } from './Progress';

export default {
    title: 'osc-ui/Progress',
    component: Progress,
    parameters: {
        docs: {
            description: {
                component:
                    'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
            },
        },
    },
    argTypes: {
        className: {
            description: 'Custom class',
        },
        progressLevel: {
            description: 'Sets the level of progress',
        },
    },
} as Meta;

const ProgressTemplate: Story<ProgressProps & { updatedLevel: number }> = (args) => {
    const [level, setLevel] = useState(args.progressLevel);

const CircularProgressTemplate = ({ variations }) => {
    return variations.map((variation) => (
        <>
            <div style={{ margin: '16px', padding: '16px' }}>
                <p>{variation.variant}</p>
                <CircularProgress
                    colorVariant={variation.colorVariant}
                    progressLevel={variation.progressLevel}
                    showPercentageIndicator={variation.showPercentageIndicator}
                    size={variation.size}
                    width={variation.width}
                />
            </div>
        </>
    ));
};

export const Primary = ProgressTemplate.bind({});
export const CircularProgressVariant = CircularProgressTemplate.bind({});

Primary.args = {
    progressLevel: 50,
};

CircularProgressVariant.args = {
    variations: [
        {
            colorVariant: 'quaternary-gradient',
            progressLevel: 40,
            showPercentageIndicator: true,
            size: 'sm',
            variant: 'Small',
            width: 'sm',
        },
        {
            colorVariant: 'secondary-gradient',
            progressLevel: 60,
            showPercentageIndicator: true,
            size: 'md',
            variant: 'Medium',
            width: 'md',
        },
        {
            colorVariant: 'primary-gradient',
            progressLevel: 80,
            size: 'lg',
            variant: 'Large, no percentage indicator',
            width: 'lg',
        },
    ],
};
