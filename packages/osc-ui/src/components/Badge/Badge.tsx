import React from 'react';
import { useFontSize } from '../../hooks/useFontSize';
import { useModifier } from '../../hooks/useModifier';
import { useTheme } from '../../hooks/useTheme';
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

export const Badge = (props: Props) => {
    const { badgeName, className, fontSize, theme = 'primary', variant } = props;
    const fontSizeClass = useFontSize(fontSize);
    const variantClass = useModifier('c-badge', variant);
    const themeClass = useTheme(theme);
    const classes = classNames('c-badge', variantClass, fontSizeClass, themeClass, className);

    return <span className={classes}>{badgeName}</span>;
};
