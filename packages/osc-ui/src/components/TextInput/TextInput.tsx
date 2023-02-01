import type { InputHTMLAttributes, ReactNode } from 'react';
import React, { forwardRef, useState } from 'react';
import { useElement } from '../../hooks/useElement';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import { getFieldError } from '../../utils/getFieldError';
import { Label } from '../Label/Label';
import './text-input.scss';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

type IconType = {
    content: ReactNode;
    label: string;
    type?: string;
};

type Action = {
    icon?: IconType;
    type: string;
};

type Variants = 'secondary' | 'tertiary' | 'quaternary';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * An object that contains the type of action, e.g. Submit, plus an optional icon and label for accessibility
     */
    action?: Action;
    /**
     * An object that contains an Icon and a label for accessibility
     */
    icon?: IconType;
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

export const TextInput = forwardRef<HTMLInputElement, Props>((props: Props, forwardedRef) => {
    const {
        action,
        defaultValue,
        id,
        icon,
        name,
        required,
        type,
        variants,
        wasSubmitted = false,
        ...rest
    } = props;

    const [value, setValue] = useState<string | number | readonly string[]>(
        defaultValue ? defaultValue : ''
    );

    const errorMessage = getFieldError(value, required);
    const displayError = wasSubmitted && errorMessage;

    const element = useElement('c-input', type);
    const variantsModifier = useModifier(element, variants);
    const inputClasses = classNames('c-input', element, variantsModifier);

    const containerModifier = useModifier('c-input__container', variants);
    const containerClasses = classNames('c-input__container', containerModifier);

    const iconModifier = useModifier('c-input__icon', variants);
    const iconClasses = classNames('c-input__icon', iconModifier);

    const InputError = () => (
        <>
            <div className="c-input__icon c-input__icon--error">
                <Icon label={icon?.label}>{icon?.content}</Icon>
            </div>
            <span className="c-input__error-message" role="alert" id={`${id}-error`}>
                {errorMessage}
            </span>
        </>
    );

    const InputIcon = () => (
        <div className={iconClasses}>
            <Icon label={icon.label}>{icon.content}</Icon>
        </div>
    );

    const InputButton = () => (
        <Button className="c-input__button">
            <Icon label={action?.icon?.label}>{action?.icon?.content}</Icon>
        </Button>
    );

    return (
        <div className="c-input__outer-container">
            <div
                className={
                    displayError
                        ? `${containerClasses} c-input__container--error`
                        : `${containerClasses}`
                }
            >
                <input
                    aria-invalid={displayError ? true : false}
                    aria-describedby={displayError ? `${id}-error` : undefined}
                    className={inputClasses}
                    defaultValue={defaultValue}
                    id={id}
                    name={id}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    ref={forwardedRef}
                    type={type}
                    {...rest}
                />
                <Label
                    htmlFor={id}
                    name={name}
                    required={required}
                    variants={value ? ['filled'] : null}
                />
                {icon && icon.type !== 'error' ? <InputIcon /> : null}
                {displayError ? <InputError /> : null}
            </div>
            {action?.type === 'submit' ? <InputButton /> : null}
        </div>
    );
});

TextInput.displayName = 'TextInput';
