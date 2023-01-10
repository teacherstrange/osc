import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import type { ComponentPropsWithRef, ElementRef, ReactNode } from 'react';
import React, { forwardRef, useState } from 'react';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import { getFieldError } from '../../utils/getFieldError';
import { Icon } from '../Icon/Icon';
import { Label } from '../Label/Label';
import './select.scss';

type Description = {
    label?: string;
    icon?: ReactNode;
};
export interface Props extends ComponentPropsWithRef<typeof SelectPrimitive.Root> {
    /**
     * Description for the Select, can be a Label or an Icon
     */
    description?: Description;
    /**
     * Sets the custom styles, e.g. "Secondary", "Tertiary"
     */
    groupVariants?: string[];
    /**
     * A placeholder value for the Select, e.g. "Please Select"
     */
    placeholder?: string;
    /**
     * A boolean that alerts when form is submitted for error handling
     * @default false
     */
    wasSubmitted?: boolean;
}

export const Select = forwardRef<ElementRef<typeof SelectPrimitive.Trigger>, Props>(
    (props: Props, forwardedRef) => {
        const {
            children,
            description,
            disabled,
            groupVariants,
            placeholder,
            required,
            name,
            wasSubmitted = false,
        } = props;
        const [value, setValue] = useState('');

        const errorMessage = getFieldError(value, required);
        const displayError = wasSubmitted && errorMessage;

        const modifiers = useModifier('c-select', groupVariants);
        const selectClasses = classNames('c-select', modifiers);

        const setDescription = (desc: Description) => {
            if (desc?.label) return <Label htmlFor={name} name={desc.label} required={required} />;
            if (desc?.icon) return <Icon label={name}>{desc.icon}</Icon>;
        };
        return (
            <div className={displayError ? `${selectClasses} c-select--error` : selectClasses}>
                {setDescription(description)}
                <SelectPrimitive.Root
                    {...props}
                    disabled={disabled}
                    name={name}
                    onValueChange={(value) => setValue(value)}
                    required={required}
                >
                    <SelectPrimitive.Trigger
                        className="c-select__trigger"
                        id={name}
                        ref={forwardedRef}
                        aria-label={name}
                    >
                        <SelectPrimitive.Value placeholder={placeholder} />
                        <SelectPrimitive.Icon className="c-select__icon">
                            <ChevronDownIcon />
                        </SelectPrimitive.Icon>
                    </SelectPrimitive.Trigger>
                    <SelectPrimitive.Content className="c-select__content">
                        <SelectPrimitive.ScrollUpButton className="c-select__scroll-button">
                            <ChevronUpIcon />
                        </SelectPrimitive.ScrollUpButton>
                        <SelectPrimitive.Viewport className="c-select__viewport">
                            {children}
                        </SelectPrimitive.Viewport>
                        <SelectPrimitive.ScrollDownButton className="c-select__scroll-button">
                            <ChevronDownIcon />
                        </SelectPrimitive.ScrollDownButton>
                    </SelectPrimitive.Content>
                </SelectPrimitive.Root>
                {displayError ? (
                    <div className="c-select__error-message">{errorMessage}</div>
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
