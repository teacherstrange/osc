import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

    type User {
        id: String!
        firstName: String
        lastName: String
        email: String!
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        login(email: String!, password: String!): String
    }
`;
