import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/server-runtime';
import type { CollectionConnection } from '@shopify/hydrogen/storefront-api-types';
import type { LoaderArgs } from '@shopify/remix-oxygen';
import invariant from 'tiny-invariant';
import { PATHS } from '~/constants';
import { COLLECTIONS_QUERY as SHOPIFY_COLLECTIONS_QUERY } from '~/queries/shopify/collections';

export const loader = async ({ request, params, context }: LoaderArgs) => {
    const { storefront } = context;

    invariant(storefront, 'Missing storefront param');

    const { collections } = await storefront.query<{
        collections: CollectionConnection;
    }>(SHOPIFY_COLLECTIONS_QUERY, {
        variables: {
            country: storefront.i18n.country,
            language: storefront.i18n.language,
        },
    });

    return json({ collections });
};

// TODO: Need to make this page available in Sanity
export default function Collections() {
    const { collections } = useLoaderData<typeof loader>();

    return (
        <>
            <h1>All Categories</h1>

            {collections.nodes.length > 0
                ? collections.nodes.map((collection) => (
                      <div key={collection.id}>
                          <Link to={`/${PATHS.COLLECTIONS}/${collection.handle}`}>
                              {collection.title}
                          </Link>
                      </div>
                  ))
                : null}
        </>
    );
}
