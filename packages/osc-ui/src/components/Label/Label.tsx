import React from 'react';
import type { FC } from 'react';
import * as RadixLabel from '@radix-ui/react-label';
import './label.scss';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
export interface Props {
    onClickHandler?: () => void;
    htmlFor: string;
    hidden?: boolean;
    name: string;
    required?: boolean;
    variants?: string[];
}

export const Label: FC<Props> = (props: Props) => {
    const { hidden, htmlFor, onClickHandler, name, required = false, variants } = props;
    const modifier = useModifier('c-label', variants);
    const classes = classNames('c-label', modifier);

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
