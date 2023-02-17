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

    /**
     * The size of the icon, can either be a singular value or an array (x,y)
     * will default to 30 if not specified
     * @default 30
     */
    size?: number | [number, number];
}

export const Icon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
    const { className, id, size = 30, ...attr } = props;
    const classes = classNames('o-icon', className);
    const { spriteSheetPath } = useSpritesheetContext();

    const width = Array.isArray(size) ? size[0] : size;
    const height = Array.isArray(size) ? size[1] : size;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
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
     * Spritesheet path.
     *
     * @default ./spritesheet.svg
     */
    spriteSheetPath?: string;
}
export const SpritesheetProvider = (props: SpritesheetProviderProps) => {
    const { children, spriteSheetPath = './spritesheet.svg' } = props;

    return (
        <SpritesheetContext.Provider
            value={{
                spriteSheetPath: spriteSheetPath,
            }}
        >
            {children}
        </SpritesheetContext.Provider>
    );
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
