import type { PopoverProps } from '@radix-ui/react-popover';
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react';
import React, { forwardRef } from 'react';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { classNames } from '../../utils/classNames';
import './popover.scss';

export interface Props extends PopoverProps {
    className?: string;
    children?: ReactNode;
}

export const Popover = PopoverPrimitive.Root;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverArrow = PopoverPrimitive.Arrow;
export const PopoverClose = PopoverPrimitive.Close;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = forwardRef<
    ElementRef<typeof PopoverPrimitive.Content>,
    ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>((props: Props, forwardedRef) => {
    const { className, children } = props;
    const contentClasses = classNames('c-popover__content', className);

    return (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
                className={contentClasses}
                {...props}
                ref={forwardedRef}
                style={{
                    // Make sure the popover has a stacking index.
                    // Setting it inline as the only way to target the required element
                    // is to use a data attribute and !important.
                    // As the data attribute might be applied to other components this
                    // is the safest way to avoid any unintended stacking issues.
                    zIndex: 10,
                }}
            >
                {children}
            </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
    );
});

PopoverContent.displayName = 'Popover';
