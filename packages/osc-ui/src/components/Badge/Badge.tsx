import type { FC } from 'react';
import React from 'react';
import { useFontSize } from '../../hooks/useFontSize';
import { useTheme } from '../../hooks/useTheme';
import { useVariant } from '../../hooks/useVariant';
import type { Sizes, Themes, Variants } from '../../types';
import { classNames } from '../../utils/classNames';

import './badge.scss';

export interface Props {
    badgeName: string;
    className?: string;
    fontSize?: Sizes;
    theme?: Themes;
    variant?: Variants;
}

export const Badge: FC<Props> = (props: Props) => {
    const { badgeName, className, fontSize, theme = 'primary', variant } = props;
    const fontSizeClass = useFontSize(fontSize);
    const vairant = useVariant('c-badge', variant);
    const themeClass = useTheme(theme);
    const classes = classNames('c-badge', vairant, fontSizeClass, themeClass, className);

    return <span className={classes}>{badgeName}</span>;
};
