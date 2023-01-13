import { ChevronRightIcon } from '@radix-ui/react-icons';
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
    const { isOpen, setIsOpen, contentId, triggerId } = useContext(SubNavContext);

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

            {/* TODO: Update this icon */}
            <ChevronRightIcon className="c-nav__trigger-icon" aria-hidden />
        </button>
    );
});
NavTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * NavContent
 * -----------------------------------------------------------------------------------------------*/
const CONTENT_NAME = 'NavContent';
interface NavContentProps extends SharedNavProps, HTMLAttributes<HTMLDivElement> {
    level: number;
}
type NavContentRef = ForwardRefExoticComponent<NavContentProps & RefAttributes<HTMLDivElement>>;

export const NavContent = forwardRef<
    ElementRef<NavContentRef>,
    ComponentPropsWithoutRef<NavContentRef>
>((props: NavContentProps, forwardedRef) => {
    const { children, className, level, ...attr } = props;

    const classes = classNames('c-nav__content', className);
    const { isOpen, contentId, triggerId } = useContext(SubNavContext);

    return (
        <div
            id={contentId}
            data-state={isOpen ? 'open' : 'closed'}
            data-level={level}
            aria-labelledby={triggerId}
            className={classes}
            {...attr}
            ref={forwardedRef}
        >
            {children}
        </div>
    );
});
NavContent.displayName = CONTENT_NAME;

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
