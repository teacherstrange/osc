import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    extend schema
        @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

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

    type CourseTutor {
        id: Int!
        courseId: Int!
        tutorId: Int!
        iv: Boolean
    }

    type Role {
        id: Int!
        title: String
    }

    type Permissions {
        read: [String]
        write: [String]
    }

    type Permission {
        id: Int!
        title: String!
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
        users(
            start: Int
            limit: Int
            pagination: String
            cursor: String
            orderBy: String
            orderDir: String
        ): [User]
        user(id: Int): User
        permissions(limit: Int): [Permission]
    }

    input createUserSetupInput {
        firstName: String! @constraint(maxLength: 128)
        lastName: String! @constraint(maxLength: 128)
        email: String! @constraint(format: "email", maxLength: 255)
        courses: [Int]
    }

    input completeRegistration {
        email: String! @constraint(format: "email", maxLength: 255)
        password: String!
        magicKey: String!
    }

    input loginInput {
        email: String! @constraint(format: email)
        password: String!
    }
    input tutorCourseInput {
        courseId: Int!
        iv: Boolean
    }

    input passwordResetInput {
        magicKeyToken: String!
        password: String!
    }

    input createUserInput {
        firstName: String! @constraint(maxLength: 128)
        lastName: String! @constraint(maxLength: 128)
        email: String! @constraint(format: "email", maxLength: 255)
        orgId: Int!
        roles: [Int]
        createdBy: Int!
        extraPermissions: [Int]
        ### Minimum 12 characters for password - length creates greater security than extended charsets or set patterns
        ### Requiring a set pattern makes it considerably easier to brute force as it narrows the possible range.
        password: String! @constraint(minLength: 12)
    }

    input courseAccept {
        courseId: Int!
        accept: Boolean!
    }

    input completeTutorCreate {
        email: String! @constraint(format: "email", maxLength: 255)
        password: String!
        magicKey: String!
        courses: [courseAccept]
    }

    input createTutorInput {
        email: String! @constraint(format: email)
        firstName: String!
        lastName: String!
        course: [tutorCourseInput]
        IVUser: Boolean!
    }

    input socialLoginCreateInput {
        userId: Int!
        name: String!
        ssoId: String!
    }

    type Mutation {
        createUser(input: createUserInput!): User
        login(input: loginInput!): AuthTokens
        refreshAccess(refreshToken: String!): refreshAccess
        createUserSetup(input: createUserSetupInput!): User
        validateMagicToken(magicKeyToken: String!): User
        completeRegistration(input: completeRegistration!): User
        requestResetPassword(email: String!): Boolean!
        completeResetPassword(input: passwordResetInput!): User
        createTutor(input: createTutorInput): User
        markUserAsIV(userId: Int!): UserRole
        socialLogin(ssoId: String!): AuthTokens
        socialLoginCreate(input: socialLoginCreateInput): Boolean
        validateTutor(magicKeyToken: String!): [CourseTutor]
        completeTutorCreate(input: completeTutorCreate!): User
    }
`;
