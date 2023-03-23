import type { Dispatch, SetStateAction, TextareaHTMLAttributes } from 'react';
import React, { forwardRef, useEffect, useState } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';
import { clientSideValidation } from '../../utils/clientSideValidation';
import { Label } from '../Label/Label';
import './text-area.scss';
import { InputError } from '../TextInput/TextInput';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /**
     * Any error messages - initially set through server validation, but can be updated through client validation
     */
    errors?: string[] | undefined;
    /**
     * Id used to connect the textarea to the corresponding label
     */
    id: string;
    /**
     * The name for the label of the input field
     */
    label: string;
    /**
     * The name of the textarea which is passed to the Label
     */
    name: string;
    /**
     * The Zod Schema used for creating client side validation
     */
    schema?: ZodObject<ZodRawShape>;
    /**
     * Allows for client side validation once a server side error has been received
     */
    setErrors?: Dispatch<SetStateAction<any>>;
    /**
     * Sets the custom styles, e.g. "Secondary", "Tertiary"
     */
    variants?: string[];
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (props: TextAreaProps, forwardedRef) => {
        const {
            disabled,
            errors,
            id,
            label,
            name,
            required,
            schema,
            setErrors,
            variants,
            ...rest
        } = props;
        const [value, setValue] = useState('');

        useEffect(() => {
            if (errors && errors.length > 0 && schema && setErrors) {
                clientSideValidation(name, schema, setErrors, value);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps -- should only update when the value changes
        }, [value]);

        return (
            <div className="c-input__outer-container">
                <div
                    className={
                        errors && errors.length > 0
                            ? `c-input__container c-input__container--error`
                            : `c-input__container`
                    }
                >
                    <textarea
                        aria-invalid={errors ? true : false}
                        aria-describedby={errors ? `${id}-error` : undefined}
                        className="c-input  c-textarea"
                        disabled={disabled}
                        id={id}
                        name={name}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        ref={forwardedRef}
                        required={required}
                        {...rest}
                    />
                    <Label
                        htmlFor={id}
                        name={label}
                        variants={disabled ? ['disabled'] : null}
                        required={required}
                    />
                    {errors && errors.length > 0 ? <InputError errors={errors} id={name} /> : null}
                </div>
            </div>
        );
    }
);

TextArea.displayName = 'TextArea';
