import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { NavProps } from './Navbar';
import { Navbar, NavContent, NavItem, NavLink, NavList, NavSubMenu, NavTrigger } from './Navbar';
import { nestedSubMenuNav, simpleNav, subMenuNav } from './navContent';

export default {
    title: 'osc-ui/Navbar',
    component: Navbar,
    parameters: {
        docs: {
            description: {
                component: 'The `Navbar` holds the navigation links for the site.',
            },
        },
    },
    argTypes: {
        orientation: {
            control: {
                type: 'select',
                options: ['horizontal', 'vertical'],
            },
        },
    },
} as Meta;

const Template: Story<NavProps> = ({ ...args }) => (
    <Navbar {...args}>
        <NavList>
            {simpleNav.map((item, index) => (
                <NavItem key={index}>
                    <NavLink href={item.href}>{item.label}</NavLink>
                </NavItem>
            ))}
        </NavList>
    </Navbar>
);

const SubMenuTemplate: Story<NavProps> = ({ ...args }) => (
    <Navbar {...args}>
        <NavList>
            {subMenuNav.map((item, index) => (
                <NavItem key={index}>
                    {item.subMenu ? (
                        <NavSubMenu level={0} label={item.label}>
                            <NavTrigger>{item.label}</NavTrigger>
                            <NavContent level={0}>
                                <NavList>
                                    {item.subMenu.map((subItem, subIndex) => (
                                        <NavItem key={subIndex}>
                                            <NavLink href={subItem.href}>{subItem.label}</NavLink>
                                        </NavItem>
                                    ))}
                                </NavList>
                            </NavContent>
                        </NavSubMenu>
                    ) : (
                        <NavLink href={item?.href} isExternal={item?.isExternal}>
                            {item.label}
                        </NavLink>
                    )}
                </NavItem>
            ))}
        </NavList>
    </Navbar>
);

const NestedSubMenuTemplate: Story<NavProps> = ({ ...args }) => {
    type Item = {
        label: string;
        href?: string;
        isExternal?: boolean;
        featured?: Item[];
        subMenu?: Item[];
        column?: Item[];
    };
    const RecursiveNavItemWrapper = (props: { item: Item; level: number; value: string }) => {
        const { item, level } = props;

        if (item.featured) {
            return (
                <NavItem className="c-nav__item--feature">
                    <NavList>
                        {item.featured.map((item, index) => {
                            return (
                                <NavItem key={index}>
                                    <NavLink href={item.href} isExternal={item.isExternal}>
                                        {item.label}
                                    </NavLink>
                                </NavItem>
                            );
                        })}
                    </NavList>
                </NavItem>
            );
        }

        if (item.column) {
            return (
                <NavItem className="c-nav__item--column">
                    <NavList>
                        {item.column.map((subItem, subIndex) => {
                            return (
                                <RecursiveNavItemWrapper
                                    key={subIndex}
                                    item={subItem}
                                    level={level + 1}
                                    value={subItem?.label.toLocaleLowerCase()}
                                />
                            );
                        })}
                    </NavList>
                </NavItem>
            );
        }

        return (
            <NavItem>
                {item.subMenu ? (
                    <NavSubMenu level={level} label={item.label}>
                        <NavTrigger>{item.label}</NavTrigger>
                        <NavContent level={level}>
                            <NavList>
                                {item.subMenu.map((subItem, subIndex) => {
                                    return (
                                        <RecursiveNavItemWrapper
                                            key={subIndex}
                                            item={subItem}
                                            level={level + 1}
                                            value={subItem?.label.toLocaleLowerCase()}
                                        />
                                    );
                                })}
                            </NavList>
                        </NavContent>
                    </NavSubMenu>
                ) : (
                    <NavLink href={item?.href} isExternal={item?.isExternal}>
                        {item.label}
                    </NavLink>
                )}
            </NavItem>
        );
    };

    return (
        <Navbar {...args}>
            <NavList>
                {nestedSubMenuNav.map((item, index) => (
                    <RecursiveNavItemWrapper
                        key={index}
                        item={item}
                        level={0}
                        value={item?.label.toLocaleLowerCase()}
                    />
                ))}
            </NavList>
        </Navbar>
    );
};

export const Primary = Template.bind({});
Primary.args = {};

export const HasSubMenu = SubMenuTemplate.bind({});
HasSubMenu.args = {
    ...Primary.args,
};
HasSubMenu.parameters = {
    docs: {
        description: {
            story: 'A `Navbar` can have submenus which can be toggled by clicking on the parent menu item.',
        },
    },
};

export const HasNestedSubMenu = NestedSubMenuTemplate.bind({});
HasNestedSubMenu.args = {
    ...Primary.args,
};
HasNestedSubMenu.parameters = {
    docs: {
        description: {
            story: "We can also nest submenus within submenus, each submenu can then be toggled by clicking on it's parent menu item.<br>In this example we're using a custom wrapper around our `NavItem` component to recursively render the submenus.",
        },
        source: {
            code: `
// Recursively loop through the subMenu array and render the submenus
const RecursiveNavItemWrapper = (props: { item: Item; level: number; value: string }) => {
    const { item, level } = props;

    return (
        <NavItem>
            {item.subMenu ? (
                <NavSubMenu level={level}>
                    <NavTrigger>{item.label}</NavTrigger>
                    <NavContent level={level}>
                        <NavList>
                            {item.subMenu.map((subItem, subIndex) => (
                                <RecursiveNavItemWrapper
                                    key={subIndex}
                                    item={subItem}
                                    level={level + 1}
                                    value={subItem.label.toLocaleLowerCase()}
                                />
                            ))}
                        </NavList>
                    </NavContent>
                </NavSubMenu>
            ) : (
                <NavLink href={item?.href} isExternal={item?.isExternal}>
                    {item.label}
                </NavLink>
            )}
        </NavItem>
    );
};

// Usage:
<Nav>
    <NavList>
        {nestedSubMenuNav.map((item, index) => (
            <RecursiveNavItemWrapper key={index} item={item} />
        ))}
    </NavList>
</Nav>`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
