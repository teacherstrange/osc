import { CheckIcon } from '@radix-ui/react-icons';
import type { SwitchProps } from '@radix-ui/react-switch';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import type { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';
import './switch.scss';

export interface Props extends SwitchProps {
    /**
     * Custom class name
     */
    className?: string;
    /**
     * Custom id
     *
     */
    id?: string;
    /**
     * The size of the switch
     * @default 'large'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The variant of the switch
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary';
}

export const Switch = forwardRef<
    ElementRef<typeof SwitchPrimitive.Root>,
    ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>((props: Props, forwardedRef) => {
    const { className, id, size = 'large', variant = 'primary' } = props;
    const sizeModifier = useModifier('c-switch', size);
    const variantModifier = useModifier('c-switch', variant);
    const classes = classNames('c-switch', sizeModifier, variantModifier, className);

    return (
        <SwitchPrimitive.Root id={id} className={classes} {...props} ref={forwardedRef}>
            <SwitchPrimitive.Thumb className="c-switch__thumb" asChild>
                <span>
                    {variant === 'secondary' ? (
                        <CheckIcon
                            className="c-switch__thumb-icon"
                            aria-hidden="true"
                            focusable="false"
                        />
                    ) : null}
                </span>
            </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
    );
});

Switch.displayName = 'Switch';

interface SwitchGroupProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The children of the switch group
     */
    children: ReactNode;
}

export const SwitchGroup = (props: SwitchGroupProps) => {
    const { children, ...attr } = props;

    return (
        <div className="c-switch-group" {...attr}>
            {children}
        </div>
    );
};
