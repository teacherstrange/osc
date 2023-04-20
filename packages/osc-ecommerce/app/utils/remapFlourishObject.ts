import {
    flourishCollectionPrimary,
    flourishCollectionQuaternary,
    flourishCollectionQuinary,
    flourishCollectionSecondary,
    flourishCollectionTertiary,
    flourishHeroPrimary,
    flourishHeroSecondary,
    flourishHeroTertiary,
    flourishPrimary,
    flourishSecondary,
} from 'osc-ui';
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
        case 'flourishPrimary':
            pattern = flourishPrimary;
            variant = 'primary';
            break;
        case 'flourishSecondary':
            pattern = flourishSecondary;
            variant = 'secondary';
            break;
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
        case 'flourishCollectionPrimary':
            pattern = flourishCollectionPrimary;
            variant = 'collection-primary';
            break;
        case 'flourishCollectionSecondary':
            pattern = flourishCollectionSecondary;
            variant = 'collection-secondary';
            break;
        case 'flourishCollectionTertiary':
            pattern = flourishCollectionTertiary;
            variant = 'collection-tertiary';
            break;
        case 'flourishCollectionQuaternary':
            pattern = flourishCollectionQuaternary;
            variant = 'collection-quaternary';
            break;
        case 'flourishCollectionQuinary':
            pattern = flourishCollectionQuinary;
            variant = 'collection-quinary';
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
