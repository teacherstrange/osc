import { Slot } from '@radix-ui/react-slot';
import { mergeRefs } from '@react-aria/utils';
import { mediaQueries as breakpoints } from 'osc-design-tokens';
import type { ElementRef, HTMLAttributes, ReactNode, RefObject } from 'react';
import React, { Children, forwardRef, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { classNames } from '../../utils/classNames';
import { rem } from '../../utils/rem';

import { useModifier } from '../../hooks/useModifier';
import { useScroll } from '../../hooks/useScroll';
import './header.scss';

export interface SharedNavProps {
    /**
     * The content of the component
     */
    children?: ReactNode;
    /**
     * Custom class
     */
    className?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Header
 * -----------------------------------------------------------------------------------------------*/
export interface HeaderProps extends SharedNavProps, HTMLAttributes<HTMLDivElement> {
    /**
     * Sets the header to be sticky
     * @default false
     */
    isSticky?: boolean;
}

export const Header = forwardRef<ElementRef<'header'>, HeaderProps>((props, forwardedRef) => {
    const { className, children, isSticky, ...attr } = props;
    const ref = useRef<HTMLDivElement>(null);
    const headerHeight = useHeight(ref);
    const scrollPos = useScroll();

    const scrollOffset = 10;
    const hasTraveledPastOffset = scrollPos > scrollOffset;

    const stickyModifier = useModifier('c-header', isSticky && 'sticky');
    const classes = classNames(
        'c-header',
        stickyModifier,
        isSticky && hasTraveledPastOffset && 'is-scrolled',
        className
    );

    return (
        <header
            className={classes}
            {...attr}
            ref={mergeRefs(ref, forwardedRef)}
            style={{
                ...attr.style,
                // Set the header height as state so we can use it to help position things such as the nav
                ['--header-height' as string]: `${headerHeight}px`,
                // Set a fixed height for the header, this helps us avoid flickering when changing the height when scrolling
                height: isSticky && headerHeight ? `var(--header-height)` : '',
            }}
        >
            <div className="u-bg-color-tertiary">
                <div className="c-header__inner o-container">{children}</div>
            </div>
        </header>
    );
});
Header.displayName = 'Header';

/* -------------------------------------------------------------------------------------------------
 * Header nav
 * -----------------------------------------------------------------------------------------------*/
export interface HeaderNavProps extends SharedNavProps, HTMLAttributes<HTMLDivElement> {
    /**
     * Sets the data-state attribute of the button.
     *
     * @default false
     */
    isOpen: boolean;
}

export const HeaderNav = (props: HeaderNavProps) => {
    const { className, children, isOpen = false, ...attr } = props;
    const classes = classNames('c-header__nav', className);
    const isDesktop = useMediaQuery(`(min-width: ${rem(breakpoints.desk)}rem)`);

    useEffect(() => {
        // Lock document body when the nav is open
        if (isOpen && !isDesktop) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = null;
        }
    }, [isDesktop, isOpen]);

    return (
        <div
            className={classes}
            {...attr}
            style={{
                ...attr.style,
                // Ensure we can always scroll
                overflowY: isOpen ? 'auto' : null,
            }}
        >
            {children}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Header action bar
 * -----------------------------------------------------------------------------------------------*/
export interface HeaderActionBarProps extends SharedNavProps, HTMLAttributes<HTMLDivElement> {}

export const HeaderActionBar = (props: HeaderActionBarProps) => {
    const { className, children, ...attr } = props;
    const classes = classNames('c-header__action-bar', className);

    return (
        <div className={classes} {...attr}>
            {Children.map(children, (child, index) => {
                return (
                    <Slot className="c-header__action-item" key={index}>
                        {child}
                    </Slot>
                );
            })}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * useHeight
 * -----------------------------------------------------------------------------------------------*/
const useHeight = (ref: RefObject<HTMLElement | null>) => {
    const [headerHeight, setHeaderHeight] = useState<number>(0);

    useEffect(() => {
        // Get the bottom position of the current ref
        // This will allow us to take into account thing like padding on the body
        const handleResize = () => {
            setHeaderHeight(ref.current.offsetHeight);
        };

        // Triggered at the first client-side load and if query changes
        handleResize();

        // Listen for window resize
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [ref]);

    return headerHeight;
};
