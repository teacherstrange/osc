import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';
import React, { forwardRef, useRef } from 'react';
import type { FlourishHeights, FlourishObject, FlourishWidths } from '../../types';
import { classNames } from '../../utils/classNames';
import { restoreNodePosition, translateNodes } from '../../utils/handleMouseEvents';
import { mergeEventHandlers } from '../../utils/mergeEventHandlers';
import { throttle } from '../../utils/throttle';
import './flourish.scss';

export interface FlourishesProps {
    /**
     * The content of the Flourishes
     */
    children?: ReactNode;
    /**
     * Custom class
     */
    className?: string;
    /**
     * Color of the flourish
     */
    color: string | 'multicolor';
    /**
     * Pattern variant
     */
    pattern: FlourishObject[];
    /**
     * Variant of the flourish
     */
    variant: string;
    /**
     * Sets a modifier to increase the z-index of the pattern
     */
    isAboveContent?: boolean;
    /**
     * Set the size the flourishes will calculate against
     */
    size?: number;
    /**
     * Mouse move event to pass to child container
     */
    onMouseMove?: (e: MouseEvent) => void;
    /**
     * Mouse leave event to pass to child container
     */
    onMouseLeave?: (e: MouseEvent) => void;
}

export const Flourishes = forwardRef<HTMLDivElement, FlourishesProps>((props, forwardedRef) => {
    const {
        children,
        className,
        color,
        variant,
        pattern,
        isAboveContent,
        size,
        onMouseMove,
        onMouseLeave,
    } = props;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const interval = 120;

    const classes = classNames('c-flourish-content', className);

    const throttledTranslateNodes = throttle(translateNodes, interval);
    const throttledRestoreNodePosition = throttle(restoreNodePosition, interval);

    const handleMouseMove = mergeEventHandlers<MouseEvent>(onMouseMove, (e) => {
        throttledTranslateNodes(e, containerRef, '.c-flourish', pattern);
    });

    const handleMouseLeave = mergeEventHandlers<MouseEvent>(onMouseLeave, () => {
        throttledRestoreNodePosition(containerRef, 'c-flourish', pattern);
    });

    return (
        <>
            <div
                className={classes}
                onMouseMove={handleMouseMove}
                ref={forwardedRef}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>

            <div
                className={`c-flourish__container ${
                    isAboveContent ? 'c-flourish__container--above' : ''
                } o-container`}
                ref={containerRef}
            >
                {pattern.map((flourish, index) => (
                    <Flourish
                        key={index}
                        width={flourish.size.w}
                        height={flourish.size.h}
                        color={color}
                        maxHeight={size}
                        className={`c-flourish--${variant}`}
                        style={{
                            transform: `rotate(${flourish.initial.rotate}deg)`,
                        }}
                    />
                ))}
            </div>
        </>
    );
});
Flourishes.displayName = 'Flourishes';

/* -------------------------------------------------------------------------------------------------
 * Flourish
 * -----------------------------------------------------------------------------------------------*/
export interface FlourishProps extends ComponentPropsWithoutRef<'span'> {
    /**
     * Custom class
     */
    className?: string;
    /**
     * Width of the flourish as a sixteenth.
     */
    width: FlourishWidths;
    /**
     * Height of the flourish as a sixteenth.
     */
    height: FlourishHeights;
    /**
     * Color of the flourish
     */
    color: string;
    /**
     * Maximum height of the largest flourish
     * The other sizes are calculated based on this
     */
    maxHeight?: number;
}

export const Flourish = (props: FlourishProps) => {
    const { width, height, color, maxHeight = 320, className, ...rest } = props;
    const classes = classNames('c-flourish', `c-flourish--color-${color}`, className);

    /**
     * Converts a string fraction to a decimal.
     *
     * @param {string[]} fraction - The fraction to be converted.
     * @return {number} The decimal equivalent of the input fraction.
     */
    const fractionToDecimal = (fraction: string) => {
        const [numerator, denominator] = fraction.split('/');

        return Number(numerator) / Number(denominator);
    };

    /**
     * Calculates the size of an element based on the width.
     *
     * @param {string} width - The width of the element.
     * @return {number} The size of the element.
     */
    const calculateSize = (width: number) => width * maxHeight;

    const calculatedWidth = calculateSize(fractionToDecimal(width));
    const calculatedHeight = calculateSize(fractionToDecimal(height));

    return (
        <span
            className={classes}
            aria-hidden="true"
            {...rest}
            style={{
                ...rest.style,
                width: calculatedWidth,
                height: calculatedHeight,
            }}
        />
    );
};
