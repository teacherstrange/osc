import {
    CheckCircledIcon as SuccessIcon,
    ExclamationTriangleIcon as WarningIcon,
    InfoCircledIcon as InfoIcon
} from '@radix-ui/react-icons';
import type { FC } from 'react';
import React from 'react';
import { classNames } from '../../utils/classNames';
import './alert.scss';

export interface Props {
    children?: React.ReactNode;
    className?: string;
    customPosition?: 'left' | 'right';
    description?: string;
    displayIcon?: boolean;
    iconSize?: number;
    status: 'info' | 'warning' | 'success' | 'error';
}

export const Alert: FC<Props> = (props: Props) => {
    const { className, children, displayIcon = true, iconSize = 20, status } = props;

    let Icon;

    switch (status) {
        case 'error':
            Icon = WarningIcon;
            break;
        case 'success':
            Icon = SuccessIcon;
            break;
        case 'warning':
            Icon = WarningIcon;
            break;
        case 'info':
            Icon = InfoIcon;
            break;
        default:
            console.error(`ERROR - Invalid status-"${status}", please update`);
            return null;
    }

    const alertClasses = classNames(`c-alert c-alert--${status}`, className);
    const iconClasses = classNames(`c-alert__icon c-alert__icon--${status}`, className);

    const alertIcon = displayIcon ? (
        <span className={iconClasses}>
            <Icon width={iconSize} height={iconSize} />
        </span>
    ) : null;

    // Only set role to alert for more critical alerts
    const setRoleToAlert = Boolean(status === 'error' || status === 'warning');

    return (
        <div role={setRoleToAlert ? 'alert' : null} className={alertClasses}>
            {alertIcon}
            {children}
        </div>
    );
};

export interface AlertDescriptionProps {
    className?: string;
    description: string;
}

export const AlertDescription: FC<AlertDescriptionProps> = (props: AlertDescriptionProps) => {
    const { className, description } = props;
    const classes = classNames('c-alert__description', className);

    return <div className={classes}>{description}</div>;
};

export interface AlertTitleProps {
    className?: string;
    title: string;
}

export const AlertTitle: FC<AlertTitleProps> = (props: AlertTitleProps) => {
    const { className, title } = props;
    const classes = classNames('c-alert__title', className);

    return <div className={classes}>{title}</div>;
};
