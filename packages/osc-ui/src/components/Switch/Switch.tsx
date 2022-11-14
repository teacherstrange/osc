import type { SwitchProps } from '@radix-ui/react-switch';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import type { ComponentPropsWithoutRef, ElementRef, FC } from 'react';
import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import './switch.scss';

export interface Props extends SwitchProps {
    className?: string;
    id?: string;
}

export const Switch: FC<Props> = forwardRef<
    ElementRef<typeof SwitchPrimitive.Root>,
    ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>((props: Props, forwardedRef) => {
    const { className, id } = props;
    const classes = classNames('c-switch', className);

    return (
        <SwitchPrimitive.Root id={id} className={classes} {...props} ref={forwardedRef}>
            <SwitchPrimitive.Thumb className="c-switch__thumb" />
        </SwitchPrimitive.Root>
    );
});

Switch.displayName = 'Switch';
