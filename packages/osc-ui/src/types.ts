export type Sizes = 'alpha' | 'beta' | 'gamma' | 'delta' | 'epsilon' | 'zeta';

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

export type Spacing = 10 | 50 | 110 | 210;

export type Direction = 'top' | 'right' | 'bottom' | 'left';

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
