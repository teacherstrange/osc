import type { Themes } from 'packages/osc-ui/src/types';

export type Widths = '1/16' | '2/16' | '3/16';
export type Heights = '4/16' | '8/16' | '12/16' | '16/16';
export type Colors = Exclude<Themes, 'denary' | 'duodenary'>;
export type Variants = 'primary' | 'secondary';

export interface Flourish {
    size: {
        w: Widths;
        h: Heights;
    };
    initial: {
        rotate: number;
        x: string | number;
        y: string | number;
    };
}
