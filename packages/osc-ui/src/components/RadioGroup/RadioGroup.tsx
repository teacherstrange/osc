import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementRef, ReactNode } from 'react';
import React, { forwardRef, useState } from 'react';
import { Label } from '../Label/Label';

import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import { getFieldError } from '../../utils/getFieldError';
import './radio-group.scss';

type Variants = 'secondary' | 'tertiary';

export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
    /**
     * The Radio Items
     */
    children: ReactNode;
    /**
     * An optional description for the radio group
     */
    description?: { id: string; value: string };
    /**
     * The name of the group. Submitted with its owning form as part of a name/value pair.
     */
    name: string;
    /**
     * Sets the custom styles, e.g. "Secondary", "Tertiary"
     */
    variants?: Variants[];
    /**
     * A boolean that alerts when form is submitted for error handling
     * @default false
     */
    wasSubmitted?: boolean;
}

export const RadioGroup = (props: RadioGroupProps) => {
    const {
        children,
        defaultValue,
        description,
        disabled,
        name,
        required,
        variants,
        wasSubmitted = false,
    } = props;

    const [value, setValue] = useState('');

    const modifiers = useModifier('c-radio-group', variants);
    const radioGroupClasses = classNames('c-radio-group', modifiers);

    const errorMessage = getFieldError(value, required);
    const displayError = wasSubmitted && errorMessage;

    return (
        <div>
            {description ? (
                <p className="c-radio-group__description" id={description?.id}>
                    {description?.value}
                </p>
            ) : null}
            <RadioGroupPrimitive.Root
                aria-label={name}
                aria-labelledby={description?.id}
                className={
                    displayError ? `${radioGroupClasses} c-radio-group--error` : radioGroupClasses
                }
                disabled={disabled}
                defaultValue={defaultValue}
                name={name}
                onValueChange={(value) => setValue(value)}
                required={required}
            >
                {children}
                {displayError ? (
                    <div className="c-radio-group__error-message" role="alert">
                        {errorMessage}
                    </div>
                ) : null}
            </RadioGroupPrimitive.Root>
        </div>
    );
};

export interface RadioItemProps extends ComponentPropsWithRef<typeof RadioGroupPrimitive.Item> {
    /**
     * Id used to reference the label to the item
     */
    id: string;
    /**
     * Name of the item which is passed onto the label and the user sees
     */
    name: string;
    /**
     * Value passed onto the Label and submitted with name
     */
    value: string;
}

export const RadioItem = forwardRef<ElementRef<typeof RadioGroupPrimitive.Item>, RadioItemProps>(
    (props: RadioItemProps, forwardedRef) => {
        const { id, name, value } = props;

        return (
            <div className="c-radio-group__item-container">
                <RadioGroupPrimitive.Item
                    aria-label={name}
                    className="c-radio-group__item"
                    id={id}
                    ref={forwardedRef}
                    value={value}
                >
                    <RadioGroupPrimitive.Indicator className="c-radio-group__indicator" />
                </RadioGroupPrimitive.Item>
                <Label htmlFor={id}>{name}</Label>
            </div>
        );
    }
);

RadioItem.displayName = 'RadioItem';
