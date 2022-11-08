import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

    type User {
        id: Int!
        firstName: String
        lastName: String
        email: String!
        lastLogin: String
        lockedUntil: String
        createdAt: String
        updatedAt: String
        profile: Profile
    }

    type Profile {
        avatar: Avatar
        permissions: Permissions
        roles: [UserRole] 
        crmTokens: [CrmToken]
        lmsTokens: [LmsToken]
    }

    type Avatar {
        id: Int!
        userId: Int!
        reference: String!
        createdAt: String!
        updatedAt: String
    }
    
    type UserRole {
        id: Int!
        userId: Int!
        roleId: Int!
        details: Role
    }

    type Role {
        id: Int!
        title: String 
    }
    
    type Permissions {
        read: [String]
        write: [String]
    }
    
    type CrmToken {
        id: Int!
        crmId: Int!
        userId: Int!
        token: String!
        createdAt: String
        updatedAt: String
        crm: CRM
    }

    type CRM {
        id: Int!
        title: String
        url: String
        active: Boolean
    }

    type LmsToken {
        id: Int!
        lmsId: Int!
        userId: Int!
        token: String!
        createdAt: String
        updatedAt: String
        lms: LMS
    }

    type LMS {
        id: Int!
        title: String
        url: String
        active: Boolean
    }

    type AuthToken {
        token: String!
    }

    type Query {
        users(start: Int, limit: Int, pagination: String, cursor: String, orderBy: String, orderDir: String): [User]
        user(id: Int!): User
    }
    }

    type Mutation {
        createUser(firstName: String, lastName: String, email: String, password: String): User
        login(email: String!, password: String!): AuthToken
    }
`;
