import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type { ComponentPropsWithRef, Dispatch, ElementRef, SetStateAction } from 'react';
import React, { forwardRef, useEffect, useState } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import { clientSideValidation } from '../../utils/clientSideValidation';
import { Icon } from '../Icon/Icon';
import { Label } from '../Label/Label';
import './checkbox.scss';

type Variants = 'secondary' | 'tertiary';

export interface CheckboxProps extends ComponentPropsWithRef<typeof CheckboxPrimitive.Root> {
    /**
     * Any error messages - initially set through server validation, but can be updated through client validation
     */
    errors?: string[] | undefined;
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
     * The Zod Schema object used for validation
     */
    schema?: ZodObject<ZodRawShape>;
    /**
     * Allows for client side validation once a server side error has been received
     */
    setErrors?: Dispatch<SetStateAction<any>>;
    /**
     * Sets the size of the checkbox and the label
     * @default m
     */
    size?: 'm' | 'xl';
    /**
     * The value given as data when submitted with a name.
     */
    value: string;
    /**
     * Sets the custom styles, e.g. "Secondary", "Tertiary"
     */
    variants?: Variants[];
}

export const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
    (props, forwardedRef) => {
        const {
            defaultChecked,
            disabled,
            errors,
            icon,
            id,
            name,
            required,
            schema,
            setErrors,
            size = 'm',
            value,
            variants,
        } = props;

        const [checked, setChecked] = useState<string | boolean>(false);
        useEffect(() => {
            // Client side error handling - Sets any errors on an input in
            // accordance with the schema validation
            if (errors && errors.length > 0 && schema && setErrors) {
                // Checkbox schema looks whether there is an array of values, as this is what
                // gets submitted to the server. On the client, if checked is false then set to empty array
                clientSideValidation(name, schema, setErrors, checked ? ['true'] : []);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps -- should only update when the checked value changes
        }, [checked]);

        const modifiers = useModifier('c-checkbox__container', variants);
        const containerSizeModifier = useModifier('c-checkbox__container', size);
        const checkboxContainerClasses = classNames(
            'c-checkbox__container',
            containerSizeModifier,
            modifiers
        );

        const checkboxSizeModifier = useModifier('c-checkbox', size);
        const checkboxClasses = classNames('c-checkbox', checkboxSizeModifier);

        const indicatorSizeModifier = useModifier('c-checkbox__indicator', size);
        const indicatorClasses = classNames('c-checkbox__indicator', indicatorSizeModifier);

        return (
            <div
                className={
                    errors && errors.length > 0
                        ? `${checkboxContainerClasses} c-checkbox__container--error`
                        : `${checkboxContainerClasses}`
                }
            >
                <CheckboxPrimitive.Root
                    aria-label={value}
                    aria-describedby={`${id}-error`}
                    className={checkboxClasses}
                    defaultChecked={defaultChecked}
                    disabled={disabled}
                    id={id}
                    name={name}
                    onCheckedChange={(checked) => setChecked(checked)}
                    ref={forwardedRef}
                    required={required}
                    value={value}
                >
                    <CheckboxPrimitive.Indicator className={indicatorClasses}>
                        {icon ? <Icon id={icon.id} className={icon.className} /> : null}
                    </CheckboxPrimitive.Indicator>
                </CheckboxPrimitive.Root>
                <Label name={value} htmlFor={id} />
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';
