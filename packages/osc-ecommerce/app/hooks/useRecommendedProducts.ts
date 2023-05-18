import type { RouteMatch } from '@remix-run/react';
import type { Product } from '@shopify/hydrogen/storefront-api-types';
import { useMatches } from 'react-router-dom';

/**
 * A custom hook that returns the recommended products from the course page.
 *
 * The recommended products must be exported from the loader.
 * Can only be used on a course page.
 *
 * @returns The recommended products from the course page.
 */
export const useRecommendedProducts = () => {
    const matches = useMatches();
    const match = matches.find((match) => match.id === 'routes/courses/$slug') as RouteMatch;

    if (!match) {
        console.error('`useRecommendedProducts` must be used on a course page');

        return;
    }

    if (!match.data.recommendedProducts) {
        console.error('`recommendedProducts` must be exported from the loader on the page');

        return;
    }

    const products = match.data.recommendedProducts.recommended as Product[];

    return products;
};
