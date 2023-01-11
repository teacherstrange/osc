export const simpleNav = [
    {
        label: 'Item 1',
        href: '/',
    },
    {
        label: 'Item 2',
        href: '/foo',
    },
    {
        label: 'Item 3',
        href: '/bar',
    },
];

export const subMenuNav = [
    {
        label: 'Item 1',
        isExternal: false,
        subMenu: [
            {
                label: 'Sub Item 1',
                href: '/',
            },
            {
                label: 'Sub Item 2',
                href: '/foo',
            },
            {
                label: 'Sub Item 3',
                href: '/bar',
            },
        ],
    },
    {
        label: 'Item 2',
        href: '/baz',
    },
    {
        label: 'Item 3',
        href: '/biz',
    },
];

export const nestedSubMenuNav = [
    {
        label: 'Item 1',
        isExternal: false,
        subMenu: [
            {
                label: 'Sub Item 1',
                href: 'https://www.google.com',
                isExternal: true,
            },
            {
                label: 'Sub Item 2',
                href: '/',
                subMenu: [
                    {
                        label: 'Sub Item 1',
                        href: 'https://www.google.com',
                        isExternal: true,
                    },
                    {
                        label: 'Sub Item 2',
                        href: '/foo',
                    },
                    {
                        label: 'Sub Item 3',
                        href: '/bar',
                        subMenu: [
                            {
                                label: 'Sub Item 1',
                                href: 'https://www.google.com',
                                isExternal: true,
                            },
                            {
                                label: 'Sub Item 2',
                                href: '/foo',
                            },
                            {
                                label: 'Sub Item 3',
                                href: '/bar',
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Sub Item 3',
                href: '/biz',
            },
        ],
    },
    {
        label: 'Item 2',
        href: '/bar',
        subMenu: [
            {
                label: 'Sub Item 1',
                href: 'https://www.google.com',
            },
        ],
    },
    {
        label: 'Item 3',
        href: '/baz',
    },
];
