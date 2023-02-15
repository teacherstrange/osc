import type { TextareaHTMLAttributes, ReactNode } from 'react';
import React, { forwardRef, useState } from 'react';
import { Label } from '../Label/Label';

import { getFieldError } from '../../utils/getFieldError';
import './text-area.scss';

type IconType = {
    content: ReactNode;
    label: string;
    type?: string;
};

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
     * Sets the custom styles, e.g. "Secondary", "Tertiary"
     */
    variants?: string[];
    /**
     * A boolean that alerts when form is submitted for error handling
     * @default false
     */
    wasSubmitted?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (props: TextAreaProps, forwardedRef) => {
        const { disabled, icon, id, name, required, variants, wasSubmitted, ...rest } = props;
        const [value, setValue] = useState('');

        const errorMessage = getFieldError(value, required);
        const displayError = wasSubmitted && errorMessage;

        const InputError = () => (
            <>
                <div className="c-input__icon c-input__icon--error">{icon?.content}</div>
                <span className="c-input__error-message" role="alert" id={`${id}-error`}>
                    {errorMessage}
                </span>
            </>
        );

        return (
            <div className="c-input__outer-container">
                <div
                    className={
                        displayError
                            ? `c-input__container c-input__container--error`
                            : `c-input__container`
                    }
                >
                    <textarea
                        className="c-input c-input__textarea"
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
                        name={name}
                        variants={disabled ? ['disabled'] : null}
                        required={required}
                    />
                    {displayError ? <InputError /> : null}
                </div>
            </div>
        );
    }
);

TextArea.displayName = 'TextArea';
