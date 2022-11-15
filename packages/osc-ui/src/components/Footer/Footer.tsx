import type { FC, HTMLAttributes } from 'react';
import React from 'react';
import { classNames } from '../../utils/classNames';
import './footer.scss';

export interface Props<T> extends HTMLAttributes<T> {
    className?: string;
}

export const Footer: FC<Props<HTMLDivElement>> = (props) => {
    const { className, ...attr } = props;
    const classes = classNames(className);

    return (
        <footer className={classes} {...attr}>
            Footer
        </footer>
    );
};
