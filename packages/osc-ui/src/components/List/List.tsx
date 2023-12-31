import type { LiHTMLAttributes, OlHTMLAttributes, ReactChildren, ReactNode } from 'react';
import React from 'react';
import { classNames } from '../../utils/classNames';

export interface ListItemProps<T> extends LiHTMLAttributes<T> {
    children: (string | number | {} | ReactChildren) & ReactNode;
    className?: string;
}

export const ListItem = ({ children, className, ...attr }: ListItemProps<HTMLLIElement>) => {
    const classes = classNames(className);

    return (
        <li className={classes ? classes : null} {...attr}>
            {children}
        </li>
    );
};

export type ListTypes = HTMLOListElement | HTMLUListElement;

export interface ListProps<T> extends OlHTMLAttributes<T> {
    variant?: 'ul' | 'ol';
    children: ReactNode;
    className?: string;
}

export const List = ({ variant, className, children, ...attr }: ListProps<ListTypes>) => {
    const classes = classNames('o-list', className);

    switch (variant) {
        case 'ul':
            return (
                <ul className={classes ? classes : null} {...attr}>
                    {children}
                </ul>
            );

        case 'ol':
            return (
                <ol className={classes ? classes : null} {...attr}>
                    {children}
                </ol>
            );

        default:
            return (
                <ul className={classes ? classes : null} {...attr}>
                    {children}
                </ul>
            );
    }
};
