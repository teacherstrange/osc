import type { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';
import React, { forwardRef, useEffect, useState } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';
import { useElement } from '../../hooks/useElement';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import { clientSideValidation } from '../../utils/clientSideValidation';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Label } from '../Label/Label';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import './text-input.scss';

type Variants = 'secondary' | 'tertiary' | 'quaternary';

type Action = {
    /**
     * The id for the Icon
     */
    iconId: string;
    /**
     * Variant for the button
     */
    variant?: Variants;
    /**
     * The Size of the button
     */
    size?: 'sm' | 'md' | 'lg';
};

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * A action button that contains an icon
     */
    action?: Action;
    /**
     * Any error messages - initially set through server validation, but can be updated through client validation
     */
    errors?: string[] | undefined;
    /**
     * An optional icon for the input field
     */
    icon?: { id: string };
    /**
     * Id for the input field
     */
    id: string;
    /**
     * Name for the input field
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

export const TextInput = forwardRef<HTMLInputElement, Props>((props: Props, forwardedRef) => {
    const {
        action,
        defaultValue,
        errors,
        icon,
        id,
        name,
        required,
        schema,
        setErrors,
        type = 'text',
        variants,
        ...rest
    } = props;
    const [value, setValue] = useState(defaultValue ? defaultValue : '');

    useEffect(() => {
        // Client side error handling - Sets any errors on an input in
        // accordance with the schema validation
        if (errors && errors.length > 0 && schema && setErrors) {
            clientSideValidation(id, schema, setErrors, value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- should only update when the value changes
    }, [value]);

    const element = useElement('c-input', type);
    const variantsModifier = useModifier(element, variants);
    const inputClasses = classNames('c-input', element, variantsModifier);

    const containerModifier = useModifier('c-input__container', variants);
    const containerClasses = classNames('c-input__container', containerModifier);

    const iconModifier = useModifier('c-input__icon', variants);
    const iconClasses = classNames('c-input__icon', iconModifier);

    return (
        <div className="c-input__outer-container">
            <div
                className={
                    errors && errors.length > 0
                        ? `${containerClasses} c-input__container--error`
                        : `${containerClasses}`
                }
            >
                <input
                    aria-invalid={errors && errors.length > 0 ? true : false}
                    aria-describedby={errors && errors.length > 0 ? `${id}-error` : undefined}
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
                    // If Quaternary variation then wrap in VisuallyHidden to hide the label
                    hidden={variants?.some((variant) => variant === 'quaternary')}
                    htmlFor={id}
                    name={name}
                    required={required}
                    variants={value ? ['filled'] : null}
                />
                {icon ? <Icon className={iconClasses} id={icon.id} /> : null}
                {errors && errors.length > 0 ? <InputError errors={errors} id={id} /> : null}
            </div>
            {action ? <InputButton action={action} id={action.iconId} /> : null}
        </div>
    );
});

TextInput.displayName = 'TextInput';

interface InputButtonProps {
    action: Action;
    id: string;
}

const InputButton = (props: InputButtonProps) => {
    const {
        action: { size, variant },
        id,
    } = props;

    return (
        <Button className="c-input__button" variant={variant} size={size}>
            <VisuallyHidden>{id}</VisuallyHidden>
            <Icon id={id} />
        </Button>
    );
};

interface InputErrorProps {
    errors: string[] | undefined;
    id: string;
}

export const InputError = (props: InputErrorProps) => {
    const { errors, id } = props;
    return (
        <>
            <div className="c-input__icon c-input__icon--error">
                <Icon id="exclamation-mark" />
            </div>
            <div className="c-input__error-message" role="alert" id={`${id}-error`}>
                {errors.map((error, index) => (
                    <span key={index} className="u-pr-2xs">
                        {error}
                    </span>
                ))}
            </div>
        </>
    );
};
