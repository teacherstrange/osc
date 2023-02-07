import * as AccessibleIconPrimitive from '@radix-ui/react-accessible-icon';
import type { ReactNode } from 'react';
import React, { createContext, forwardRef, useContext } from 'react';
import { classNames } from '../../utils/classNames';

export interface IconProps {
    /**
     * The class name to apply to the icon
     */
    className?: string;

    /**
     * The id of the icon to reference from the spritesheet
     */
    id: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
    const { className, id, ...attr } = props;
    const classes = classNames('o-icon', className);
    const size = 30; // an arbitrary size that constrains the width and height of the icon if css isn't loaded for whatever reason
    const { spriteSheetPath } = useSpritesheetContext();

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            className={classes}
            {...attr}
            ref={forwardedRef}
        >
            <use href={`${spriteSheetPath}#${id}`} />
        </svg>
    );
});
Icon.displayName = 'Icon';

// Accessible icon wrapper: https://www.radix-ui.com/docs/primitives/utilities/accessible-icon
interface AccessibleIconProps {
    /**
     * Pass an icon as a child
     */
    children: ReactNode;
    /**
     * The accessible label for the icon
     */
    label: string;
}

export const AccessibleIcon = (props: AccessibleIconProps) => {
    const { children, label } = props;

    return <AccessibleIconPrimitive.Root label={label}>{children}</AccessibleIconPrimitive.Root>;
};

/* -------------------------------------------------------------------------------------------------
 * Spritesheet provider
 * -----------------------------------------------------------------------------------------------*/
const SpritesheetContext = createContext(null);

export interface SpritesheetProviderProps {
    /**
     * The content of the button.
     */
    children?: ReactNode;

    /**
     * Spritesheet path context value for the spritesheet provider.
     * @default ./spritesheet.svg
     */
    value?: {
        spriteSheetPath: string;
    };
}
export const SpritesheetProvider = (props: SpritesheetProviderProps) => {
    const {
        children,
        value = {
            spriteSheetPath: './spritesheet.svg',
        },
    } = props;

    return <SpritesheetContext.Provider value={value}>{children}</SpritesheetContext.Provider>;
};

/* -------------------------------------------------------------------------------------------------
 * useSpritesheetContext
 * -----------------------------------------------------------------------------------------------*/
const useSpritesheetContext = () => {
    const context = useContext(SpritesheetContext);

    // if `undefined`, throw an error
    if (context === undefined) {
        throw new Error('useSpritesheetContext was used outside of its Provider');
    }

    return context;
};
