import type { Meta } from '@storybook/react';
import React from 'react';

import { CircularProgress, Progress, ProgressContent } from './Progress';

export default {
    title: 'osc-ui/Progress',
    component: Progress,
    subcomponents: { ProgressContent },
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
        colorVariant: {
            description: 'Sets the color of the progress indicator',
        },
        progressLevel: {
            description: 'Sets the level of progress',
        },
        size: {
            description:
                'Sets the overall width of the progress bar, only applicable on the Circular Progress ',
        },
        width: {
            description: 'Sets the thickness of the progress indicator',
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

const CircularProgressTemplate = (args) => {
    return (
        <div style={{ margin: '16px', padding: '16px', width: '50px' }}>
            <CircularProgress
                colorVariant={args.colorVariant}
                progressLevel={args.progressLevel}
                width={args.width}
            >
                <ProgressContent>
                    <div>{args.progressLevel}</div>
                </ProgressContent>
            </CircularProgress>
        </div>
    );
};
const CircularProgressTemplateWithContent = (args) => {
    return (
        <div style={{ margin: '16px', padding: '16px' }}>
            <CircularProgress
                colorVariant={args.colorVariant}
                progressLevel={args.progressLevel}
                width={args.width}
            >
                <ProgressContent>
                    <div>{args.progressLevel}% Complete</div>
                </ProgressContent>
            </CircularProgress>
        </div>
    );
};

export const Primary = ProgressTemplate.bind({});
export const CircularProgressVariant = CircularProgressTemplate.bind({});
export const CircularProgressVariantWithContent = CircularProgressTemplateWithContent.bind({});

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
    colorVariant: 'quaternary-gradient',
    progressLevel: 40,
    width: 'sm',
};

CircularProgressVariantWithContent.args = {
    colorVariant: 'secondary-gradient',
    progressLevel: 60,
    width: 'md',
};
