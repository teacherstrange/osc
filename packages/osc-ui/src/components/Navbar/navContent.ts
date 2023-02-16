const subMenu = [
    {
        label: 'Sub category',
        href: '/sub-category',
    },
    {
        label: 'Sub category',
        href: '/sub-category',
    },
    {
        label: 'Sub category',
        href: '/sub-category',
    },
    {
        label: 'View all',
        href: '/view-all',
    },
];

export const simpleNav = [
    {
        label: 'Courses',
        href: '/courses',
    },
    {
        label: 'How it works',
        href: '/how-it-works',
    },
    {
        label: 'Special offers',
        href: '/special-offers',
    },
];

export const subMenuNav = [
    {
        label: 'Courses',
        isExternal: false,
        subMenu: [
            {
                label: 'Childcare & education',
                href: '/childcare-and-education',
            },
            {
                label: 'Health & social care',
                href: '/health-social-care',
            },
            {
                label: 'Access to HE',
                href: '/access-to-he',
            },
            {
                label: 'Hair, beauty & nails',
                href: '/hair-beauty-nails',
            },
        ],
    },
    {
        label: 'How it works',
        href: '/how-it-works',
    },
    {
        label: 'Special offers',
        href: '/special-offers',
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
                        href: '/childcare-and-education',
                        subMenu,
                    },
                    {
                        label: 'Health & social care',
                        href: '/health-social-care',
                        subMenu,
                    },
                    {
                        label: 'Access to HE',
                        href: '/access-to-he',
                        subMenu,
                    },
                    {
                        label: 'Hair, beauty & nails',
                        href: '/hair-beauty-nails',
                        subMenu,
                    },
                ],
            },
            {
                label: 'Column 2',
                column: [
                    {
                        label: 'Counselling & psychology',
                        href: '/counselling-and-psychology',
                        subMenu,
                    },
                    {
                        label: 'Accounting & bookkeeping',
                        href: '/accounting-and-bookkeeping',
                        subMenu,
                    },
                    {
                        label: 'Business',
                        href: '/business',
                        subMenu,
                    },
                    {
                        label: 'Computers & IT',
                        href: '/computers-and-it',
                        subMenu,
                    },
                ],
            },
            {
                label: 'Column 3',
                column: [
                    {
                        label: 'Health & safety',
                        href: '/health-safety',
                        subMenu,
                    },
                    {
                        label: 'Health, fitness & nutrition',
                        href: '/health-fitness-and-nutrition',
                        subMenu,
                    },
                    {
                        label: 'Animal care',
                        href: '/animal-care',
                        subMenu,
                    },
                    {
                        label: 'Higher education',
                        href: '/higher-education',
                        subMenu,
                    },
                    {
                        label: 'Languages',
                        href: '/languages',
                        subMenu,
                    },
                ],
            },
            {
                label: 'Column 4',
                column: [
                    {
                        label: 'Creative',
                        href: '/creative',
                        subMenu,
                    },
                    {
                        label: 'Property & home',
                        href: '/property-and-home',
                        subMenu,
                    },
                    {
                        label: 'History',
                        href: '/history',
                        subMenu,
                    },
                    {
                        label: 'Law & politics',
                        href: '/law-and-politics',
                        subMenu,
                    },
                    {
                        label: 'Maths & science',
                        href: '/maths-and-science',
                        subMenu,
                    },
                ],
            },
            {
                label: 'featured',
                featured: [
                    {
                        label: 'A levels',
                        href: '/a-levels',
                    },
                    {
                        label: 'GCSEs',
                        href: '/gcses',
                    },
                    {
                        label: 'Discover all courses',
                        href: '/discovered-all-courses',
                    },
                ],
            },
        ],
    },
    {
        label: 'How it works',
        href: '/how-it-works',
    },
    {
        label: 'Special offers',
        href: '/baz',
    },
    {
        label: 'Corporate',
        href: '/baz',
    },
    {
        label: 'Blog',
        href: '/baz',
    },
    {
        label: 'About',
        href: '/baz',
    },
    {
        label: 'Contact',
        href: '/baz',
    },
];

// Smaller version of the nestedSubMenuNav so tests aren't so hefty
export const testNestedSubMenuNav = [
    {
        label: 'Courses',
        isExternal: false,
        subMenu: [
            {
                label: 'Column 1',
                column: [
                    {
                        label: 'Childcare & education',
                        href: '/chilcare-and-education',
                        subMenu,
                    },
                    {
                        label: 'Health & social care',
                        href: '/healt-and-social-care',
                    },
                    {
                        label: 'Access to HE',
                        href: '/access-to-he',
                    },
                    {
                        label: 'Hair, beauty & nails',
                        href: '/hair-beauty-nails',
                    },
                ],
            },
            {
                label: 'featured',
                featured: [
                    {
                        label: 'A levels',
                        href: '/a-levels',
                    },
                    {
                        label: 'GCSEs',
                        href: '/gcse',
                    },
                    {
                        label: 'Discover all courses',
                        href: '/discovered-all-courses',
                    },
                ],
            },
        ],
    },
    {
        label: 'How it works',
        href: '/how-it-works',
    },
    {
        label: 'Special offers',
        href: '/baz',
    },
];
