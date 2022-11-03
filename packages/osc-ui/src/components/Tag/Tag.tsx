import type { FC } from 'react';
import React from 'react';
import {
    Tag as ChakraTag,
    TagLabel as ChakraTagLabel,
    TagLeftIcon as ChakraTagLeftIcon,
    TagRightIcon as ChakraTagRightIcon
} from '@chakra-ui/react';

import { themeOptions } from '../../constants';
import type { ThemeProps } from '../../interfaces';

export interface Props {
    theme: ThemeProps;
    className?: string;
    customElement?: any;
    icon?: any;
    iconPosition?: 'left' | 'right';
    tagName: string;
}

export const Tag: FC<Props> = (props: Props) => {
    const {
        className,
        customElement,
        icon,
        iconPosition = 'left',
        tagName,
        theme: { backgroundColor = themeOptions.PRIMARY, color = themeOptions.SECONDARY }
    } = props;

    if (icon && customElement) {
        console.error(
            'ERROR RENDERING TAG - Can not render icon and custom element together, please choose one'
        );
        return;
    }

    let leftIcon,
        rightIcon = null;

    if (icon) {
        if (iconPosition === 'left') leftIcon = <ChakraTagLeftIcon as={icon} />;
        if (iconPosition === 'right') rightIcon = <ChakraTagRightIcon as={icon} />;
    } else if (customElement) {
        if (iconPosition === 'left') leftIcon = customElement;
        if (iconPosition === 'right') rightIcon = customElement;
    }

    return (
        <ChakraTag backgroundColor={backgroundColor} className={className ? className : ''}>
            {leftIcon}
            <ChakraTagLabel color={color}>{tagName}</ChakraTagLabel>
            {rightIcon}
        </ChakraTag>
    );
};
