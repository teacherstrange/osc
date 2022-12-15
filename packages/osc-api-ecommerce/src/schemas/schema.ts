import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

    """
    Shopify product collated in Algolia 
    """
    type Product {
        """
        Shopify ID 
        """
        shopifyID: Float!

        """
        Algolia object ID 
        """
        algoliaID: Float!

        """
        Shopify's 'handle' - this is essentially a slug used by shopify
        """
        handle: String! 

        """
        Product SKU as seen in Shopify 
        """
        sku: String!

        """
        Product title
        """
        title: String!
        
        """
        Product base price 
        """
        price: Int!
    }

    """
    Shopify products collated in Algolia. When querying this we pass the customer's ref (curently our user ID), to start building personalisation options for them.
    """
    type Products {
        """
        All matched hits, up to the maximum specified by the hitsPerPage param
        """
        hits: [Product]

        """
        Total number of results that match the query. Originates from Algolia.
        """
        nbHits: Int
        
        """
        Total number of pages that match the query. Calculated by dividing nbHits, by hitsPerPage. Originates from Algolia.
        """
        nbPages: Int 
    }
    
    type Query {
        products(hitsPerPage: Int, page: Int, query: String): Products
        product(id: Int): Product     
    }
`;
