import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';
import React, { useRef } from 'react';
import type { FlourishHeights, FlourishObject, FlourishWidths } from '../../types';
import { classNames } from '../../utils/classNames';
import './flourish.scss';

// TODO: Tests

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
}

export const Flourishes = (props: FlourishesProps) => {
    const { children, className, color, variant, pattern } = props;
    const containerRef = useRef<HTMLDivElement | null>(null);

    const classes = classNames('c-flourish-content', className);

    const handleMouseMove = (e: MouseEvent) => {
        const container = containerRef.current;
        const flourishNodes: NodeListOf<HTMLElement> = container.querySelectorAll('.c-flourish');

        // Store cursor position as variables
        let curX = e.clientX;
        let curY = e.clientY;

        flourishNodes.forEach((flourish, i) => {
            flourish.style.transform = `
                rotate(${pattern[i].initial.rotate}deg)
                translate(${curX / -80}px, ${curY / -80}px)
            `;
        });
    };

    const handleMouseLeave = () => {
        const container = containerRef.current;
        const flourishNodes: NodeListOf<HTMLElement> = container.querySelectorAll('.c-flourish');

        flourishNodes.forEach((flourish, i) => {
            flourish.style.transform = `rotate(${pattern[i].initial.rotate}deg)`;
        });
    };

    return (
        <>
            <div className={classes} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                {children}
            </div>

            <div className="c-flourish__container" ref={containerRef}>
                {pattern.map((flourish, index) => (
                    <Flourish
                        key={index}
                        width={flourish.size.w}
                        height={flourish.size.h}
                        color={color}
                        className={`c-flourish--${variant}`}
                        style={{
                            transform: `rotate(${flourish.initial.rotate}deg)`,
                        }}
                    />
                ))}
            </div>
        </>
    );
};

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
    const classes = classNames('c-flourish', `c-flourish-color--${color}`, className);

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
