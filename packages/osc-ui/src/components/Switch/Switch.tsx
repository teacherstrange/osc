import { CheckIcon } from '@radix-ui/react-icons';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import type {
    ComponentPropsWithRef,
    Dispatch,
    ElementRef,
    HTMLAttributes,
    ReactNode,
    SetStateAction,
} from 'react';
import React, { forwardRef, useEffect, useState } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import { clientSideValidation } from '../../utils/clientSideValidation';
import { Label } from '../Label/Label';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import './switch.scss';
export interface SwitchProps extends ComponentPropsWithRef<typeof SwitchPrimitive.Root> {
    /**
     * Custom class name
     */
    className?: string;
    /**
     * A required description that is visually hidden for screen readers
     */
    description: string;
    /**
     * Any error messages - initially set through server validation, but can be updated through client validation
     */
    errors?: string[] | undefined;
    /**
     * Custom id
     *
     */
    id?: string;
    /**
     * Optional name to be visually shown alongside the toggle
     *
     */
    name?: string;
    /**
     * The Zod Schema used for validation
     */
    schema?: ZodObject<ZodRawShape>;
    /**
     * Allows for client side validation once a server side error has been received
     */
    setErrors?: Dispatch<SetStateAction<any>>;
    /**
     * The size of the switch
     * @default 'large'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The variant of the switch
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary';
    /**
     * A boolean that alerts when form is submitted for error handling
     * @default false
     */
    wasSubmitted?: boolean;
}

export const Switch = forwardRef<ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
    (props: SwitchProps, forwardedRef) => {
        const { description, errors, name, schema, setErrors } = props;
        const [value, setValue] = useState(false);

        const { className, id, size = 'large', variant = 'primary' } = props;
        const sizeModifier = useModifier('c-switch', size);
        const variantModifier = useModifier('c-switch', variant);
        const classes = classNames('c-switch', sizeModifier, variantModifier, className);

        const setChecked = () => {
            setValue(!value);
        };

        useEffect(() => {
            // Client side error handling - Sets any errors on an input in
            // accordance with the schema validation
            if (errors && schema && setErrors) {
                clientSideValidation(id, schema, setErrors, value);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps -- should only update when the value changes
        }, [value]);

        return (
            <>
                <div
                    className={
                        errors && errors.length > 0
                            ? 'c-switch__container c-switch__container--error'
                            : 'c-switch__container '
                    }
                >
                    <Label htmlFor={id} name={name} />
                    <SwitchPrimitive.Root
                        aria-invalid={errors ? true : false}
                        aria-describedby={errors ? `${id}-error` : undefined}
                        id={id}
                        className={!errors ? classes : `${classes} c-switch--error`}
                        onCheckedChange={setChecked}
                        {...props}
                        ref={forwardedRef}
                    >
                        <VisuallyHidden>{description}</VisuallyHidden>
                        <SwitchPrimitive.Thumb className="c-switch__thumb" asChild>
                            <span>
                                {variant === 'secondary' ? (
                                    <CheckIcon
                                        className="c-switch__thumb-icon"
                                        aria-hidden="true"
                                        focusable="false"
                                    />
                                ) : null}
                            </span>
                        </SwitchPrimitive.Thumb>
                    </SwitchPrimitive.Root>
                </div>
                {errors && errors.length > 0 ? (
                    <div className="c-switch--error-message" id={`${id}-error`} role="alert">
                        {errors}
                    </div>
                ) : null}
            </>
        );
    }
);

Switch.displayName = 'Switch';

interface SwitchGroupProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The children of the switch group
     */
    children: ReactNode;
}

export const SwitchGroup = (props: SwitchGroupProps) => {
    const { children, ...attr } = props;

    return (
        <div className="c-switch-group" {...attr}>
            {children}
        </div>
    );
};
