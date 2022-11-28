import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

    type Product {
        id: Int!
        title: String!
        price: Int!    
    }

    type Query {
        products(start: Int, limit: Int, pagination: String, cursor: String, orderBy: String, orderDir: String): [Product]
        product(id: Int): Product     
    }
`;
