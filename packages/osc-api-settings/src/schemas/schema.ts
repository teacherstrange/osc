import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    extend schema
        @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

    type UserPreference {
        id: Int!
        userId: String!
        preferenceId: String!
        value: String
        valueJson: String
        details: Preference
    }

    type Preference {
        id: Int!
        key: String!
        title: String!
        default: String
        defaultJson: String
        isJson: Boolean
    }

    type Query {
        preference(id: Int!): Preference
        preferenceByKey(key: String!): Preference
        userPreferences: [UserPreference]
        userPreferenceByKey(key: String!): UserPreference
        userPreference(id: Int!): UserPreference
    }

    input savePreferenceInput {
        preferenceId: Int!
        value: String!
    }

    input savePreferenceByKeyInput {
        preferenceKey: String!
        value: String!
    }

    type Mutation {
        savePreference(input: savePreferenceInput!): UserPreference
        savePreferenceByKey(input: savePreferenceByKeyInput!): UserPreference
    }
`;
