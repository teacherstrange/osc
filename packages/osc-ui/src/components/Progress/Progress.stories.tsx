import type { Meta } from '@storybook/react';
import React from 'react';

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

const ProgressTemplate = ({ variations }) => {
    return variations.map((variation) => (
        <>
            <p>{variation.variant}</p>
            <div style={{ width: '300px', margin: '16px', padding: '16px' }}>
                <Progress
                    colorVariant={variation.colorVariant}
                    progressLevel={variation.progressLevel}
                    width={variation.width}
                />
            </div>
        </>
    ));
};

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
    variations: [
        {
            colorVariant: 'primary',
            progressLevel: 30,
            variant: 'Small',
            width: 'sm',
        },
        {
            colorVariant: 'quaternary',
            progressLevel: 50,
            variant: 'Medium',
            width: 'md',
        },
        {
            colorVariant: 'primary-gradient',
            progressLevel: 65,
            variant: 'Large',
            width: 'lg',
        },
        {
            colorVariant: 'quaternary-gradient',
            progressLevel: 80,
            variant: 'Extra Large',
            width: 'xl',
        },
        {
            colorVariant: 'quaternary-gradient',
            progressLevel: 95,
            variant: '2XL',
            width: '2xl',
        },
    ],
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
