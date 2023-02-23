import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

    """
    List of user's courses 
    """
    type UserCourse {
        Id: Int!
        Code: String
        Name: String
        Complete: Boolean
        PercentageComplete: Int
    }
    
    type Query {
        "Get the user's assigned courses"
        usersCourses(id: Int): [UserCourse]
    }
`;
