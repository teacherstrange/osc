import React from 'react';
import type { FC, ReactChildren, ReactNode } from 'react';
import { List as ChakraList, UnorderedList, OrderedList } from '@chakra-ui/react';

export interface Props {
    type?: 'ul' | 'ol';
    children: ReactChildren | ReactNode;
    className?: string;
}

export const List: FC<Props> = ({ type, className, children, ...other }: Props) => {
    switch (type) {
        case 'ul':
            return (
                <UnorderedList className={className ? className : ''} {...other}>
                    {children}
                </UnorderedList>
            );

        case 'ol':
            return (
                <OrderedList className={className ? className : ''} {...other}>
                    {children}
                </OrderedList>
            );

        default:
            return (
                <ChakraList className={className ? className : ''} {...other}>
                    {children}
                </ChakraList>
            );
    }
};
