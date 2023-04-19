import { flourishHeroPrimary, flourishHeroSecondary, flourishHeroTertiary } from 'osc-ui';
import type { Maybe } from 'osc-ui/src/types';
import type { flourishSettings } from '~/types/sanity';

/**
 * Remaps the "flourishes" object pattern and variant values based on the input setting.
 *
 * @param {Maybe<flourishSettings>} flourishes - The object containing the pattern and variant values to be remapped.
 * @returns {Maybe<flourishSettings>} The remapped "flourishes" object, or undefined if the input is null or undefined.
 */
export const remapFlourishObject = (flourishes: Maybe<flourishSettings>) => {
    if (!flourishes) return;

    let pattern;
    let variant;
    switch (flourishes.pattern) {
        case 'flourishHeroPrimary':
            pattern = flourishHeroPrimary;
            variant = 'hero-primary';
            break;
        case 'flourishHeroSecondary':
            pattern = flourishHeroSecondary;
            variant = 'hero-secondary';
            break;
        case 'flourishHeroTertiary':
            pattern = flourishHeroTertiary;
            variant = 'hero-tertiary';
            break;
        default:
            pattern = undefined;
            variant = undefined;
            break;
    }

    return Object.assign(flourishes, {
        pattern,
        variant,
    });
};
