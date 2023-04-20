import type { ReactNode } from 'react';
import { classNames, useModifier } from 'osc-ui';

export interface FormContainerProps {
    /**
     * The actual form which is passed through the FormContainer
     */
    children: ReactNode;
    /**
     * Variants such as the form type (e.g. Newsletter) and whether form should slide out (e.g. slide-right)
     */
    variants?: string[] | undefined;
}

export const FormContainer = (props: FormContainerProps) => {
    const { children, variants } = props;
    const variantModifier = useModifier('c-form__container', variants);
    const classes = classNames('c-form__container', variantModifier);

    return <div className={classes}>{children}</div>;
};
