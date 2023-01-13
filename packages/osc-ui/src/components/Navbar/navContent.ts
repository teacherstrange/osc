const subMenu = [
    {
        label: 'Sub category',
        href: '/',
    },
    {
        label: 'Sub category',
        href: '/',
    },
    {
        label: 'Sub category',
        href: '/',
    },
    {
        label: 'View all',
        href: '/',
    },
];

export const simpleNav = [
    {
        label: 'Courses',
        href: '/',
    },
    {
        label: 'How it works',
        href: '/',
    },
    {
        label: 'Special offers',
        href: '/baz',
    },
];

export const subMenuNav = [
    {
        label: 'Courses',
        isExternal: false,
        subMenu: [
            {
                label: 'Childcare & education',
                href: '/',
            },
            {
                label: 'Health & social care',
                href: '/',
            },
            {
                label: 'Access to HE',
                href: '/',
            },
            {
                label: 'Hair, beauty & nails',
                href: '/',
            },
        ],
    },
    {
        label: 'How it works',
        href: '/',
    },
    {
        label: 'Special offers',
        href: '/baz',
    },
];

export const nestedSubMenuNav = [
    {
        label: 'Courses',
        isExternal: false,
        subMenu: [
            {
                label: 'Column 1',
                column: [
                    {
                        label: 'Childcare & education',
                        href: '/',
                        subMenu,
                    },
                    {
                        label: 'Health & social care',
                        href: '/',
                        subMenu,
                    },
                    {
                        label: 'Access to HE',
                        href: '/',
                        subMenu,
                    },
                    {
                        label: 'Hair, beauty & nails',
                        href: '/',
                        subMenu,
                    },
                ],
            },
            {
                label: 'Column 2',
                column: [
                    {
                        label: 'Counselling & psychology',
                        href: '/',
                        subMenu,
                    },
                    {
                        label: 'Accounting & bookkeeping',
                        href: '/',
                        subMenu,
                    },
                    {
                        label: 'Business',
                        href: '/',
                        subMenu,
                    },
                    {
                        label: 'Computers & IT',
                        href: '/',
                        subMenu,
                    },
                ],
            },
            {
                label: 'Column 3',
                column: [
                    {
                        label: 'Health & safety',
                        href: '/',
                        subMenu,
                    },
                    {
                        label: 'Health, fitness & nutrition',
                        href: '/',
                        subMenu,
                    },
                    {
                        label: 'Animal care',
                        href: '/',
                        subMenu,
                    },
                    {
                        label: 'Higher education',
                        href: '/',
                        subMenu,
                    },
                    {
                        label: 'Languages',
                        href: '/',
                        subMenu,
                    },
                ],
            },
            {
                label: 'Column 4',
                column: [
                    {
                        label: 'Creative',
                        href: '/',
                        subMenu,
                    },
                    {
                        label: 'Property & home',
                        href: '/',
                        subMenu,
                    },
                    {
                        label: 'History',
                        href: '/',
                        subMenu,
                    },
                    {
                        label: 'Law & politics',
                        href: '/',
                        subMenu,
                    },
                    {
                        label: 'Maths & science',
                        href: '/',
                        subMenu,
                    },
                ],
            },
            {
                label: 'featured',
                featured: [
                    {
                        label: 'A levels',
                        href: '/',
                    },
                    {
                        label: 'GCSEs',
                        href: '/',
                    },
                    {
                        label: 'Discover all courses',
                        href: '/',
                    },
                ],
            },
        ],
    },
    {
        label: 'How it works',
        href: '/',
    },
    {
        label: 'Special offers',
        href: '/baz',
    },
];
