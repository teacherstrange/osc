import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { classNames } from '../../utils/classNames';
import './progress.scss';
import { useModifier } from '../../hooks/useModifier';

export interface ProgressProps {
    /**
     * Custom class
     */
    className?: string;
    /**
     * Color for the progress indicator bar
     */
    colorVariant?: 'primary' | 'quaternary' | 'primary-gradient' | 'quaternary-gradient';
    /**
     * The level of progress - must be between 0 and 100
     */
    progressLevel?: number;
    /**
     * Thickness of the progress indicator
     */
    width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const THICKNESS = {
    sm: '5',
    md: '8',
    lg: '12',
    xl: '16',
    '2xl': '32',
} as const;

export const Progress = (props: ProgressProps) => {
    const { className, colorVariant = 'primary', progressLevel = 0, width = 'lg' } = props;
    const [progress, setProgress] = useState<number>(progressLevel);

    const variantModifier = useModifier('c-progress__indicator', colorVariant);
    const classes = classNames('c-progress', className);
    const indicatorClasses = classNames('c-progress__indicator', className, variantModifier);

    useEffect(() => {
        if (progressLevel > 100) return;

        setProgress(progressLevel);
    }, [progressLevel]);

    if (progressLevel > 100) {
        console.error('progressLevel must be between 0 and 100');
        return null;
    }

    return (
        <ProgressPrimitive.Root
            aria-label="Progress Bar"
            className={classes}
            style={{ ['--thickness' as string]: `${THICKNESS[width]}px` }}
            value={progress}
        >
            <ProgressPrimitive.Indicator
                className={indicatorClasses}
                style={{
                    transform: `translateX(-${100 - progress}%)`,
                }}
            />
        </ProgressPrimitive.Root>
    );
};

interface CircularProgressProps {
    /**
     * Inner content of the component
     */
    children?: ReactNode;
    /**
     * Color for the progress indicator bar
     */
    colorVariant?:
        | 'primary-gradient'
        | 'secondary-gradient'
        | 'tertiary-gradient'
        | 'quaternary-gradient';
    /**
     * The level of progress - must be between 0 and 100
     */
    progressLevel: number;
    /**
     * Overall width of the progress circle
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Thickness of the progress indicator
     */
    width?: 'sm' | 'md' | 'lg';
}

export const CircularProgress = (props: CircularProgressProps) => {
    const {
        children,
        colorVariant = 'quaternary-gradient',
        progressLevel,
        size = 'sm',
        width = 'md',
    } = props;

    const progressInDegrees = (progressLevel) => Math.round((360 / 100) * progressLevel);

    const [progress, setProgress] = useState<number>(progressInDegrees(progressLevel));

    const sizeModifier = useModifier('c-progress-circular', size);
    const colorModifier = useModifier('c-progress-circular__inner', colorVariant);
    const circularClasses = classNames('c-progress-circular', sizeModifier);
    const circularInnerClasses = classNames('c-progress-circular__inner', colorModifier);

    useEffect(() => {
        if (progressLevel > 100) return;

        setProgress(progressInDegrees(progressLevel));
    }, [progressLevel]);

    if (progressLevel > 100) {
        console.error('progressLevel must be between 0 and 100');
        return null;
    }
    if (!progressLevel) {
        console.error('progressLevel must be set');
        return null;
    }

    return (
        <div
            className={circularClasses}
            role="progressbar"
            aria-valuenow={progressLevel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuetext={`${progressLevel}%`}
            aria-label="Progress Bar"
        >
            <div
                className={circularInnerClasses}
                style={{
                    ['--progress' as string]: `${progress}deg`,
                    ['--thickness' as string]: `${THICKNESS[width]}px`,
                }}
            ></div>
            {children}
        </div>
    );
};

interface ProgressContentProps {
    /**
     * The content of the component
     */
    children?: ReactNode;
    /**
     * Optional class name
     */
    className?: string;
}

export const ProgressContent = (props: ProgressContentProps) => {
    const { children, className } = props;

    const classes = classNames('c-progress-circular__progress-content', className);

    return <div className={classes}>{children}</div>;
};
