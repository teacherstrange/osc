import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

    """
    List of student's courses 
    """
    type UserCourse {
        id: Int
        title: String
        progress: Int
    }
    
    type Query {
        usersCourses(id: Int): [UserCourse]
    }
`;
