import type {
    ComponentPropsWithoutRef,
    ElementRef,
    ForwardRefExoticComponent,
    HTMLAttributes,
    RefAttributes,
} from 'react';
import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';

import './burger.scss';

/* -------------------------------------------------------------------------------------------------
 * Burger
 * -----------------------------------------------------------------------------------------------*/
const BURGER_NAME = 'burger';

export interface BurgerProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
    /**
     * The accessible name of the button.
     */
    label: string;

    /**
     * Sets the data-state attribute of the button.
     *
     * @default false
     */
    isOpen: boolean;
}
type BurgerRef = ForwardRefExoticComponent<BurgerProps & RefAttributes<HTMLButtonElement>>;

export const Burger = forwardRef<ElementRef<BurgerRef>, ComponentPropsWithoutRef<BurgerRef>>(
    (props: BurgerProps, forwardedRef) => {
        const { className, label, isOpen = false, ...attr } = props;

        const classes = classNames('c-burger', className);

        return (
            <button
                className={classes}
                data-state={isOpen ? 'open' : 'closed'}
                {...attr}
                ref={forwardedRef}
            >
                <span className="c-burger__bar"></span>
                <span className="c-burger__bar"></span>
                <span className="c-burger__bar"></span>

                <VisuallyHidden>{label}</VisuallyHidden>
            </button>
        );
    }
);

Burger.displayName = BURGER_NAME;
