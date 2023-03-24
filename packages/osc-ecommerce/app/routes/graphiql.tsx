import { redirect } from '@remix-run/server-runtime';
import { graphiqlLoader } from '@shopify/hydrogen';
import type { LoaderArgs } from '@shopify/remix-oxygen';

/**
 * Because we're not using the Hydrogen CLI we have to add our graphiql page here
 * @see https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/graphiql#graphiql
 */
export async function loader(args: LoaderArgs) {
    if (process.env.NODE_ENV === 'development') {
        // Default Hydrogen GraphiQL behavior
        return graphiqlLoader(args);
    }

    return redirect('/');
}
