import type { TextareaHTMLAttributes, ReactNode } from 'react';
import React, { forwardRef, useState } from 'react';
import { Label } from '../Label/Label';

import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import { getFieldError } from '../../utils/getFieldError';
import { Icon } from '../Icon/Icon';
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

        const modifiers = useModifier('c-textarea__container', variants);
        const textareaClasses = classNames('c-textarea__container', modifiers);

        return (
            <div className="c-textarea__outer-container">
                <div
                    className={
                        displayError
                            ? `${textareaClasses} c-textarea__container--error`
                            : textareaClasses
                    }
                >
                    <Label
                        htmlFor={id}
                        name={name}
                        variants={disabled ? ['disabled'] : null}
                        required={required}
                    />
                    <textarea
                        className="c-textarea"
                        disabled={disabled}
                        id={id}
                        name={name}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        ref={forwardedRef}
                        required={required}
                        {...rest}
                    />
                    {displayError ? (
                        <>
                            {icon && icon.content ? (
                                <div className="c-textarea__icon c-textarea__icon--error">
                                    <Icon label={icon.label}>{icon.content}</Icon>
                                </div>
                            ) : null}
                            <span
                                className="c-textarea__error-message"
                                role="alert"
                                id={`${id}-error`}
                            >
                                {errorMessage}
                            </span>
                        </>
                    ) : null}
                </div>
            </div>
        );
    }
);

TextArea.displayName = 'TextArea';
