import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import type { Themes } from '../../types';
import { classNames } from '../../utils/classNames';
import { AccessibleIcon } from '../Icon/Icon';
import './tag.scss';

export interface Props {
    theme?: Themes;
    className?: string;
    customElement?: any;
    icon?: any;
    iconLabel?: string;
    iconPosition?: 'left' | 'right';
    tagName: string;
}

export const Tag = (props: Props) => {
    const {
        className,
        customElement,
        icon,
        iconLabel,
        iconPosition = 'left',
        tagName,
        theme = 'primary',
    } = props;

    const themeClass = useTheme(theme);
    const classes = classNames('c-tag', themeClass, className);

    if (icon && customElement) {
        console.error(
            'ERROR RENDERING TAG - Can not render icon and custom element together, please choose one'
        );
        return;
    }

    let leftIcon,
        rightIcon = null;

    if (icon) {
        if (iconPosition === 'left')
            leftIcon = <AccessibleIcon label={iconLabel}>{icon}</AccessibleIcon>;
        if (iconPosition === 'right')
            rightIcon = <AccessibleIcon label={iconLabel}>{icon}</AccessibleIcon>;
    } else if (customElement) {
        if (iconPosition === 'left') leftIcon = customElement;
        if (iconPosition === 'right') rightIcon = customElement;
    }

    return (
        <span className={classes}>
            {leftIcon}
            <span className="c-tag__content">{tagName}</span>
            {rightIcon}
        </span>
    );
};
