import React from 'react';
import type { FC, ReactChildren, ReactNode } from 'react';
import { ListItem as ChakraListItem } from '@chakra-ui/react';

export interface Props {
    children: (string | ReactChildren) & ReactNode;
    className?: string;
}

export const ListItem: FC<Props> = ({ children, className, ...other }: Props) => {
    return (
        <ChakraListItem className={className ? className : ''} {...other}>
            {children}
        </ChakraListItem>
    );
};
