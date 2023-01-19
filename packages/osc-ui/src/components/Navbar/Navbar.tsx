import { NavLink as RemixNavLink } from '@remix-run/react';
import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ComponentPropsWithoutRef,
    ElementRef,
    ForwardRefExoticComponent,
    HTMLAttributes,
    MouseEvent,
    ReactNode,
    RefAttributes,
} from 'react';
import React, { createContext, forwardRef, useContext, useEffect, useRef, useState } from 'react';
import breakpoints from '../../../../../tokens/media-queries';
import { useInteractOutside } from '../../hooks/useInteractOutside';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useUniqueId } from '../../hooks/useUniqueId';
import { classNames } from '../../utils/classNames';
import { rem } from '../../utils/rem';
import { Icon } from '../Icon/Icon';

import './navbar.scss';

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
 * Navbar
 * -----------------------------------------------------------------------------------------------*/
const NAV_NAME = 'Navbar';

export interface NavProps extends SharedNavProps, HTMLAttributes<HTMLDivElement> {
    /**
     * The accessible name of the navigation menu
     * @default Main
     */
    label?: string;
}
// type NavRef = ForwardRefExoticComponent<NavProps & RefAttributes<HTMLDivElement>>;

export const Navbar = (props: NavProps) => {
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const columns = document.querySelectorAll('.c-nav__item--column');

        if (columns.length === 0) {
            navRef.current.classList.add('c-nav--simple');
        }
    }, []);

    const { children, className, label = 'main', ...attr } = props;
    const classes = classNames('c-nav', className);

    return (
        <nav aria-label={label} className={classes} {...attr} ref={navRef}>
            {children}
        </nav>
    );
};
Navbar.displayName = NAV_NAME;

/* -------------------------------------------------------------------------------------------------
 * NavSubMenu
 * -----------------------------------------------------------------------------------------------*/
const SUBMENU_NAME = 'NavSubMenu';

const SubNavContext = createContext(null);

export interface NavSubMenuProps extends SharedNavProps, HTMLAttributes<HTMLDivElement> {
    /**
     * The depth of the submenu
     */
    level: number;
    /**
     * The accessible name of the navigation menu
     */
    label: string;
}

export const NavSubMenu = (props: NavSubMenuProps) => {
    const { children, className, level, label, ...attr } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);

    // IDs get regenerated on every render so we're memoizing them here to preserve them
    const contentId = useUniqueId('content:');
    const triggerId = useUniqueId('trigger:');

    const context = {
        name: SUBMENU_NAME,
        level,
        isOpen,
        setIsOpen,
        contentId,
        triggerId,
        triggerLabel: label,
        scrollPosition,
        setScrollPosition,
    };

    const classes = classNames('c-nav__submenu', className);

    // close menu when user clicks outside
    useInteractOutside(ref, () => setIsOpen(false), ['mouseup', 'touchstart', 'keyup']);

    useEffect(() => {
        // close menu when user presses escape
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keyup', handleEscape);

        return () => {
            document.removeEventListener('keyup', handleEscape);
        };
    }, []);

    return (
        <SubNavContext.Provider value={context}>
            <div data-level={level} className={classes} ref={ref} {...attr}>
                {children}
            </div>
        </SubNavContext.Provider>
    );
};
NavSubMenu.displayName = SUBMENU_NAME;

/* -------------------------------------------------------------------------------------------------
 * NavTrigger
 * -----------------------------------------------------------------------------------------------*/
const TRIGGER_NAME = 'NavTrigger';
export interface NavTriggerProps extends SharedNavProps, ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Disables the trigger
     * @default false
     */
    disabled?: boolean;
}
type NavTriggerRef = ForwardRefExoticComponent<NavTriggerProps & RefAttributes<HTMLButtonElement>>;

export const NavTrigger = forwardRef<
    ElementRef<NavTriggerRef>,
    ComponentPropsWithoutRef<NavTriggerRef>
