import type { HTMLAttributes } from 'react';
import React from 'react';
import { classNames } from '../../utils/classNames';
import './header.scss';

export interface Props<T> extends HTMLAttributes<T> {
    className?: string;
}

export const Header = (props: Props<HTMLDivElement>) => {
    const { className, ...attr } = props;
    const classes = classNames(className);

    return (
        <header className={classes} {...attr}>
            Header
        </header>
    );
};
