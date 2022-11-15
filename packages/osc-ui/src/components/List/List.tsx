import type { FC, LiHTMLAttributes, OlHTMLAttributes, ReactChildren, ReactNode } from 'react';
import React from 'react';
import { classNames } from '../../utils/classNames';

export interface ListItemProps<T> extends LiHTMLAttributes<T> {
    children: (string | ReactChildren) & ReactNode;
    className?: string;
}

export const ListItem: FC<ListItemProps<HTMLLIElement>> = ({
    children,
    className,
    ...attr
}: ListItemProps<HTMLLIElement>) => {
    const classes = classNames(className);

    return (
        <li className={classes} {...attr}>
            {children}
        </li>
    );
};

export type ListTypes = HTMLOListElement | HTMLUListElement;

export interface ListProps<T> extends OlHTMLAttributes<T> {
    variant?: 'ul' | 'ol';
    children: ReactChildren | ReactNode;
    className?: string;
}

export const List: FC<ListProps<ListTypes>> = ({
    variant,
    className,
    children,
    ...attr
}: ListProps<ListTypes>) => {
    const classes = classNames(className);

    switch (variant) {
        case 'ul':
            return (
                <ul className={classes} {...attr}>
                    {children}
                </ul>
            );

        case 'ol':
            return (
                <ol className={classes} {...attr}>
                    {children}
                </ol>
            );

        default:
            return (
                <ul className={classes} {...attr}>
                    {children}
                </ul>
            );
    }
};
