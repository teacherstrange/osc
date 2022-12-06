import type { product } from '~/types/algolia';
import type { getProductsArgs } from '~/types/arguments';
import type { EcommerceContext } from '~/types/interfaces';

export const resolvers = {
    Query: {
        products: async (_: undefined, args: getProductsArgs, context: EcommerceContext) => {
            const { hitsPerPage = 10, page = 1, query } = args;
            const { algoliaProducts, user } = context;
            const result = await algoliaProducts.search(query, {
                headers: { 'X-Algolia-UserToken': user.id.toString() },
                hitsPerPage: hitsPerPage,
                page: page
            });

            return result;
        }
    },
    Product: {
        shopifyID: async (parent: product) => {
            return parent.id;
        },
        algoliaID: async (parent: product) => {
            return parent.objectID;
        }
    },
    Mutation: {}
};
