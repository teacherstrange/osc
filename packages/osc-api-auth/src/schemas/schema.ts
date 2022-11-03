import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

    type User {
        id: String!
        firstName: String
        lastName: String
        email: String!
    }

    type AuthToken {
        token: String!
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        createUser(firstName: String, lastName: String, email: String, password: String): User
        login(email: String!, password: String!): AuthToken
    }
`;
