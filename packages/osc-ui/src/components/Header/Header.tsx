import { NavLink as RemixNavLink } from '@remix-run/react';
import type { HTMLAttributes, ReactNode, RefObject } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import breakpoints from '../../../../../tokens/media-queries';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { classNames } from '../../utils/classNames';
import { rem } from '../../utils/rem';
import { AccessibleIcon, Icon } from '../Icon/Icon';

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
 * Logo
 * -----------------------------------------------------------------------------------------------*/
export const Logo = () => (
    <RemixNavLink to="/" className="c-header__logo">
        <AccessibleIcon label="Open Study College">
            <Icon id="logo" size={[278, 33]} className="o-logo" />
        </AccessibleIcon>
    </RemixNavLink>
);

/* -------------------------------------------------------------------------------------------------
 * Header
 * -----------------------------------------------------------------------------------------------*/
export interface HeaderProps extends SharedNavProps, HTMLAttributes<HTMLDivElement> {}

export const Header = (props: HeaderProps) => {
    const { className, children, ...attr } = props;
    const ref = useRef<HTMLDivElement>(null);
    const headerHeight = useHeight(ref);
    const classes = classNames('c-header', 'o-container', className);

    return (
        <header
            className={classes}
            {...attr}
            ref={ref}
            style={{
                ...attr.style,
                // Set the header height as state so we can use it to help position things such as the nav
                ['--header-height' as string]: `${headerHeight}px`,
            }}
        >
            {children}
        </header>
    );
};

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
            document.body.style.overflowY = 'auto';
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
            {children}
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
