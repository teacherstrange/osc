import type { LinkProps as RemixLinkProps } from '@remix-run/react';
import { Link as RemixLink } from '@remix-run/react';
import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    HTMLAttributes,
    MouseEvent,
    ReactElement,
    ReactNode,
} from 'react';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useModifier } from '../../hooks/useModifier';
import type { StrictUnion } from '../../types';
import { classNames } from '../../utils/classNames';

import './button.scss';

/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/

type buttonTypes = HTMLAnchorElement | HTMLButtonElement;

interface DefaultButtonProps extends ButtonHTMLAttributes<buttonTypes> {
    /**
     * Set the button as an anchor element, a button element, or a Remix `<Link>` component. Leave blank for a button element.
     * @default button
     */
    as?: 'button';
    /**
     * Sets the html attribute `type` of button
     */
    type?: 'submit' | 'reset' | 'button';
}

interface AnchorProps extends AnchorHTMLAttributes<buttonTypes> {
    /**
     * Set the button as an anchor element, a button element, or a Remix `<Link>` component. Leave blank for a button element.
     */
    as: 'a';
    /**
     * 'Sets the url the button links to, used in conjunction with `as="a"`'
     */
    href: string;
    /**
     * 'Sets the target of the button, used in conjunction with `as="a"`'
     */
    target?: string;
}

interface LinkProps extends RemixLinkProps {
    /**
     * Set the button as an anchor element, a button element, or a Remix `<Link>` component. Leave blank for a button element.
     */
    as: 'link';
    /**
     * 'Sets the url the button links to when using Remix `<Link>`, used in conjunction with `as="link"`'
     */
    to: RemixLinkProps['to'];
}

export interface SharedButtonProps {
    /**
     * 'The content of the button.'
     */
    children: ReactNode;
    /**
     * 'Custom class'
     */
    className?: string;
    /**
     * 'Sets the disabled state of the button and whether it is usable'
     * @default false
     */
    isDisabled?: boolean;
    /**
     * Makes the button fill the width of its container
     * @default false
     */
    isFull?: boolean;
    /**
     * 'Sets the loading state of the button and whether it is usable',
     * @default false
     */
    isLoading?: boolean;
    /**
     * Sets the button to be a pill shape
     * @default false
     */
    isPill?: boolean;
    /**
     * Inverses the colours of the button
     */
    isInversed?: boolean;
    /**
     * 'Sets the loading text of the button, used in conjunction with `isLoading`'
     * @default Loading
     */
    loadingText?: string;
    /**
     * 'Sets the size of the button'
     * @default md
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * 'Sets the style of the button, primary, secondary etc.'
     * @default primary
     */
    variant?:
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'quaternary'
        | 'quinary'
        | 'senary'
        | 'primary-gradient'
        | 'secondary-gradient';
}

export type ButtonProps = SharedButtonProps &
    StrictUnion<DefaultButtonProps | AnchorProps | LinkProps>;

export const Button = forwardRef<typeof HTMLElement, ButtonProps>(
    (props: ButtonProps, forwardedRef) => {
        const {
            as,
            className,
            children,
            isDisabled,
            isLoading,
            isPill,
            isInversed,
            isFull,
            loadingText = 'Loading',
            size = 'md',
            variant = 'primary',
            target,
            ...attr
        } = props;

        const sizeModifier = useModifier('c-btn', size);
        const variantModifier = useModifier('c-btn', variant);
        const classes = classNames(
            'c-btn',
            sizeModifier,
            variantModifier,
            className,
            isFull && 'is-full',
            isLoading && 'is-loading',
            isPill && 'is-pill',
            isInversed && 'is-inversed'
        );

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
            <span className="c-btn__inner">
                {loadingText && loadingText}{' '}
                <span className="c-btn-loader">
                    <span className="c-btn-loader__dot"></span>
                    <span className="c-btn-loader__dot"></span>
                    <span className="c-btn-loader__dot"></span>
                </span>
            </span>
        ) : (
            <span className="c-btn__inner">{children}</span>
        );

        // If we're opening in a new window set the noopener and noreferrer tags
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#security_and_privacy
        return (
            <Component
                className={classes}
                disabled={isDisabled ? isDisabled : null}
                data-disabled={isDisabled ? isDisabled : null}
                rel={isBlank ? 'noopener noreferrer' : null}
                target={target ? target : null}
                to={as === 'link' && attr.to ? attr.to : '/'} // fallback to homepage if to prop is missing from link
                {...attr}
                ref={forwardedRef}
            >
                {buttonInner}
            </Component>
        );
    }
);
Button.displayName = 'Button';

/* -------------------------------------------------------------------------------------------------
 * CopyButton
 * -----------------------------------------------------------------------------------------------*/
export interface CopyButtonProps
    extends SharedButtonProps,
        ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Text to add to the clipboard when pressed
     */
    textToCopy: string;
    /**
     * The content of the button
     */
    children: ReactNode;
}

export const CopyButton = (props: CopyButtonProps) => {
    const { textToCopy, children, isDisabled, ...attr } = props;
    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    const handleCopyClick = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;

        let originalButtonText = target.innerHTML;

        navigator.clipboard.writeText(textToCopy);

        target.innerHTML = '<span class="c-btn__inner">Copied!</span>';

        setTimeout(() => {
            return (target.innerHTML = originalButtonText);
        }, 300);
    };

    useEffect(() => {
        // Abort setting the offsetWidth if the button is full width
        if (ref.current.className.includes('c-btn--full')) {
            return;
        }

        setWidth(ref.current.offsetWidth);
    }, []);

    return (
        <Button
            onClick={handleCopyClick}
            disabled={isDisabled ? isDisabled : null}
            {...attr}
            ref={ref}
            // Set a min width to the button so it doesn't resize when the text changes if the text is shorter than the original text
            // we want to allow it to resize if the text is longer than the original text so we don't get an overflow of content.
            style={width ? { minWidth: `${width}px` } : null}
        >
            {children}
        </Button>
    );
};

/* -------------------------------------------------------------------------------------------------
 * ButtonGroup
 * -----------------------------------------------------------------------------------------------*/
interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The content of the button group
     */
    children: ReactElement<ButtonProps> | ReactElement<ButtonProps>[];
    /**
     * Sets the direction of the button group
     * @default row
     */
    direction?: 'row' | 'column';
}

export const ButtonGroup = (props: ButtonGroupProps) => {
    const { children, direction = 'row', ...attr } = props;
    const directionModifier = useModifier('c-btn-group', direction);
    const classes = classNames('c-btn-group', directionModifier);

    return (
        <div className={classes} {...attr}>
            {children}
        </div>
    );
};