>((props: NavTriggerProps, forwardedRef) => {
    const { children, className, disabled, ...attr } = props;
    const classes = classNames('c-nav__trigger', className);
    const { isOpen, level, setIsOpen, setScrollPosition, contentId, triggerId } =
        useSubNavContext();
    const isDesktop = useMediaQuery(`(min-width: ${rem(breakpoints.desk)}rem)`);

    const handleClick = (e: MouseEvent) => {
        const previousLevel = level - 1;
        const target = e.currentTarget as HTMLElement;

        if (previousLevel >= 0) {
            const previousContent: HTMLDivElement = target.closest(
                `.c-nav__content[data-level="${previousLevel}"]`
            );

            // Set the scroll position to the top of the previous content,
            // keeps the current target in view
            previousContent && setScrollPosition(previousContent.scrollTop);

            if (!isDesktop) {
                previousContent && !isOpen
                    ? (previousContent.style.overflowY = 'hidden')
                    : (previousContent.style.overflowY = 'auto');
            }
        }

        // IF we're on the top level on mobile then set the parent header nav to overflow-y: hidden
        // Not sure if this should be in here as it's technically affecting a parent that _might_ not
        // exist. However this is the best way I can get this to work :S
        if (level === 0 && !isDesktop) {
            const headerNav: HTMLDivElement = target.closest('.c-header__nav');

            if (headerNav) {
                // IF closed then set the overflow to hidden else set it to auto
                !isOpen
                    ? (headerNav.style.overflowY = 'hidden')
                    : (headerNav.style.overflowY = 'auto');
            }
        }

        setIsOpen(!isOpen);
    };

    // IF the level is equal/greater than 0 OR isOpen set the tabindex to 0 else set to -1
    // This prevents hidden elements from being tabbed to
    const tabIndex = level >= 0 || isOpen ? 0 : -1;

    return (
        <button
            id={triggerId}
            disabled={disabled}
            data-disabled={disabled ? '' : undefined}
            data-state={isOpen ? 'open' : 'closed'}
            aria-expanded={isOpen}
            aria-controls={contentId}
            className={classes}
            tabIndex={tabIndex}
            {...attr}
            ref={forwardedRef}
            onClick={(e) => handleClick(e)}
        >
            {children}
        </button>
    );
});
NavTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * NavContent
 * -----------------------------------------------------------------------------------------------*/
interface NavContentProps extends SharedNavProps, HTMLAttributes<HTMLDivElement> {
    /**
     * The depth of the submenu
     */
    level: number;
}

