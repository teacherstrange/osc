import type { FC } from 'react';
import React from 'react';
import { Badge as ChakraBadge } from '@chakra-ui/react';

import './badge.css';

export interface Props {
    color?: string;
    variant?: string;
    fontSize?: string;
    className?: string;
    badgeName: string;
}

export const Badge: FC<Props> = (props: Props) => {
    const { color, variant, fontSize, className, badgeName } = props;

    return (
        <ChakraBadge
            className={className ? className : ''}
            colorScheme={color}
            variant={variant}
            fontSize={`${fontSize}em`}
        >
            {badgeName}
        </ChakraBadge>
    );
};
