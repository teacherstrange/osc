import * as AvatarPrimitive from '@radix-ui/react-avatar';
import type { FC } from 'react';
import React from 'react';
import { classNames } from '../../utils/classNames';
import './avatar.scss';

export interface AvatarProps {
    className?: string;
    count?: number;
    name: string;
    notification?: { show: boolean; count?: number };
    src?: string;
}

export const Avatar: FC<AvatarProps> = (props: AvatarProps) => {
    const { className, name, notification = { show: false }, src } = props;
    const classes = classNames('c-avatar', className);
    const initials = name
        ? name
              .split(' ')
              .map((x) => x.charAt(0).toUpperCase())
              .join('')
        : null;

    return (
        <AvatarPrimitive.Root className={src ? classes : `${classes} c-avatar__fallback`}>
            <AvatarPrimitive.Image className="c-avatar__image" src={src} alt={name} />
            {notification.show ? (
                <div className="c-avatar__notification-badge">
                    <span className="c-avatar__notification-badge--count">
                        {notification.count}
                    </span>
                </div>
            ) : null}
            <AvatarPrimitive.Fallback className="c-avatar__fallback--initials">
                {initials}
            </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
    );
};
