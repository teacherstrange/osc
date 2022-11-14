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
    type refreshAccess {
        accessToken: String!
    }
    type AuthTokens {
        accessToken: String!
        refreshToken: String!
    }

    type Query {
        users(start: Int, limit: Int, pagination: String, cursor: String, orderBy: String, orderDir: String): [User]
        user(id: Int): User
    }

    input createUserInput {
        firstName: String! @constraint(maxLength: 128)
        lastName: String! @constraint(maxLength: 128)
        email: String! @constraint(format: "email", maxLength: 255)
        ### Minimum 9 characters, at least one uppercase letter, one lowercase letter and one number. #?!@$%^&*- characters allowed but not required
        ### Note it seems to break if we use any / in the regex, for example /d for all digits [0-9] 
        password: String! @constraint(minLength: 9, maxLength: 32, pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#?!@$%^&*-]{9,}$")
    }

    input loginInput {
        email: String! @constraint(format: email)
        password: String! @constraint(minLength: 9, maxLength: 32)
    }

    type Mutation {
        createUser(input: createUserInput!): User
        login(input: loginInput!): AuthTokens
        refreshAccess(refreshToken: String!): refreshAccess
    }
`;
