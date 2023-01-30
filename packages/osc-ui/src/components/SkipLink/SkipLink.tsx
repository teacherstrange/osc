import type { ReactNode } from 'react';
import React from 'react';
import { classNames } from '../../utils/classNames';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';

import './skip-link.scss';

export interface Props {
    anchor: string;
    children: ReactNode;
    className?: string;
}

export const SkipLink = (props: Props) => {
    const { anchor, className, children } = props;
    const classes = classNames('c-skip-link', className);

    return (
        <VisuallyHidden asChild className={classes}>
            <a href={`#${anchor}`}>{children}</a>
        </VisuallyHidden>
    );
};
