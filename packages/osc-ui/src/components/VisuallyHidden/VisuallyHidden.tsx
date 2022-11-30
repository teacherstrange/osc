import { Slot } from '@radix-ui/react-slot';
import type { FC, ReactNode } from 'react';
import React from 'react';
import { classNames } from '../../utils/classNames';

export interface Props {
    asChild?: boolean;
    children: ReactNode;
    className?: string;
}

export const VisuallyHidden: FC<Props> = (props: Props) => {
    const { asChild, children, className } = props;
    const classes = classNames('sr-only', className);

    // Here we're using the Slot component from Radix UI to allow us to use our own asChild prop
    // to determine whether we should render the VisuallyHidden component as a span or as the child element.
    // https://www.radix-ui.com/docs/primitives/utilities/slot
    const Component = asChild ? Slot : 'span';

    return <Component className={classes}>{children}</Component>;
};
