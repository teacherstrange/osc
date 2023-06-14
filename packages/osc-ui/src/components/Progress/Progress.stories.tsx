import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { ProgressProps } from './Progress';
import { Progress } from './Progress';

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
    const [level, setLevel] = React.useState(args.progressLevel);

    React.useEffect(() => {
        if (args.updatedLevel) {
            const timer = setTimeout(() => {
                setLevel(args.updatedLevel);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [args.updatedLevel]);

    return (
        <div style={{ width: '300px' }}>
            <Progress progressLevel={level} />
        </div>
    );
};

export const Primary = ProgressTemplate.bind({});
export const UpdatedProgress = ProgressTemplate.bind({});

Primary.args = {
    progressLevel: 50,
};
UpdatedProgress.args = {
    progressLevel: 10,
    updatedLevel: 80,
};
