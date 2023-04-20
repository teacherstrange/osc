import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type {
    ComponentPropsWithoutRef,
    ComponentPropsWithRef,
    Dispatch,
    ElementRef,
    ReactNode,
    SetStateAction,
} from 'react';
import React, { forwardRef, useEffect, useState } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import { clientSideValidation } from '../../utils/clientSideValidation';
import { Label } from '../Label/Label';
import './radio-group.scss';

type Variants = 'secondary' | 'tertiary';

export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
    /**
     * The Radio Items
     */
    children: ReactNode;
    /**
     * A description for the radio group
     */
    description: { id: string; value: string };
    /**
     * Any error messages - initially set through server validation, but can be updated through client validation
     */
    errors?: string[] | undefined;
    /**
     * The name of the group. Submitted with its owning form as part of a name/value pair.
     */
    name: string;
    /**
     * The Zod Schema used for validation
     */
    schema?: ZodObject<ZodRawShape>;
    /**
     * Allows for client side validation once a server side error has been received
     */
    setErrors?: Dispatch<SetStateAction<any>>;
    /**
     * Sets the custom styles, e.g. "Secondary", "Tertiary"
     */
    variants?: Variants[];
}

export const RadioGroup = (props: RadioGroupProps) => {
    const {
        children,
        defaultValue,
        description,
        disabled,
        errors,
        name,
        required,
        schema,
        setErrors,
        variants,
    } = props;

    const [value, setValue] = useState('');

    useEffect(() => {
        // Client side error handling - Sets any errors on an input in
        // accordance with the schema validation
        if (errors && errors.length > 0 && schema && setErrors) {
            clientSideValidation(name, schema, setErrors, value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- should only update when the value changes
    }, [value]);

    const modifiers = useModifier('c-radio-group', variants);
    const radioGroupClasses = classNames('c-radio-group', modifiers);

    return (
        <fieldset
            className={
                errors && errors.length > 0
                    ? `${radioGroupClasses} c-radio-group--error`
                    : radioGroupClasses
            }
        >
            <legend className="c-radio-group__description" id={description.id}>
                {description.value}
                {required ? <span className="c-label__required">* </span> : null}
            </legend>
            <RadioGroupPrimitive.Root
                disabled={disabled}
                defaultValue={defaultValue}
                name={name}
                onValueChange={(value) => setValue(value)}
                required={required}
            >
                {children}
                {errors && errors.length > 0 ? (
                    <div className="c-radio-group__error-message" role="alert">
                        {errors.map((error, index) => (
                            <span key={index} className="u-pr-2xs">
                                {error}
                            </span>
                        ))}
                    </div>
                ) : null}
            </RadioGroupPrimitive.Root>
        </fieldset>
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
                <Label htmlFor={id} name={name} />
            </div>
        );
    }
);

RadioItem.displayName = 'RadioItem';
