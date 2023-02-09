import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

    type Student {
        studentId: Int!
        profile: StudentProfile
    }

    type StudentProfile {
        firstName: String
        lastName: String
        studying: [CourseAllocation]
    }

    type CourseAllocation {
        courseId: Int!
        course: Course!
        tutorId: Int
        tutor: Tutor
    }

    type Course {
        title: String
    }

    type Tutor {
        profile: TutorProfile
    }

    type TutorProfile {
        firstName: String
        lastName: String
    }

    type Query {
        unassignedStudents(limit: Int): [Student]
    }
`;
