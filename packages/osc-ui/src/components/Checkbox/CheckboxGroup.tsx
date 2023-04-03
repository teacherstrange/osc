import type * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type { ComponentPropsWithRef } from 'react';
import React from 'react';

import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import './checkbox.scss';

type Variants = 'secondary' | 'tertiary';

export interface CheckboxGroupProps extends ComponentPropsWithRef<typeof CheckboxPrimitive.Root> {
    /**
     * An optional description for the checkbox
     */
    description?: { id?: string; value?: string };
    /**
     * Any error messages - initially set through server validation, but can be updated through client validation
     */
    errors?: string[] | undefined;
    /**
     * Sets whether the field is required or not
     */
    required?: boolean;
    /**
     * Sets the custom styles, e.g. "Secondary", "Tertiary"
     */
    variants?: Variants[];
}

export const CheckboxGroup = (props: CheckboxGroupProps) => {
    const { children, description, errors, required, variants } = props;

    const modifiers = useModifier('c-checkbox__group-container', variants);
    const checkboxClasses = classNames('c-checkbox__group-container', modifiers);

    const uniqueErrors = Array.from(new Set(errors));

    return (
        <fieldset
            className={
                errors && errors.length > 0
                    ? `${checkboxClasses} c-checkbox__container--error`
                    : `${checkboxClasses}`
            }
        >
            {description ? (
                <legend className="c-checkbox__description">
                    {description?.value}
                    {required ? <span className="c-label__required">* </span> : null}
                </legend>
            ) : null}
            {children}
            {uniqueErrors && uniqueErrors.length > 0 ? (
                <div className="c-checkbox__error-message" role="alert">
                    {uniqueErrors.map((error, index) => (
                        <span key={index} className="u-pr-2xs">
                            {error}
                        </span>
                    ))}
                </div>
            ) : null}
        </fieldset>
    );
};
