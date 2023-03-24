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
     * Variants such as the form type (e.g. Newsletter) and whether form should slide out (e.g. slide-right)
     */
    variants?: (string | undefined)[];
}

export const FormContainer = (props: FormContainerProps) => {
    const { children, slideOut = false, slideOutText, variants } = props;
    const variantModifier = useModifier('c-form__container', variants);
    const classes = classNames('c-form__container', variantModifier);

    return (
        <div className={classes}>
            {slideOut ? (
                <Button variant="quaternary" className="c-form__slide-out-btn">
                    {slideOutText}
                </Button>
            ) : null}
            {children}
        </div>
    );
};
