import { CheckIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import type { ComponentPropsWithRef, Dispatch, ElementRef, SetStateAction } from 'react';
import React, { forwardRef, useEffect, useState } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import { Icon } from '../Icon/Icon';
import { Label } from '../Label/Label';
import './select.scss';
import { clientSideValidation } from '../../utils/clientSideValidation';

type Description = {
    label?: string;
    icon?: string;
};

type GroupVariants = 'secondary' | 'tertiary' | 'inline' | 'bold';

// type Ex1 = GroupVariants<{ firstName: string }>;
export interface Props extends ComponentPropsWithRef<typeof SelectPrimitive.Root> {
    /**
     * Description for the Select, can be a Label or an Icon
     */
    description?: Description;
    /**
     * Any error messages - initially set through server validation, but can be updated through client validation
     */
    errors?: string[] | undefined;
    /**
     * Sets the custom styles, e.g. "Secondary", "Tertiary"
     */
    groupVariants?: GroupVariants[];
    /**
     * A placeholder value for the Select, e.g. "Please Select"
     */
    placeholder?: string;
    /**
     * The Zod Schema used for validation
     */
    schema?: ZodObject<ZodRawShape>;
    /**
     * Allows for client side validation once a server side error has been received
     */
    setErrors?: Dispatch<SetStateAction<any>>;
}

export const Select = forwardRef<ElementRef<typeof SelectPrimitive.Trigger>, Props>(
    (props: Props, forwardedRef) => {
        const {
            children,
            description,
            disabled,
            errors,
            groupVariants,
            placeholder,
            required,
            name,
            schema,
            setErrors,
        } = props;
        const [value, setValue] = useState('');
        const [isOpen, setIsOpen] = useState(false);

        useEffect(() => {
            // Client side error handling - Sets any errors on an input in
            // accordance with the schema validation
            if (errors && errors.length > 0 && schema && setErrors) {
                clientSideValidation(name, schema, setErrors, value);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps -- should only update when the value changes
        }, [value]);

        const modifiers = useModifier('c-select', groupVariants);
        const selectClasses = classNames('c-select', modifiers);

        const setDescription = (desc: Description) => {
            if (desc?.label)
                return (
                    <Label
                        htmlFor={name}
                        name={desc.label}
                        onClickHandler={() => setIsOpen(!isOpen)}
                        required={required}
                    />
                );
            if (desc?.icon) return <Icon id={desc.icon} />;
        };
        return (
            <div
                className={
                    errors && errors.length > 0 ? `${selectClasses} c-select--error` : selectClasses
                }
            >
                {setDescription(description)}
                <SelectPrimitive.Root
                    {...props}
                    onOpenChange={() => setIsOpen(!isOpen)}
                    disabled={disabled}
                    name={name}
                    onValueChange={(value) => setValue(value)}
                    open={isOpen}
                    required={required}
                >
                    <SelectPrimitive.Trigger
                        className="c-select__trigger"
                        id={name}
                        ref={forwardedRef}
                        aria-label={name}
                    >
                        <SelectPrimitive.Value placeholder={placeholder} />
                        <Icon className="c-select__icon" id="chevron-down" />
                    </SelectPrimitive.Trigger>
                    <SelectPrimitive.Content className="c-select__content">
                        <SelectPrimitive.ScrollUpButton className="c-select__scroll-button">
                            <Icon id="chevron-up" />
                        </SelectPrimitive.ScrollUpButton>
                        <SelectPrimitive.Viewport className="c-select__viewport">
                            {children}
                        </SelectPrimitive.Viewport>
                        <SelectPrimitive.ScrollDownButton className="c-select__scroll-button">
                            <Icon id="chevron-down" />
                        </SelectPrimitive.ScrollDownButton>
                    </SelectPrimitive.Content>
                </SelectPrimitive.Root>
                {errors && errors.length > 0 ? (
                    <div className="c-select__error-message">
                        {errors.map((error, index) => (
                            <span key={index} className="u-pr-2xs">
                                {error}
                            </span>
                        ))}
                    </div>
                ) : null}
            </div>
        );
    }
);

export interface ItemProps extends ComponentPropsWithRef<typeof SelectPrimitive.Item> {}

export const SelectItem = forwardRef<ElementRef<typeof SelectPrimitive.Item>, ItemProps>(
    ({ children, ...props }, forwardedRef) => {
        return (
            <SelectPrimitive.Item {...props} ref={forwardedRef} className="c-select__item">
                <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="c-select__item-indicator">
                    <CheckIcon />
                </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
        );
    }
);

Select.displayName = 'Select';
SelectItem.displayName = 'SelectItem';
