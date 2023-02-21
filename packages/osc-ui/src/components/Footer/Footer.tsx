import type { AccordionContentProps, AccordionItemProps } from '@radix-ui/react-accordion';
import type { Attributes, HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { useModifier } from '../../hooks/useModifier';
import type { StrictUnion } from '../../types';
import { classNames } from '../../utils/classNames';
import type { AccordionHeadingProps, AccordionProps } from '../Accordion/Accordion';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '../Accordion/Accordion';

import './footer.scss';

export interface SharedFooterProps {
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
 * Footer
 * -----------------------------------------------------------------------------------------------*/
export interface FooterProps extends SharedFooterProps, HTMLAttributes<HTMLDivElement> {}

export const Footer = (props: FooterProps) => {
    const { children, className, ...attr } = props;
    const classes = classNames('c-footer', 'o-container', className);

    return (
        <footer className={classes} {...attr}>
            {children}
        </footer>
    );
};

/* -------------------------------------------------------------------------------------------------
 * FooterGroup
 * -----------------------------------------------------------------------------------------------*/
export interface FooterGroupProps extends SharedFooterProps, HTMLAttributes<HTMLDivElement> {
    /**
     * The flow direction of the content
     * @default row
     */
    direction?: 'row' | 'column';
}

export const FooterGroup = (props: FooterGroupProps) => {
    const { children, className, direction = 'row', ...attr } = props;
    const directionModifier = useModifier('c-footer__group', direction);

    const classes = classNames('c-footer__group', directionModifier, className);

    return (
        <div className={classes} {...attr}>
            {children}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * FooterMenu
 * -----------------------------------------------------------------------------------------------*/
interface DefaultFooterMenuProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Whether the menu should display as an accordion
     * @default false
     */
    isAccordion?: false;
}

type FooterAccordionProps = AccordionProps & {
    /**
     * Whether the menu should display as an accordion
     */
    isAccordion: true;
    type: 'single';
};

export type FooterMenuProps = SharedFooterProps &
    StrictUnion<DefaultFooterMenuProps | FooterAccordionProps>;

export const FooterMenu = (props: FooterMenuProps) => {
    const { isAccordion = false, children, className, defaultValue, type, ...rest } = props;
    const classes = classNames('c-footer__menu', className);

    return isAccordion ? (
        <Accordion
            asChild
            defaultValue={typeof defaultValue === 'string' && defaultValue}
            type={type}
            {...rest}
        >
            <div className={classes}>{children}</div>
        </Accordion>
    ) : (
        <div className={classes}>{children}</div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * FooterMenuItem
 * -----------------------------------------------------------------------------------------------*/
interface DefaultFooterMenuItemProps extends HTMLAttributes<HTMLDivElement>, Attributes {
    /**
     * Whether the menu should display as an accordion
     * @default false
     */
    isAccordion?: false;
}

interface FooterAccordionItemProps extends AccordionItemProps {
    /**
     * Whether the menu should display as an accordion
     */
    isAccordion: true;
}

export type FooterMenuItemProps = SharedFooterProps &
    StrictUnion<DefaultFooterMenuItemProps | FooterAccordionItemProps>;

export const FooterMenuItem = (props: FooterMenuItemProps) => {
    const { isAccordion = false, children, className, value, ...rest } = props;
    const classes = classNames('c-footer__menu-item', className);

    return isAccordion ? (
        <AccordionItem asChild value={value} {...rest}>
            <div className={classes}>{children}</div>
        </AccordionItem>
    ) : (
        <div className={classes}>{children}</div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * FooterMenuHeader
 * -----------------------------------------------------------------------------------------------*/
interface DefaultFooterMenuHeaderProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Whether the menu should display as an accordion
     * @default false
     */
    isAccordion?: false;
}

interface FooterAccordionHeaderProps extends AccordionHeadingProps {
    /**
     * Whether the menu should display as an accordion
     */
    isAccordion: true;
}

export type FooterMenuHeaderProps = SharedFooterProps &
    StrictUnion<DefaultFooterMenuHeaderProps | FooterAccordionHeaderProps>;

export const FooterMenuHeader = (props: FooterMenuHeaderProps) => {
    const { isAccordion = false, children, className, ...rest } = props;
    const classes = classNames('c-footer__menu-header', className);

    return isAccordion ? (
        <AccordionHeader asChild {...rest}>
            <div className={classes}>{children}</div>
        </AccordionHeader>
    ) : (
        <h2 className={classes}>{children}</h2>
    );
};

/* -------------------------------------------------------------------------------------------------
 * FooterMenuContent
 * -----------------------------------------------------------------------------------------------*/
interface DefaultFooterMenuContentProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Whether the menu should display as an accordion
     * @default false
     */
    isAccordion?: false;
}

interface FooterAccordionContentProps extends AccordionContentProps {
    /**
     * Whether the menu should display as an accordion
     */
    isAccordion: true;
}

export type FooterMenuContentProps = SharedFooterProps &
    StrictUnion<DefaultFooterMenuContentProps | FooterAccordionContentProps>;

export const FooterMenuContent = (props: FooterMenuContentProps) => {
    const { isAccordion = false, children, className, ...rest } = props;
    const classes = classNames('c-footer__menu-content', className);

    return isAccordion ? (
        <AccordionPanel {...rest}>
            <div className={classes}>{children}</div>
        </AccordionPanel>
    ) : (
        <div className={classes}>{children}</div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * FooterBottom
 * -----------------------------------------------------------------------------------------------*/
export interface FooterBottomProps extends SharedFooterProps, HTMLAttributes<HTMLDivElement> {}

export const FooterBottom = (props: FooterBottomProps) => {
    const { children, className, ...attr } = props;

    const classes = classNames('c-footer__btm', className);
    const year = new Date().getFullYear();

    return (
        <div className={classes} {...attr}>
            <div className="c-footer__btm-item">&copy; Open Study College {year}</div>
            <div className="c-footer__btm-item">{children}</div>
        </div>
    );
};
