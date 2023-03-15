import type { ReactNode } from 'react';
import { classNames, useModifier } from 'osc-ui';

export interface FormContainerProps {
    /**
     * The actual form which is passed through the FormContainer
     */
    children: ReactNode;
    /**
     * Sets whether the form will slide out and adds the slide out button
     */
    slideOut?: boolean;
    /**
     * Determines which side the button will be on depending on whether it will slide our from right or left
     */
    variant?: 'slide-left' | 'slide-right';
}

export const FormContainer = (props: FormContainerProps) => {
    const { children, slideOut = false, variant } = props;

    const variantModifier = useModifier('c-form__container', variant);
    const classes = classNames('c-form__container', variantModifier);

    return (
        <div className={classes}>
            {slideOut ? <span className="c-form__container--slide-out-btn">Contact Us</span> : null}
            {children}
        </div>
    );
};
