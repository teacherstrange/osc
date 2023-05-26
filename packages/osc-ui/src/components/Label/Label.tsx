import * as RadixLabel from '@radix-ui/react-label';
import type { FC } from 'react';
import React from 'react';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import './label.scss';
export interface Props {
    onClickHandler?: () => void;
    htmlFor: string;
    hidden?: boolean;
    name: string;
    required?: boolean;
    variants?: string[];
    size?: 'm' | 'xl';
    /**
     * Sets the label to use the secondary colour
     * @default false
     */
    isDark?: boolean;
}
export const Label: FC<Props> = (props: Props) => {
    const {
        hidden,
        htmlFor,
        onClickHandler,
        name,
        required = false,
        variants,
        size = 'm',
        isDark = false,
    } = props;

    const modifier = useModifier('c-label', variants);
    const sizeModifier = useModifier('c-label', size);
    const colourModifier = useModifier('c-label', 'dark');
    const classes = classNames('c-label', sizeModifier, modifier, isDark ? colourModifier : '');

    if (hidden) {
        return (
            <VisuallyHidden>
                <RadixLabel.Root className={classes} htmlFor={htmlFor}>
                    {name}
                    {required ? <span className="c-label__required">* </span> : null}
                </RadixLabel.Root>
            </VisuallyHidden>
        );
    }
    return (
        <>
            <RadixLabel.Root className={classes} htmlFor={htmlFor} onClick={onClickHandler}>
                {name}
                {required ? <span className="c-label__required">* </span> : null}
            </RadixLabel.Root>
        </>
    );
};
