import { NavLink as RemixNavLink } from '@remix-run/react';
import uniqueId from 'lodash.uniqueid';
import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ComponentPropsWithoutRef,
    ElementRef,
    ForwardRefExoticComponent,
    HTMLAttributes,
    ReactNode,
    RefAttributes,
} from 'react';
import React, {
    createContext,
    forwardRef,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import breakpoints from '../../../../../tokens/media-queries';
import { useInteractOutside } from '../../hooks/useInteractOutside';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { classNames } from '../../utils/classNames';
import { rem } from '../../utils/rem';

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
type NavRef = ForwardRefExoticComponent<NavProps & RefAttributes<HTMLDivElement>>;

export const Navbar = forwardRef<ElementRef<NavRef>, ComponentPropsWithoutRef<NavRef>>(
    (props: NavProps, forwardedRef) => {
        const { children, className, label = 'main', ...attr } = props;
        const classes = classNames('c-nav', className);

        return (
            <nav aria-label={label} className={classes} {...attr} ref={forwardedRef}>
                {children}
            </nav>
        );
    }
);
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
    const ref = useRef<HTMLDivElement>(null);

    // IDs get regenerated on every render so we're memoizing them here to preserve them
    const contentId = useMemo(() => uniqueId('content:'), []);
    const triggerId = useMemo(() => uniqueId('trigger:'), []);

    const context = {
        name: SUBMENU_NAME,
        level,
        isOpen,
        setIsOpen,
        contentId,
        triggerId,
        triggerLabel: label,
    };

    const parentClassName = level === 0 ? 'c-nav__submenu--parent' : '';

    const classes = classNames('c-nav__submenu', parentClassName, className);

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
    const { isOpen, level, setIsOpen, contentId, triggerId } = useContext(SubNavContext);
    const desk = useMediaQuery(`(min-width: ${rem(breakpoints.desk)}rem)`);

    return (
        <button
            id={triggerId}
            disabled={disabled}
            data-disabled={disabled ? '' : undefined}
            data-state={isOpen ? 'open' : 'closed'}
            aria-expanded={isOpen}
            aria-controls={contentId}
            className={classes}
            {...attr}
            ref={forwardedRef}
            onClick={() => setIsOpen(!isOpen)}
        >
            {children}

            {/* Only show the icon if the level is > 0 or were not on a desktop */}
            {level !== 0 || !desk ? (
                // TODO: Update this icon to use our Icons
                <svg
                    width="15"
                    height="10"
                    viewBox="0 0 15 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="c-nav__trigger-icon"
                    aria-hidden
                >
                    <path
                        d="M7.72284 5.42052L3.17348 0.885194L0.940918 3.12477L7.70178 9.86457L14.4977 3.11073L12.2652 0.878174L7.72284 5.42052Z"
                        fill="#062134"
                    />
                </svg>
            ) : null}
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
    const { isOpen, setIsOpen, contentId, triggerId, triggerLabel } = useContext(SubNavContext);
    const desk = useMediaQuery(`(min-width: ${rem(breakpoints.desk)}rem)`);

    return (
        <div
            id={contentId}
            data-state={isOpen ? 'open' : 'closed'}
            data-level={level}
            aria-labelledby={triggerId}
            className={classes}
            {...attr}
        >
            {/* Remove button from DOM on desktop */}
            {!desk ? (
                <button
                    aria-controls={contentId}
                    aria-expanded={isOpen}
                    className="c-nav__trigger c-nav__trigger--close"
                    onClick={() => setIsOpen(false)}
                    aria-label={`Close ${triggerLabel}`}
                >
                    {/* TODO: Update with Icon component */}
                    <svg
                        width="15"
                        height="10"
                        viewBox="0 0 15 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="c-nav__trigger-icon"
                        aria-hidden
                    >
                        <path
                            d="M7.72284 5.42052L3.17348 0.885194L0.940918 3.12477L7.70178 9.86457L14.4977 3.11073L12.2652 0.878174L7.72284 5.42052Z"
                            fill="#062134"
                        />
                    </svg>

                    <span>{triggerLabel}</span>
                </button>
            ) : null}

            {/* Add button to DOM on desktop & top level submenu */}
            {desk && level === 0 ? (
                <button
                    aria-controls={contentId}
                    aria-expanded={isOpen}
                    className="c-nav__trigger c-nav__trigger--close"
                    onClick={() => setIsOpen(false)}
                    aria-label={`Close ${triggerLabel}`}
                >
                    {/* TODO: Update with Icon component */}
                    <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                    >
                        <path
                            d="M17.5104 5.40608L13.3112 1.24051L9.0593 5.49807L4.51783 0.951416L0.331787 5.14327L4.88642 9.67678L0.608224 13.9606L4.79427 18.1393L9.07246 13.8686L13.2717 18.0473L17.4577 13.8686L13.2453 9.67678L17.5104 5.40608Z"
                            fill="#062134"
                        />
                    </svg>
                </button>
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

        return isExternal ? (
            <a className="c-nav__link" href={href} target={target} {...attr} ref={forwardedRef}>
                {children}
            </a>
        ) : (
            <RemixNavLink
                to={href}
                className="c-nav__link"
                target={target}
                {...attr}
                ref={forwardedRef}
            >
                {children}
            </RemixNavLink>
        );
    }
);
NavLink.displayName = LINK_NAME;
