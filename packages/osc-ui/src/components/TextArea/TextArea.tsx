import type { Dispatch, ReactNode, SetStateAction, TextareaHTMLAttributes } from 'react';
import React, { forwardRef, useEffect, useState } from 'react';
import type { ZodSchema } from 'zod';
import { clientSideValidation } from '../../utils/clientSideValidation';
import { Label } from '../Label/Label';
import './text-area.scss';
import { InputError } from '../TextInput/TextInput';

type IconType = {
    content: ReactNode;
    label: string;
    type?: string;
};

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /**
     * Any error messages - initially set through server validation, but can be updated through client validation
     */
    errors?: string[] | undefined;
    /**
     * An object that contains an Icon and a label for accessibility
     */
    icon?: IconType;
    /**
     * Id used to connect the textarea to the corresponding label
     */
    id: string;
    /**
     * The name of the textarea which is passed to the Label
     */
    name: string;
    /**
     * The Zod Schema used for creating client side validation
     */
    schema?: ZodSchema;
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
        const { disabled, errors, icon, id, name, required, schema, setErrors, variants, ...rest } =
            props;
        const [value, setValue] = useState('');

        useEffect(() => {
            if (errors) {
                clientSideValidation(id, schema, setErrors, value);
            }
        }, [value]);

        return (
            <div className="c-input__outer-container">
                <div
                    className={
                        errors
                            ? `c-input__container c-input__container--error`
                            : `c-input__container`
                    }
                >
                    <textarea
                        className="c-input  c-textarea"
                        disabled={disabled}
                        id={id}
                        name={id}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        ref={forwardedRef}
                        required={required}
                        {...rest}
                    />
                    <Label
                        htmlFor={id}
                        name={name}
                        variants={disabled ? ['disabled'] : null}
                        required={required}
                    />
                    {errors ? <InputError errors={errors} id={id} /> : null}
                </div>
            </div>
        );
    }
);

TextArea.displayName = 'TextArea';
