import type { LinkProps as RemixLinkProps } from '@remix-run/react';
import { Link } from '@remix-run/react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, MouseEvent, ReactNode } from 'react';
import React from 'react';
import { useVariant } from '../../hooks/useVariant';
import { classNames } from '../../utils/classNames';

import './button.scss';

type ButtonOptions = HTMLAnchorElement | HTMLButtonElement | RemixLinkProps;

interface SharedProps {
    children: ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'full';
    variant?: 'solid' | 'outline';
    isDisabled?: boolean;
    isLoading?: boolean;
    loadingText?: string;
}

interface DefaultProps extends ButtonHTMLAttributes<ButtonOptions> {
    action?: 'default';
    type?: 'submit' | 'reset' | 'button';

    // Error on these types
    textToCopy?: never;
    href?: never;
    target?: never;
    to?: never;
}

interface CopyButtonProps extends ButtonHTMLAttributes<ButtonOptions> {
    action: 'copy';
    textToCopy: string;
    type?: 'submit' | 'reset' | 'button';

    // Error on these types
    href?: never;
    target?: never;
    to?: never;
}

interface LinkProps extends AnchorHTMLAttributes<ButtonOptions> {
    action: 'link';
    to: string;

    // Error on these types
    textToCopy?: never;
    isDisabled?: never;
    isLoading?: never;
    loadingText?: never;
    target?: never;
    href?: never;
}

interface AnchorProps extends AnchorHTMLAttributes<ButtonOptions> {
    action: 'anchor';
    href: string;
    target?: string;

    // Error on these types
    textToCopy?: never;
    isDisabled?: never;
    isLoading?: never;
    loadingText?: never;
    to?: never;
}

export type Props = SharedProps & (DefaultProps | CopyButtonProps | AnchorProps | LinkProps);

export const Button: FC<Props> = (props: Props) => {
    const {
        action = 'default',
        className,
        textToCopy,
        children,
        href,
        isDisabled,
        isLoading,
        loadingText,
        size = 'md',
        target,
        to,
        type,
        variant = 'solid',
        ...attr
    } = props;

    // TODO - sb - useVariant should probably be called useModifier - would match up with BEM better
    const sizeModifier = useVariant('c-button', size);
    const variantModifier = useVariant('c-button', variant);
    const classes = classNames('c-button', sizeModifier, variantModifier, className);

    const buttonInner = isLoading ? (
        <span>{loadingText ? loadingText : 'loading...'}</span>
    ) : (
        <span>{children}</span>
    );

    switch (action) {
        case 'copy':
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
                <button
                    className={classes}
                    onClick={handleCopyClick}
                    disabled={isDisabled ? isDisabled : null}
                    {...attr}
                >
                    {buttonInner}
                </button>
            );

        case 'link':
            return (
                <Link to={to} className={classes} {...attr}>
                    <span>{children}</span>
                </Link>
            );

        case 'anchor':
            const isBlank = target === '_blank' ? true : false;

            return (
                // If we're opening in a new window set the noopener and noreferrer tags
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#security_and_privacy
                <a
                    href={href}
                    rel={isBlank ? 'noopener noreferrer' : null}
                    className={classes}
                    {...attr}
                >
                    <span>{children}</span>
                </a>
            );

        default:
            return (
                <button className={classes} disabled={isDisabled ? isDisabled : null} {...attr}>
                    {buttonInner}
                </button>
            );
    }
};
