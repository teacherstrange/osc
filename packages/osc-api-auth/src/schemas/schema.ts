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
        ### Minimum 12 characters for password - length creates greater security than extended charsets or set patterns
        ### Requiring a set pattern makes it considerably easier to brute force as it narrows the possible range.
        password: String! @constraint(minLength: 12)
    }

    input createUserSetupInput {
        firstName: String! @constraint(maxLength: 128)
        lastName: String! @constraint(maxLength: 128)
        email: String! @constraint(format: "email", maxLength: 255)
        courses: [Int]
    }

    input loginInput {
        email: String! @constraint(format: email)
        password: String!
    }


    type Mutation {
        createUser(input: createUserInput!): User
        login(input: loginInput!): AuthTokens
        refreshAccess(refreshToken: String!): refreshAccess
        createUserSetup(input: createUserSetupInput!): User
        magicKeyRequest(magicKeyToken: String!) : User 
    }
`;