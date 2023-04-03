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
     * An optional description for the checkbox
     */
    description?: { id: string; value: string };
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
            description,
            disabled,
            errors,
            icon,
            id,
            name,
            required,
            schema,
            setErrors,
            value,
            variants,
        } = props;

        const [checked, setChecked] = useState<string | boolean>(false);
        useEffect(() => {
            // Client side error handling - Sets any errors on an input in
            // accordance with the schema validation
            if (errors && errors.length > 0 && schema && setErrors) {
                clientSideValidation(name, schema, setErrors, [value]);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps -- should only update when the checked value changes
        }, [checked]);

        const modifiers = useModifier('c-checkbox__container', variants);
        const checkboxClasses = classNames('c-checkbox__container', modifiers);

        return (
            <div
                className={
                    errors && errors.length > 0
                        ? `${checkboxClasses} c-checkbox__container--error`
                        : `${checkboxClasses}`
                }
            >
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
                <Label name={value} htmlFor={id} />
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';
