import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Burger } from '../Burger/Burger';
import { AccessibleIcon, Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import {
    Navbar,
    NavContent,
    NavItem,
    NavLink,
    NavList,
    NavSubMenu,
    NavTrigger,
} from '../Navbar/Navbar';
import { nestedSubMenuNav } from '../Navbar/navContent';
import type { HeaderProps } from './Header';
import { Header, HeaderActionBar, HeaderNav } from './Header';

export default {
    title: 'osc-ui/Header',
    component: Header,
    subcomponents: { HeaderActionBar, HeaderNav },
    parameters: {
        docs: {
            description: {
                component:
                    'The Header component is used to display a header on the top of the page and will always contain the OSC logo.',
            },
        },
    },
} as Meta;

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
                                    <Icon id="chevron-right" />
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
                                level={level}
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
                    <NavTrigger>
                        {item.label}
                        <Icon
                            id="chevron-down"
                            className={`c-nav__trigger-icon ${level === 0 && 'u-hidden-from@desk'}`} // Only show the icon if the level is > 0 or were not on a desktop
                            aria-hidden
                        />
                    </NavTrigger>
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

const Template: Story<HeaderProps> = (args) => (
    <Header {...args}>
        <Logo className="c-header__logo" />
    </Header>
);

const HasNavTemplate: Story<HeaderProps> = (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Header {...args}>
            <Burger
                id="mob-menu-trigger"
                label="Open mobile menu"
                isOpen={isOpen}
                aria-expanded={isOpen}
                aria-controls="header-nav"
                className="u-hidden-from@desk"
                onClick={() => setIsOpen(!isOpen)}
            />

            <Logo className="c-header__logo" />

            <HeaderNav
                id="header-nav"
                aria-labelledby="mob-menu-trigger"
                data-state={isOpen ? 'open' : 'closed'}
                isOpen={isOpen}
            >
                <Navbar>
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
            </HeaderNav>
        </Header>
    );
};

const HasActionBarTemplate: Story<HeaderProps> = (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Header {...args}>
            <Burger
                id="mob-menu-trigger"
                label="Open mobile menu"
                isOpen={isOpen}
                aria-expanded={isOpen}
                aria-controls="header-nav"
                className="u-hidden-from@desk"
                onClick={() => setIsOpen(!isOpen)}
            />

            <Logo className="c-header__logo" />

            <HeaderActionBar>
                <button className="u-hidden-until@desk">
                    <AccessibleIcon label="Search">
                        <Icon id="search" />
                    </AccessibleIcon>
                </button>

                <a href="/" className="u-hidden-until@desk">
                    <AccessibleIcon label="My account">
                        <Icon id="user" />
                    </AccessibleIcon>
                </a>

                <a href="/" className="u-hidden-until@desk">
                    <AccessibleIcon label="Wishlist">
                        <Icon id="heart" />
                    </AccessibleIcon>
                </a>

                <button>
                    <AccessibleIcon label="Bag">
                        <Icon id="bag" />
                    </AccessibleIcon>
                </button>
            </HeaderActionBar>

            <HeaderNav
                id="header-nav"
                aria-labelledby="mob-menu-trigger"
                data-state={isOpen ? 'open' : 'closed'}
                isOpen={isOpen}
            >
                <HeaderActionBar className="u-hidden-from@desk">
                    <a href="/">
                        <Icon id="phone" />
                        Get in touch
                    </a>

                    <a href="/">
                        <Icon id="user" />
                        My account
                    </a>
                </HeaderActionBar>

                <Navbar>
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
            </HeaderNav>
        </Header>
    );
};

export const Primary = Template.bind({});
Primary.args = {};

export const HasNavigation = HasNavTemplate.bind({});
HasNavigation.args = {
    ...Primary.args,
};
HasNavigation.parameters = {
    docs: {
        description: {
            story: 'You can pass a `Navbar` component wrapped in `HeaderNav` to add navigation to you `Header` <br>Consider adding a a conditional `<Burger />` component so you can access the navigation on smaller screens.',
        },
        source: {
            code: `
<Header>
    <Burger
        id="mob-menu-trigger"
        label="Open mobile menu"
        isOpen={isOpen}
        aria-expanded={isOpen}
        aria-controls="header-nav"
        className="u-hidden-from@desk"
        onClick={() => setIsOpen(!isOpen)}
    />

    <Logo className="c-header__logo" />

    <HeaderNav
        id="header-nav"
        aria-labelledby="mob-menu-trigger"
        data-state={isOpen ? 'open' : 'closed'}
        isOpen={isOpen}
    >
        <Navbar>
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
    </HeaderNav>
</Header>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const HasActionBar = HasActionBarTemplate.bind({});
HasActionBar.args = {
    ...Primary.args,
};
HasActionBar.parameters = {
    docs: {
        description: {
            story: "The action bar is a type of secondary navbar that includes buttons and links.<br>It's recommended to hide all but one element that you don't want access to on mobile using something like the `u-hidden-until@desk` utility class as they won't all fit on smaller screens.<br>You can also use this component within the `HeaderNav` component to add a secondary nav to your mobile navbar.",
        },
        source: {
            code: `
<Header>
    <Burger
        id="mob-menu-trigger"
        label="Open mobile menu"
        isOpen={isOpen}
        aria-expanded={isOpen}
        aria-controls="header-nav"
        className="u-hidden-from@desk"
        onClick={() => setIsOpen(!isOpen)}
    />

    <Logo className="c-header__logo" />

    <HeaderActionBar>
        <button className="u-hidden-until@desk">
            <AccessibleIcon label="Search">
                <Icon id="search" />
            </AccessibleIcon>
        </button>

        <a href="#" className="u-hidden-until@desk">
            <AccessibleIcon label="My account">
                <Icon id="user" />
            </AccessibleIcon>
        </a>

        <a href="#" className="u-hidden-until@desk">
            <AccessibleIcon label="Wishlist">
                <Icon id="heart" />
            </AccessibleIcon>
        </a>

        <button>
            <AccessibleIcon label="Bag">
                <Icon id="bag" />
            </AccessibleIcon>
        </button>
    </HeaderActionBar>

    <HeaderNav
        id="header-nav"
        aria-labelledby="mob-menu-trigger"
        data-state={isOpen ? 'open' : 'closed'}
        isOpen={isOpen}
    >
        <HeaderActionBar className="u-hidden-from@desk">
            <a href="#">
                <Icon id="phone" />
                Get in touch
            </a>

            <a href="#">
                <Icon id="user" />
                My account
            </a>
        </HeaderActionBar>

        <Navbar>
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
    </HeaderNav>
</Header>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
