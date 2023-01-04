import * as AvatarPrimitive from '@radix-ui/react-avatar';
import React from 'react';
import hash from 'string-hash';
import color from 'tinycolor2';
import { countLimiter } from '../../utils/countLimiter';

import { classNames } from '../../utils/classNames';
import { Badge } from '../Badge/Badge';
import './avatar.scss';

const FallbackGradient = ({ name }) => {
    const hashed = hash(name);
    const c = color({ h: hashed % 360, s: 0.95, l: 0.5 });
    const c1 = c.toHexString();
    const c2 = c.triad()[1].toHexString();

    return (
        <svg aria-label={name} width="60" height="60" viewBox="0 0 80 80">
            <defs>
                <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id={name}>
                    <stop stopColor={c1} offset="0%" />
                    <stop stopColor={c2} offset="100%" />
                </linearGradient>
            </defs>
            <g stroke="none" strokeWidth="1" fill="none">
                <rect fill={`url(#${name})`} x="0" y="0" width="100%" height="100%" />
            </g>
        </svg>
    );
};
export interface AvatarProps {
    className?: string;
    name: string;
    notification?: { show: boolean; count?: string };
    src?: string;
}

export const Avatar = (props: AvatarProps) => {
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
                <Badge
                    className={
                        notification.count
                            ? 'c-avatar__badge c-avatar__badge--count'
                            : 'c-avatar__badge'
                    }
                    badgeName={
                        notification.count
                            ? countLimiter(notification.count, 99, '+').toString()
                            : null
                    }
                />
            ) : null}

            <AvatarPrimitive.Fallback>
                <FallbackGradient name={initials} />
                <span className="c-avatar__fallback--initials">{initials}</span>
            </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
    );
};
