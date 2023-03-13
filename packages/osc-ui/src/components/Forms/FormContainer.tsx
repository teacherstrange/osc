import type { ReactNode } from 'react';
import React from 'react';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import './form-container.scss';

interface FormContainerProps {
    children: ReactNode;
    variant?: 'newsletter' | 'slide-out';
}

export const FormContainer = (props: FormContainerProps) => {
    const { children, variant } = props;

    const variantModifier = useModifier('c-form__container', variant);
    const classes = classNames('c-form__container', variantModifier);

    return (
        <div className={classes}>
            {variant === 'slide-out' ? (
                <span className="c-form__container--slide-out-btn">Contact Us</span>
            ) : null}
            {children}
        </div>
    );
};
