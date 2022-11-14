import * as AvatarPrimitive from '@radix-ui/react-avatar';
import type { FC } from 'react';
import React from 'react';
import { classNames } from '../../utils/classNames';
import './avatar.scss';

export interface AvatarProps {
    className?: string;
    src?: string;
    name: string;
}

export const Avatar: FC<AvatarProps> = (props: AvatarProps) => {
    const { className, src, name } = props;
    const classes = classNames('c-avatar', className);
    const initial = name ? name.split('').shift().toUpperCase() : null;

    return (
        <AvatarPrimitive.Root className={classes}>
            <AvatarPrimitive.Image className="c-avatar__image" src={src} alt={name} />
            <AvatarPrimitive.Fallback className="c-avatar__fallback">
                {initial}
            </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
    );
};