export const NavContent = (props: NavContentProps) => {
    const { children, className, level, ...attr } = props;
    const classes = classNames('c-nav__content', className);
    const ref = useRef<HTMLDivElement>(null);
    const { isOpen, contentId, scrollPosition, triggerId, triggerLabel } = useSubNavContext();
    const isDesktop = useMediaQuery(`(min-width: ${rem(breakpoints.desk)}rem)`);

    // Reset scroll position when isOpen is false
    useEffect(() => {
        if (!isOpen) {
            // Reset the overflow to auto
            !isDesktop
                ? (ref.current.style.overflowY = 'auto')
                : (ref.current.style.overflowY = 'hidden');

            // Scroll the content back to the top of the trigger.
            // This will only fire when isOpen is set outside of the nav,
            // so we can keep the position if the close trigger is clicked

            if (ref.current.scrollTo !== undefined) {
                ref.current.scrollTo({
                    top: 0,
                });
            }
        }
    }, [isDesktop, isOpen]);

    return (
        <div
            id={contentId}
            data-state={isOpen ? 'open' : 'closed'}
            data-level={level}
            aria-labelledby={triggerId}
            className={classes}
            style={{
                ...attr.style,
                ['--nav-trigger-distance' as string]: `${scrollPosition}px`,
            }}
            {...attr}
            ref={ref}
        >
            {/* Remove button from DOM on desktop */}
            <NavTrigger
                aria-controls={contentId}
                aria-expanded={isOpen}
                className="c-nav__trigger--close u-hidden-from@desk"
                aria-label={`Close ${triggerLabel}`}
            >
                <Icon id="chevron-down" className="c-nav__trigger-icon" aria-hidden />

                <span>{triggerLabel}</span>
            </NavTrigger>

            {/* Add button to DOM on desktop & top level submenu */}
            {level === 0 ? (
                <NavTrigger
                    aria-controls={contentId}
                    aria-expanded={isOpen}
                    className="c-nav__trigger--close u-hidden-until@desk"
                    aria-label={`Close ${triggerLabel}`}
                >
                    <Icon id="close" />
                </NavTrigger>
            ) : null}

            {children}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * NavList
 * -----------------------------------------------------------------------------------------------*/
const LIST_NAME = 'NavList';

export interface NavListProps extends SharedNavProps, HTMLAttributes<HTMLUListElement> {}
type NavListRef = ForwardRefExoticComponent<NavListProps & RefAttributes<HTMLUListElement>>;

export const NavList = forwardRef<ElementRef<NavListRef>, ComponentPropsWithoutRef<NavListRef>>(
    (props: NavListProps, forwardedRef) => {
        const { children, className, ...attr } = props;
        const classes = classNames('c-nav__list', className);

        return (
            <ul className={classes} {...attr} ref={forwardedRef}>
                {children}
            </ul>
        );
    }
);
NavList.displayName = LIST_NAME;

/* -------------------------------------------------------------------------------------------------
 * NavItem
 * -----------------------------------------------------------------------------------------------*/
const ITEM_NAME = 'NavItem';
export interface NavItemProps extends SharedNavProps, HTMLAttributes<HTMLLIElement> {}
type NavItemRef = ForwardRefExoticComponent<NavItemProps & RefAttributes<HTMLLIElement>>;

export const NavItem = forwardRef<ElementRef<NavItemRef>, ComponentPropsWithoutRef<NavItemRef>>(
    (props: NavItemProps, forwardedRef) => {
        const { className, children, ...attr } = props;
        const classes = classNames('c-nav__item', className);

        return (
            <li className={classes} {...attr} ref={forwardedRef}>
                {children}
            </li>
        );
    }
);
NavItem.displayName = ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * NavLink
 * -----------------------------------------------------------------------------------------------*/
const LINK_NAME = 'NavLink';
export interface NavLinkProps extends SharedNavProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Whether the link is external or not
     * @default false
     */
    isExternal?: boolean;
    /**
     * Sets the target attribute on the anchor element
     */
    target?: string;
}
type NavLinkRef = ForwardRefExoticComponent<NavLinkProps & RefAttributes<HTMLAnchorElement>>;

export const NavLink = forwardRef<ElementRef<NavLinkRef>, ComponentPropsWithoutRef<NavLinkRef>>(
    (props: NavLinkProps, forwardedRef) => {
        const { href = '/', isExternal = false, children, target, ...attr } = props;
        const context = useSubNavContext();

        // IF the level is NOT set OR isOpen set the tabindex to 0 else set to -1
        // This prevent hidden elements from being tabbed to
        const tabIndex = !context?.level || context?.isOpen ? 0 : -1;

        return isExternal ? (
            <a
                className="c-nav__link"
                href={href}
                target={target}
                tabIndex={tabIndex}
                {...attr}
                ref={forwardedRef}
            >
                {children}
            </a>
        ) : (
            <RemixNavLink
                to={href}
                className="c-nav__link"
                target={target}
                tabIndex={tabIndex}
                {...attr}
                ref={forwardedRef}
            >
                {children}
            </RemixNavLink>
        );
    }
);
NavLink.displayName = LINK_NAME;

/* -------------------------------------------------------------------------------------------------
 * useSubNavContext
 * -----------------------------------------------------------------------------------------------*/
const useSubNavContext = () => {
    const context = useContext(SubNavContext);

    // if `undefined`, throw an error
    if (context === undefined) {
        throw new Error('useSubNavContext was used outside of its Provider');
    }

    return context;
};
