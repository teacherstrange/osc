import type { Direction, Spacing } from '../types';

export const useSpacing = (
    boxControl: 'margin' | 'padding',
    direction: Direction,
    space: Spacing
) => {
    const getFirstLetter = (str: string) => str.split('').shift().toLowerCase();

    if (!boxControl || !direction || !space) {
        return;
    }

    const control = getFirstLetter(boxControl);
    const dir = getFirstLetter(direction);

    return `u-${control}${dir}-${space}`;
};
