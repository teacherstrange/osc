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

export type Maybe<T> = T | null | undefined;

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
