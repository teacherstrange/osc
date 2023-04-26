import type {
    ComponentPropsWithoutRef,
    ComponentPropsWithRef,
    ElementType,
    PropsWithChildren,
} from 'react';

export type Sizes = '4xl' | '3xl' | '2xl' | 'xl' | 'l' | 'm' | 's';

export type Themes =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'quaternary'
    | 'quinary'
    | 'senary'
    | 'septenary'
    | 'octonary'
    | 'nonary'
    | 'denary'
    | 'duodenary';

export type Variants = 'outline' | 'subtle';

export type Spacing =
    | '2xs'
    | 'xs'
    | 's'
    | 'm'
    | 'l'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl';

export type Direction = 'top' | 'right' | 'bottom' | 'left';

export type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type Alignments = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Maybe<T> = T | null | undefined;

// FLourishes
export type FlourishWidths = '1/16' | '2/16' | '3/16';
export type FlourishHeights = '4/16' | '8/16' | '12/16' | '16/16';
export type FlourishVariants = 'primary' | 'secondary';

export interface TransformPattern {
    initial: {
        rotate: number;
    };
}

export interface FlourishObject extends TransformPattern {
    size: {
        w: FlourishWidths;
        h: FlourishHeights;
    };
}

// StrictUnion type allows us to set up props that are mutually exclusive
// For example if you have a prop called isSuccess and isError, you can't have both
// Using this helper you can set up the type to only allow one of the two at a time
// without having to define the "never" property in each interface.
// https://stackoverflow.com/questions/52677576/typescript-discriminated-union-allows-invalid-state/52678379#52678379
type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends any
    ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>>
    : never;
export type StrictUnion<T> = StrictUnionHelper<T, T>;

/* -------------------------------------------------------------------------------------------------
 * Polymorphic Component Generic
 * -----------------------------------------------------------------------------------------------*/
/**
 * Generic to set the as prop
 */
type AsProp<C extends ElementType> = {
    as?: C;
};
/**
 * Omit any props that don't match the given type
 */
type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

/**
 * Sets the appropriate props for a polymorphic component
 */
export type PolymorphicComponentProps<C extends ElementType, Props = {}> = PropsWithChildren<
    Props & AsProp<C>
> &
    Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

/**
 * Adds ref support when needed
 */
export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];
