import { Slot } from '@radix-ui/react-slot';
import type { ReactNode } from 'react';
import React from 'react';
import { useModifier } from '../../hooks/useModifier';
import type { Maybe } from '../../types';
import { classNames } from '../../utils/classNames';
import './price.scss';

export interface PriceProps {
    /**
     * The content of the Price component
     * In a Hydrogen store this is most likely going to be a Money component
     */
    children: ReactNode;
    /**
     * Custom class
     */
    className?: string;
    /**
     * The sku of the course
     * @default undefined
     */
    sku?: Maybe<string>;
    /**
     * The compare at price of the course
     * In a Hydrogen store this is most likely going to be a Money component
     * @default undefined
     */
    compareAtPrice?: ReactNode;
    /**
     * Sets the overall font size of the component
     * @default md
     */
    size?: 'sm' | 'md';
}

export const Price = (props: PriceProps) => {
    const { children, className, compareAtPrice, sku, size = 'md' } = props;

    const saleModifier = useModifier('c-price', 'on-sale');
    const classes = classNames('c-price', compareAtPrice ? saleModifier : '', className);

    const sizeModifier = useModifier('c-price__item', size);
    const itemClasses = classNames('c-price__item', sizeModifier, 'u-mb-0');

    return (
        <div className={classes}>
            <div className="o-flex">
                <span className={itemClasses}>
                    {compareAtPrice ? (
                        // Here we're creating a slot for the compareAtPrice element to sit in.
                        // This helps us to keep the amount of nested elements to a minimum
                        // as well as merge the required classes.
                        <Slot
                            className={`${itemClasses} c-price__item--strike u-color-neutral-600`}
                        >
                            {compareAtPrice}
                        </Slot>
                    ) : null}

                    {children}
                </span>
            </div>

            {sku ? <span className="c-price__sku">Course code: {sku}</span> : null}
        </div>
    );
};
