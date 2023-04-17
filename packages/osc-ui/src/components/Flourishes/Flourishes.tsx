import type { ComponentPropsWithoutRef } from 'react';
import React from 'react';
import type { Themes } from '../../types';
import { classNames } from '../../utils/classNames';
import './flourishes.scss';

/* -------------------------------------------------------------------------------------------------
 * Flourish
 * -----------------------------------------------------------------------------------------------*/
export interface FlourishProps extends ComponentPropsWithoutRef<'span'> {
    /**
     * Width of the flourish as a sixteenth.
     */
    width: Widths;
    /**
     * Height of the flourish as a sixteenth.
     */
    height: Heights;
    /**
     * Color of the flourish
     */
    color: Colors;
    /**
     * Maximum height of the largest flourish
     * The other sizes are calculated based on this
     */
    maxHeight?: number;
}

export const Flourish = (props: FlourishProps) => {
    const { width, height, color, maxHeight = 320, ...rest } = props;
    const classes = classNames('c-flourish', `u-bg-color-gradient-${color}`);

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
            style={{
                backgroundColor: 'var(--color-primary)',
                width: calculatedWidth,
                height: calculatedHeight,
            }}
            {...rest}
            // style={{
            //     transform: `rotate(${flourish.initial.rotate}deg)`,
            //     top: `${flourish.initial.y}%`,
            //     left: `${flourish.initial.x}%`,
            // }}
        />
    );
};
