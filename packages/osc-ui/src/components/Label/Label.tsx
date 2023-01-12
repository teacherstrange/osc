import React from 'react';
import type { FC } from 'react';
import * as RadixLabel from '@radix-ui/react-label';
import './label.scss';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
export interface Props {
    htmlFor: string;
    name: string;
    required?: boolean;
    variants?: string[];
}

export const Label: FC<Props> = (props: Props) => {
    const { htmlFor, name, required = false, variants } = props;
    const modifier = useModifier('c-label', variants);
    const classes = classNames('c-label', modifier);
    return (
        <>
            <RadixLabel.Root className={classes} htmlFor={htmlFor}>
                {name}
                {required ? <span className="c-label__required">* </span> : null}
            </RadixLabel.Root>
        </>
    );
};
