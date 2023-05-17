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
}

export const Price = (props: PriceProps) => {
    const { children, className, compareAtPrice, sku } = props;

    const saleModifier = useModifier('c-price', 'on-sale');
    const classes = classNames('c-price', compareAtPrice ? saleModifier : '', className);

    // Here we're creating a slot for the compareAtPrice element to sit in.
    // This helps us to keep the amount of nested elements to a minimum
    // as well as merge the required classes.
    const SaleComponent = compareAtPrice ? Slot : 'span';

    return (
        <div className={classes}>
            <div className="o-flex">
                <span className="c-price__item t-font-xl u-text-bold u-color-primary u-mb-0">
                    {compareAtPrice ? (
                        <SaleComponent className="c-price__item c-price--strike u-text-reg u-color-neutral-600 u-mb-0">
                            {compareAtPrice}
                        </SaleComponent>
                    ) : null}

                    {children}
                </span>
            </div>

            {sku ? <span>Course code: {sku}</span> : null}
        </div>
    );
};
