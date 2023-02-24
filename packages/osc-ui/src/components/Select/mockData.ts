import { z } from 'zod';

export const selectSchema = {
    courses: z.object({
        courses: z.string().refine(
            (val) =>
                courseItems
                    .map((value) => {
                        return value.value;
                    })
                    .includes(val),
            {
                message: 'Please select a course',
            }
        ),
    }),
};

export const courseItems = [
    {
        name: 'A Level Psychology',
        value: 'a-level-psychology',
        disabled: true,
    },
    {
        name: 'A Level Computer Science',
        value: 'a-level-computer-science',
    },
    { name: 'A Level History', value: 'a-level-history' },
    {
        name: 'A Level Sociology',
        value: 'a-level-sociology',
        disabled: true,
    },
    {
        name: 'A Level Geography',
        value: 'a-level-geography',
    },
    { name: 'A Level French', value: 'a-level-french' },
    {
        name: 'A Level German',
        value: 'a-level-german',
    },
    {
        name: 'A Level Maths',
        value: 'a-level-maths',
    },
    { name: 'A Level Physics', value: 'a-level-physics' },
    {
        name: 'A Level Biology',
        value: 'a-level-biology',
    },
];
