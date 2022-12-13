import type {
    DropdownMenuCheckboxItemProps,
    DropdownMenuContentProps,
    DropdownMenuRadioItemProps,
} from '@radix-ui/react-dropdown-menu';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, DividerHorizontalIcon } from '@radix-ui/react-icons';
import type { ComponentPropsWithoutRef, ElementRef, FC } from 'react';
import React, { forwardRef } from 'react';

import './dropdown-menu.scss';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export interface ContentProps extends DropdownMenuContentProps {
    className?: string;
    children?: React.ReactNode;
}

export const DropdownMenuContent: FC<ContentProps> = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.Content>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ children, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                className="c-dropdown-menu__content"
                {...props}
                ref={forwardedRef}
            >
                {children}
                <DropdownMenuPrimitive.Arrow className="c-dropdown-menu__arrow" />
            </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
    );
});

export const DropdownMenuLabel = DropdownMenuPrimitive.Label;
export const DropdownMenuItem = DropdownMenuPrimitive.Item;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export interface CheckboxProps extends DropdownMenuCheckboxItemProps {
    className?: string;
}

export const DropdownMenuCheckboxItem: FC<CheckboxProps> = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ children, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.CheckboxItem
            className="c-dropdown-menu__checkbox-item"
            {...props}
            onSelect={(e) => e.preventDefault()}
            ref={forwardedRef}
        >
            <DropdownMenuPrimitive.ItemIndicator className="c-dropdown-menu__indicator">
                {props.checked === 'indeterminate' && <DividerHorizontalIcon />}
                {props.checked === true && <CheckIcon />}
            </DropdownMenuPrimitive.ItemIndicator>
            {children}
        </DropdownMenuPrimitive.CheckboxItem>
    );
});

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export interface RadioProps extends DropdownMenuRadioItemProps {
    className?: string;
}

export const DropdownMenuRadioItem: FC<RadioProps> = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ children, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.RadioItem
            className="c-dropdown-menu__radio-item"
            {...props}
            onSelect={(e) => e.preventDefault()}
            ref={forwardedRef}
        >
            {children}
            <DropdownMenuPrimitive.ItemIndicator>
                <CheckIcon />
            </DropdownMenuPrimitive.ItemIndicator>
        </DropdownMenuPrimitive.RadioItem>
    );
});

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuSubContent = DropdownMenuPrimitive.SubContent;
export const DropdownMenuSubTrigger = DropdownMenuPrimitive.SubTrigger;

DropdownMenuContent.displayName = 'DropdownMenuContent';
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';
