import type { LinkProps as RemixLinkProps } from '@remix-run/react';
import { Link as RemixLink } from '@remix-run/react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, MouseEvent, ReactNode } from 'react';
import React from 'react';
import { useModifier } from '../../hooks/useModifier';
import type { StrictUnion } from '../../types';
import { classNames } from '../../utils/classNames';

import './button.scss';

type buttonTypes = HTMLAnchorElement | HTMLButtonElement;

interface DefaultButtonProps extends ButtonHTMLAttributes<buttonTypes> {
    /** Will be a button by default */
    as?: 'button';
    type?: 'submit' | 'reset' | 'button';
}

interface AnchorProps extends AnchorHTMLAttributes<buttonTypes> {
    /** Set the button as an anchor element */
    as: 'a';
    href: string;
    target?: string;
}

interface LinkProps extends RemixLinkProps {
    /** Set the button as a RemixLink component */
    as: 'link';
    to: RemixLinkProps['to'];
}

export interface SharedProps {
    children: ReactNode;
    className?: string;
    isDisabled?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    size?: 'sm' | 'md' | 'lg' | 'full';
    variant?: 'solid' | 'outline' | 'ghost';
}

export type ButtonProps = SharedProps & StrictUnion<DefaultButtonProps | AnchorProps | LinkProps>;

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
    const {
        as,
        className,
        children,
        isDisabled,
        isLoading,
        loadingText,
        size = 'md',
        variant = 'solid',
        target,
        ...attr
    } = props;

    const sizeModifier = useModifier('c-button', size);
    const variantModifier = useModifier('c-button', variant);
    const classes = classNames('c-button', sizeModifier, variantModifier, className);

    // Set our component as either the passed element or a button
    let Component;

    if (as === 'link') {
        Component = RemixLink;
    } else if (as === 'a') {
        Component = 'a';
    } else {
        Component = 'button';
    }

    const isBlank = target === '_blank' ? true : false;

    const buttonInner = isLoading ? (
        <span>{loadingText ? loadingText : 'loading...'}</span>
    ) : (
        <span>{children}</span>
    );

    // If we're opening in a new window set the noopener and noreferrer tags
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#security_and_privacy
    return (
        <Component
            className={classes}
            disabled={isDisabled ? isDisabled : null}
            rel={isBlank ? 'noopener noreferrer' : null}
            target={target ? target : null}
            {...attr}
        >
            {buttonInner}
        </Component>
    );
};

/**
 * CopyButton
 *
 * Component for copying text to the clipboard, is an extension of the Button component
 */

export interface CopyButtonProps extends SharedProps, ButtonHTMLAttributes<HTMLButtonElement> {
    textToCopy: string;
    children: ReactNode;
}

export const CopyButton: FC<CopyButtonProps> = (props: CopyButtonProps) => {
    const { textToCopy, children, isDisabled, ...attr } = props;

    const handleCopyClick = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;

        let originalButtonText = target.innerHTML;

        navigator.clipboard.writeText(textToCopy);

        target.innerHTML = '<span>Copied!</span>';

        setTimeout(() => {
            return (target.innerHTML = originalButtonText);
        }, 300);
    };

    return (
        <Button onClick={handleCopyClick} disabled={isDisabled ? isDisabled : null} {...attr}>
            {children}
        </Button>
    );
};

/**
 * ButtonGroup
 *
 * Component for grouping buttons together
 */

interface ButtonGroupProps {
    children: ReactNode;
    direction?: 'column';
}

export const ButtonGroup: FC<ButtonGroupProps> = (props: ButtonGroupProps) => {
    const { children, direction } = props;
    const directionModifier = useModifier('c-button-group', direction);
    const classes = classNames('c-button-group', directionModifier);

    return <div className={classes}>{children}</div>;
};
