import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type { ComponentPropsWithRef, ElementRef } from 'react';
import React, { forwardRef, useState } from 'react';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import { getFieldError } from '../../utils/getFieldError';
import { Icon } from '../Icon/Icon';
import { Label } from '../Label/Label';
import './checkbox.scss';

type Variants = 'secondary' | 'tertiary';

export interface CheckboxProps extends ComponentPropsWithRef<typeof CheckboxPrimitive.Root> {
    /**
     * An optional description for the checkbox
     */
    description?: { id: string; value: string };
    /**
     * Optional icon that can be placed inside the checkbox
     */
    icon?: { id: string; className: string };
    /**
     * Id used to reference the label to the checkbox
     */
    id: string;
    /**
     * Name of the item which is passed onto the label and
     * submitted with its owning form as part of a name/value pair.
     */
    name: string;
    /**
     * The value given as data when submitted with a name.
     */
    value: string;
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

export const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
    (props, forwardedRef) => {
        const {
            defaultChecked,
            description,
            disabled,
            icon,
            id,
            name,
            required,
            value,
            variants,
            wasSubmitted = false,
        } = props;

        const [checked, setChecked] = useState<string | boolean>(false);

        const errorMessage = getFieldError(checked, required);
        const displayError = wasSubmitted && errorMessage;

        const modifiers = useModifier('c-checkbox__container', variants);
        const checkboxClasses = classNames('c-checkbox__container', modifiers);

        return (
            <fieldset
                className={
                    displayError
                        ? `${checkboxClasses} c-checkbox__container--error`
                        : `${checkboxClasses}`
                }
            >
                {description ? (
                    <legend className="c-checkbox__description">{description?.value}</legend>
                ) : null}
                <CheckboxPrimitive.Root
                    aria-label={value}
                    className="c-checkbox"
                    defaultChecked={defaultChecked}
                    disabled={disabled}
                    id={id}
                    name={name}
                    onCheckedChange={(checked) => setChecked(checked)}
                    ref={forwardedRef}
                    required={required}
                    value={value}
                >
                    <CheckboxPrimitive.Indicator className="c-checkbox__indicator">
                        {icon ? <Icon id={icon.id} className={icon.className} /> : null}
                    </CheckboxPrimitive.Indicator>
                </CheckboxPrimitive.Root>
                <Label name={value} htmlFor={id} required={required} />
                {displayError ? (
                    <div className="c-checkbox__error-message" role="alert">
                        {errorMessage}
                    </div>
                ) : null}
            </fieldset>
        );
    }
);

Checkbox.displayName = 'Checkbox';
