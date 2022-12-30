import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import type { ComponentPropsWithRef, ElementRef, FC } from 'react';
import React, { useState } from 'react';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import { getFieldError } from '../../utils/getFieldError';
import { Icon } from '../Icon/Icon';
import { Label } from '../Label/Label';
import './select.scss';

type SelectAttributes = {
    disabled?: boolean;
    required?: boolean;
};

type Description = {
    label: string;
    icon: React.ReactNode;
};
export interface Props extends ComponentPropsWithRef<typeof SelectPrimitive.Root> {
    attributes?: SelectAttributes;
    description?: Description;
    groupVariants?: string[];
    placeholder?: string;
    selectName: string;
    wasSubmitted: boolean;
}

export const Select = React.forwardRef<ElementRef<typeof SelectPrimitive.Trigger>, Props>(
    (props: Props, forwardedRef) => {
        const {
            attributes,
            children,
            description,
            groupVariants,
            placeholder,
            selectName,
            wasSubmitted = false,
        } = props;

        const [value, setValue] = useState('');

        const errorMessage = getFieldError(value, attributes?.required);
        const displayError = wasSubmitted && errorMessage;

        const modifiers = useModifier('c-select', groupVariants);
        const selectClasses = classNames('c-select', modifiers);

        const setDescription = (desc: Props['description']) => {
            if (desc?.label)
                return (
                    <Label htmlFor={selectName} name={desc.label} required={attributes?.required} />
                );
            if (desc?.icon) return <Icon label={selectName}>{desc.icon}</Icon>;
        };

        return (
            <div className={displayError ? `${selectClasses} c-select--error` : selectClasses}>
                {setDescription(description)}
                <SelectPrimitive.Root
                    {...props}
                    disabled={attributes?.disabled}
                    name={selectName}
                    onValueChange={(value) => setValue(value)}
                    required={attributes?.required}
                >
                    <SelectPrimitive.Trigger
                        className="c-select__trigger"
                        id={selectName}
                        ref={forwardedRef}
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

export interface ItemProps extends ComponentPropsWithRef<typeof SelectPrimitive.Item> {
    className?: string;
}

export const SelectItem: FC<ItemProps> = React.forwardRef<
    ElementRef<typeof SelectPrimitive.Item>,
    ItemProps
>(({ children, ...props }, forwardedRef) => {
    return (
        <SelectPrimitive.Item {...props} ref={forwardedRef} className="c-select__item">
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
            <SelectPrimitive.ItemIndicator className="c-select__item-indicator">
                <CheckIcon />
            </SelectPrimitive.ItemIndicator>
        </SelectPrimitive.Item>
    );
});

Select.displayName = 'Select';
SelectItem.displayName = 'SelectItem';
