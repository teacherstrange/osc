import type { ReactNode } from 'react';
import { Button, classNames, useModifier } from 'osc-ui';

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
     * Text for the slide out button
     */
    slideOutText?: string;
    /**
     * Determines which side the button will be on depending on whether it will slide our from right or left
     */
    variant?: 'slide-left' | 'slide-right';
}

export const FormContainer = (props: FormContainerProps) => {
    const { children, slideOut = false, slideOutText, variant } = props;
    const variantModifier = useModifier('c-form__container', variant);
    const classes = classNames('c-form__container', variantModifier);

    return (
        <div className={slideOut ? classes : 'c-form__container'}>
            {slideOut ? (
                <Button variant="quaternary" className="c-form__slide-out-btn">
                    {slideOutText}
                </Button>
            ) : null}
            {children}
        </div>
    );
};
