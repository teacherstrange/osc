import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

    type Preference {
        preferenceId: Int!
        key: String!
        title: String!
        value: String
        default: String!
    }

    type Query {
        userPreferences(): [Preference]
        userPreferenceByKey(key: String!): Preference
        userPreferenceById(id: Int!): Preference
    }
`;
