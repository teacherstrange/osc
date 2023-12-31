import { Slot } from '@radix-ui/react-slot';
import type { ComponentPropsWithoutRef } from 'react';
import React, { createContext, useContext } from 'react';
import { classNames } from '../../utils/classNames';

import { useModifier } from '../../hooks/useModifier';
import './line-item.scss';

export interface SharedLineItemProps {
    /**
     * Custom class
     */
    className?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Line Item
 * -----------------------------------------------------------------------------------------------*/
export interface LineItemProps extends SharedLineItemProps, ComponentPropsWithoutRef<'div'> {
    /**
     *  Sets the variant modifier for the header
     * @default primary
     */
    variant?: 'primary' | 'secondary' | 'tertiary';
    /**
     * Merges its props onto its immediate child
     * @default false
     */
    asChild?: boolean;
}

const LineItemContext = createContext(null);

export const LineItem = (props: LineItemProps) => {
    const { asChild = false, children, className, variant = 'primary' } = props;

    const variantModifier = useModifier('c-line-item', variant);
    const classes = classNames('c-line-item', variantModifier, className);

    const Component = asChild ? Slot : 'div';

    return (
        <LineItemContext.Provider value={{ variant }}>
            <Component className={classes}>{children}</Component>
        </LineItemContext.Provider>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Line Item Header
 * -----------------------------------------------------------------------------------------------*/
export interface LineItemHeaderProps extends SharedLineItemProps, ComponentPropsWithoutRef<'h3'> {
    /**
     * Merges its props onto its immediate child
     * @default false
     */
    asChild?: boolean;
}

export const LineItemHeader = (props: LineItemHeaderProps) => {
    const { asChild = false, children, className } = props;
    const { variant } = useLineItemContext();

    const variantModifier = useModifier('c-line-item__header', variant);
    const classes = classNames('c-line-item__header', variantModifier, className);

    const Component = asChild ? Slot : 'h3';

    return <Component className={classes}>{children}</Component>;
};

/* -------------------------------------------------------------------------------------------------
 * Line Item Group
 * -----------------------------------------------------------------------------------------------*/
export interface LineItemGroupProps extends SharedLineItemProps, ComponentPropsWithoutRef<'div'> {
    /**
     * Merges its props onto its immediate child
     * @default false
     */
    asChild?: boolean;
}

export const LineItemGroup = (props: LineItemGroupProps) => {
    const { asChild = false, children, className } = props;
    const { variant } = useLineItemContext();

    const variantModifier = useModifier('c-line-item__group', variant);
    const classes = classNames('c-line-item__group', variantModifier, className);

    const Component = asChild ? Slot : 'div';

    return <Component className={classes}>{children}</Component>;
};

/* -------------------------------------------------------------------------------------------------
 * Line Item Price
 * -----------------------------------------------------------------------------------------------*/
export interface LineItemPriceProps extends SharedLineItemProps, ComponentPropsWithoutRef<'div'> {
    /**
     * Merges its props onto its immediate child
     * @default false
     */
    asChild?: boolean;
}

export const LineItemPrice = (props: LineItemPriceProps) => {
    const { asChild = false, children, className } = props;
    const { variant } = useLineItemContext();

    const variantModifier = useModifier('c-line-item__price', variant);
    const classes = classNames('c-line-item__price', variantModifier, className);

    const Component = asChild ? Slot : 'div';

    return <Component className={classes}>{children}</Component>;
};

/* -------------------------------------------------------------------------------------------------
 * useLineItemContext
 * -----------------------------------------------------------------------------------------------*/
const useLineItemContext = () => {
    const context = useContext(LineItemContext);

    // if `undefined`, throw an error
    if (context === undefined) {
        throw new Error('useLineItemContext was used outside of its Provider');
    }

    return context;
};
