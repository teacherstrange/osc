import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import type { FC, ReactNode } from 'react';
import React from 'react';

interface Props {
    children: ReactNode;
    label: string;
}

export const Icon: FC<Props> = (props: Props) => {
    const { children, label } = props;

    return <AccessibleIcon.Root label={label}>{children}</AccessibleIcon.Root>;
};
