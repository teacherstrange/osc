import React, { useEffect, useState } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { classNames } from '../../utils/classNames';
import './progress.scss';

export interface ProgressProps {
    /**
     * Custom class
     */
    className?: string;
    /**
     * The level of progress - must be between 0 and 100
     */
    progressLevel?: number;
}

export const Progress = (props: ProgressProps) => {
    const { className, progressLevel = 0 } = props;
    const [progress, setProgress] = useState<number>(progressLevel);

    const classes = classNames('c-progress', className);

    useEffect(() => {
        if (progressLevel > 100) return;

        setProgress(progressLevel);
    }, [progressLevel]);

    if (progressLevel > 100) {
        console.error('progressLevel must be between 0 and 100');
        return null;
    }

    return (
        <ProgressPrimitive.Root className={classes} value={progress}>
            <ProgressPrimitive.Indicator
                className="c-progress__indicator"
                style={{ transform: `translateX(-${100 - progress}%)` }}
            />
        </ProgressPrimitive.Root>
    );
};
