import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Burger } from '../Burger/Burger';
import { Icon } from '../Icon/Icon';
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
import { Header, HeaderActionBar, HeaderNav, Logo } from './Header';

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

// TODO: Need to update all inlined SVGs with our Icon component once merged

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
                        {/* // TODO: Update this icon to use our Icons */}
                        <svg
                            width="15"
                            height="10"
                            viewBox="0 0 15 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            // Only show the icon if the level is > 0 or were not on a desktop
                            className={`c-nav__trigger-icon ${level === 0 && 'u-hidden-from@desk'}`}
                            aria-hidden
                        >
                            <path
                                d="M7.72284 5.42052L3.17348 0.885194L0.940918 3.12477L7.70178 9.86457L14.4977 3.11073L12.2652 0.878174L7.72284 5.42052Z"
                                fill="#062134"
                            />
                        </svg>
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
        <Logo />
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

            <Logo />

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

            <Logo />

            <HeaderActionBar>
                <button className="u-hidden-until@desk">
                    <Icon label="Search">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden
                        >
                            <path
                                d="M19.8576 18.6229L16.0817 14.847C17.3561 13.2964 18.1176 11.3118 18.1176 9.14572C18.1176 4.17827 14.0892 0.153809 9.1257 0.153809C4.1622 0.153809 0.133789 4.17827 0.133789 9.14572C0.133789 14.1132 4.1622 18.1376 9.1257 18.1376C11.2879 18.1376 13.2764 17.3722 14.827 16.1017L18.6029 19.8776L19.8576 18.6229ZM9.1257 16.3621C7.19633 16.3621 5.38532 15.6125 4.02016 14.2473C2.655 12.8822 1.90534 11.0711 1.90534 9.14177C1.90534 7.2124 2.655 5.40139 4.02016 4.03623C5.38532 2.67107 7.19633 1.92142 9.1257 1.92142C11.0551 1.92142 12.8661 2.67107 14.2312 4.03623C15.5964 5.40139 16.3461 7.2124 16.3461 9.14177C16.3461 11.0711 15.5964 12.8822 14.2312 14.2473C12.8661 15.6125 11.0551 16.3621 9.1257 16.3621Z"
                                fill="#062134"
                            />
                        </svg>
                    </Icon>
                </button>

                <a href="#" className="u-hidden-until@desk">
                    <Icon label="My account">
                        <svg
                            width="18"
                            height="19"
                            viewBox="0 0 18 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M17.1024 18.9011H15.3269V17.0349C15.3269 15.0818 13.7408 13.4957 11.7878 13.4957H6.25216C4.29911 13.4957 2.713 15.0818 2.713 17.0349V18.9011H0.9375V17.0349C0.9375 14.1033 3.32061 11.7202 6.25216 11.7202H11.7878C14.7193 11.7202 17.1024 14.1033 17.1024 17.0349V18.9011Z"
                                fill="#062134"
                            />
                            <path
                                d="M9.01844 2.69298C10.5177 2.69298 11.7409 3.91215 11.7409 5.41541C11.7409 6.91866 10.5217 8.13784 9.01844 8.13784C7.51518 8.13784 6.29601 6.91866 6.29601 5.41541C6.29601 3.91215 7.51913 2.69298 9.01844 2.69298ZM9.01844 0.91748C6.53668 0.91748 4.52051 2.92971 4.52051 5.41541C4.52051 7.89716 6.53274 9.91334 9.01844 9.91334C11.5002 9.91334 13.5164 7.90111 13.5164 5.41541C13.5164 2.92971 11.5041 0.91748 9.01844 0.91748Z"
                                fill="#062134"
                            />
                        </svg>
                    </Icon>
                </a>

                <a href="#" className="u-hidden-until@desk">
                    <Icon label="Wishlist">
                        <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18.2092 9.11036L10.0424 17.4743L1.89373 9.12889C-0.034889 7.15372 -0.034889 3.93712 1.89373 1.95824C3.81511 -0.00951818 6.93781 -0.00951818 8.85919 1.95824L10.0424 3.17003L11.2075 1.97677C13.1362 0.00159907 16.2806 0.00159907 18.2092 1.97677C20.1306 3.94453 20.1306 7.1426 18.2092 9.11036ZM10.0424 15.1174L17.0585 7.93193C18.3431 6.61639 18.3431 4.47445 17.0585 3.1552C15.7631 1.82854 13.6536 1.82854 12.3582 3.1552L10.0424 5.52689L7.70853 3.13667C6.42399 1.82113 4.33255 1.82113 3.04439 3.13667C1.74899 4.46334 1.74899 6.6238 3.04439 7.95046L10.0424 15.1174Z"
                                fill="#062134"
                            />
                        </svg>
                    </Icon>
                </a>

                <button>
                    <Icon label="Bag">
                        <svg
                            width="17"
                            height="20"
                            viewBox="0 0 17 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.5784 5.49994V3.68893C12.5784 1.71615 10.9726 0.114258 9.00375 0.114258H7.18485C5.21207 0.114258 3.61018 1.7201 3.61018 3.68893V5.49599H0V19.8854H16.1886V5.49994H12.5784ZM5.38173 3.68893C5.38173 2.69465 6.19057 1.88976 7.1809 1.88976H8.9998C9.99408 1.88976 10.799 2.69859 10.799 3.68893V5.49599H5.38173V3.68893ZM14.4092 18.1139H1.7755V7.27543H14.4131V18.1139H14.4092Z"
                                fill="#062134"
                            />
                        </svg>
                    </Icon>
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
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden
                        >
                            <g clip-path="url(#clip0_1479_14588)">
                                <path
                                    d="M19.9737 19.9387L19.061 19.9212C13.8043 19.8073 8.98644 17.8538 5.50245 14.4109C3.76485 12.7026 2.41338 10.6965 1.48315 8.42756C0.517811 6.0973 0.0263672 3.5743 0.0263672 0.9199V0.0175781H7.87191L10.1361 5.66804L8.37213 7.42888C9.3638 9.15468 10.8206 10.6089 12.5494 11.5988L14.3133 9.83799L19.9649 12.0982V19.9387H19.9737ZM1.84295 1.82222C1.93949 3.9072 2.37828 5.90457 3.14177 7.75301C3.98424 9.79419 5.20408 11.6076 6.75739 13.1494C9.71483 16.0666 13.7429 17.81 18.1747 18.0991V13.3159L14.7433 11.9492L12.8917 13.7977L12.3125 13.5086C11.0487 12.8778 9.90789 12.0544 8.91623 11.0644C7.92457 10.0745 7.09964 8.92691 6.46779 7.67417L6.17819 7.09598L8.02988 5.24754L6.66086 1.79594L1.84295 1.82222Z"
                                    fill="white"
                                />
                                <path
                                    d="M19.9736 7.2888H18.1834V7.28004C18.1834 4.27522 15.7349 1.83983 12.7336 1.83983H12.7249V0.0439453H12.7336C16.7178 0.0439453 19.9736 3.29405 19.9736 7.2888Z"
                                    fill="white"
                                />
                                <path
                                    d="M16.3405 7.2887H14.5502C14.5502 6.28125 13.7341 5.46654 12.7249 5.46654V3.67065C14.717 3.67065 16.3405 5.29133 16.3405 7.2887Z"
                                    fill="white"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1479_14588">
                                    <rect width="20" height="20" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        Get in touch
                    </a>

                    <a href="#">
                        <svg
                            width="18"
                            height="19"
                            viewBox="0 0 18 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden
                        >
                            <path
                                d="M17.1024 18.9011H15.3269V17.0349C15.3269 15.0818 13.7408 13.4957 11.7878 13.4957H6.25216C4.29911 13.4957 2.713 15.0818 2.713 17.0349V18.9011H0.9375V17.0349C0.9375 14.1033 3.32061 11.7202 6.25216 11.7202H11.7878C14.7193 11.7202 17.1024 14.1033 17.1024 17.0349V18.9011Z"
                                fill="currentColor"
                            />
                            <path
                                d="M9.01844 2.69298C10.5177 2.69298 11.7409 3.91215 11.7409 5.41541C11.7409 6.91866 10.5217 8.13784 9.01844 8.13784C7.51518 8.13784 6.29601 6.91866 6.29601 5.41541C6.29601 3.91215 7.51913 2.69298 9.01844 2.69298ZM9.01844 0.91748C6.53668 0.91748 4.52051 2.92971 4.52051 5.41541C4.52051 7.89716 6.53274 9.91334 9.01844 9.91334C11.5002 9.91334 13.5164 7.90111 13.5164 5.41541C13.5164 2.92971 11.5041 0.91748 9.01844 0.91748Z"
                                fill="currentColor"
                            />
                        </svg>
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

    <Logo />

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

    <Logo />

    <HeaderActionBar>
        <button className="u-hidden-until@desk">
            <Icon label="Search">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                >
                    <path
                        d="M19.8576 18.6229L16.0817 14.847C17.3561 13.2964 18.1176 11.3118 18.1176 9.14572C18.1176 4.17827 14.0892 0.153809 9.1257 0.153809C4.1622 0.153809 0.133789 4.17827 0.133789 9.14572C0.133789 14.1132 4.1622 18.1376 9.1257 18.1376C11.2879 18.1376 13.2764 17.3722 14.827 16.1017L18.6029 19.8776L19.8576 18.6229ZM9.1257 16.3621C7.19633 16.3621 5.38532 15.6125 4.02016 14.2473C2.655 12.8822 1.90534 11.0711 1.90534 9.14177C1.90534 7.2124 2.655 5.40139 4.02016 4.03623C5.38532 2.67107 7.19633 1.92142 9.1257 1.92142C11.0551 1.92142 12.8661 2.67107 14.2312 4.03623C15.5964 5.40139 16.3461 7.2124 16.3461 9.14177C16.3461 11.0711 15.5964 12.8822 14.2312 14.2473C12.8661 15.6125 11.0551 16.3621 9.1257 16.3621Z"
                        fill="#062134"
                    />
                </svg>
            </Icon>
        </button>

        <a href="#" className="u-hidden-until@desk">
            <Icon label="My account">
                <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M17.1024 18.9011H15.3269V17.0349C15.3269 15.0818 13.7408 13.4957 11.7878 13.4957H6.25216C4.29911 13.4957 2.713 15.0818 2.713 17.0349V18.9011H0.9375V17.0349C0.9375 14.1033 3.32061 11.7202 6.25216 11.7202H11.7878C14.7193 11.7202 17.1024 14.1033 17.1024 17.0349V18.9011Z"
                        fill="#062134"
                    />
                    <path
                        d="M9.01844 2.69298C10.5177 2.69298 11.7409 3.91215 11.7409 5.41541C11.7409 6.91866 10.5217 8.13784 9.01844 8.13784C7.51518 8.13784 6.29601 6.91866 6.29601 5.41541C6.29601 3.91215 7.51913 2.69298 9.01844 2.69298ZM9.01844 0.91748C6.53668 0.91748 4.52051 2.92971 4.52051 5.41541C4.52051 7.89716 6.53274 9.91334 9.01844 9.91334C11.5002 9.91334 13.5164 7.90111 13.5164 5.41541C13.5164 2.92971 11.5041 0.91748 9.01844 0.91748Z"
                        fill="#062134"
                    />
                </svg>
            </Icon>
        </a>

        <a href="#" className="u-hidden-until@desk">
            <Icon label="Wishlist">
                <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18.2092 9.11036L10.0424 17.4743L1.89373 9.12889C-0.034889 7.15372 -0.034889 3.93712 1.89373 1.95824C3.81511 -0.00951818 6.93781 -0.00951818 8.85919 1.95824L10.0424 3.17003L11.2075 1.97677C13.1362 0.00159907 16.2806 0.00159907 18.2092 1.97677C20.1306 3.94453 20.1306 7.1426 18.2092 9.11036ZM10.0424 15.1174L17.0585 7.93193C18.3431 6.61639 18.3431 4.47445 17.0585 3.1552C15.7631 1.82854 13.6536 1.82854 12.3582 3.1552L10.0424 5.52689L7.70853 3.13667C6.42399 1.82113 4.33255 1.82113 3.04439 3.13667C1.74899 4.46334 1.74899 6.6238 3.04439 7.95046L10.0424 15.1174Z"
                        fill="#062134"
                    />
                </svg>
            </Icon>
        </a>

        <button>
            <Icon label="Bag">
                <svg
                    width="17"
                    height="20"
                    viewBox="0 0 17 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12.5784 5.49994V3.68893C12.5784 1.71615 10.9726 0.114258 9.00375 0.114258H7.18485C5.21207 0.114258 3.61018 1.7201 3.61018 3.68893V5.49599H0V19.8854H16.1886V5.49994H12.5784ZM5.38173 3.68893C5.38173 2.69465 6.19057 1.88976 7.1809 1.88976H8.9998C9.99408 1.88976 10.799 2.69859 10.799 3.68893V5.49599H5.38173V3.68893ZM14.4092 18.1139H1.7755V7.27543H14.4131V18.1139H14.4092Z"
                        fill="#062134"
                    />
                </svg>
            </Icon>
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
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                >
                    <g clip-path="url(#clip0_1479_14588)">
                        <path
                            d="M19.9737 19.9387L19.061 19.9212C13.8043 19.8073 8.98644 17.8538 5.50245 14.4109C3.76485 12.7026 2.41338 10.6965 1.48315 8.42756C0.517811 6.0973 0.0263672 3.5743 0.0263672 0.9199V0.0175781H7.87191L10.1361 5.66804L8.37213 7.42888C9.3638 9.15468 10.8206 10.6089 12.5494 11.5988L14.3133 9.83799L19.9649 12.0982V19.9387H19.9737ZM1.84295 1.82222C1.93949 3.9072 2.37828 5.90457 3.14177 7.75301C3.98424 9.79419 5.20408 11.6076 6.75739 13.1494C9.71483 16.0666 13.7429 17.81 18.1747 18.0991V13.3159L14.7433 11.9492L12.8917 13.7977L12.3125 13.5086C11.0487 12.8778 9.90789 12.0544 8.91623 11.0644C7.92457 10.0745 7.09964 8.92691 6.46779 7.67417L6.17819 7.09598L8.02988 5.24754L6.66086 1.79594L1.84295 1.82222Z"
                            fill="white"
                        />
                        <path
                            d="M19.9736 7.2888H18.1834V7.28004C18.1834 4.27522 15.7349 1.83983 12.7336 1.83983H12.7249V0.0439453H12.7336C16.7178 0.0439453 19.9736 3.29405 19.9736 7.2888Z"
                            fill="white"
                        />
                        <path
                            d="M16.3405 7.2887H14.5502C14.5502 6.28125 13.7341 5.46654 12.7249 5.46654V3.67065C14.717 3.67065 16.3405 5.29133 16.3405 7.2887Z"
                            fill="white"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1479_14588">
                            <rect width="20" height="20" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                Get in touch
            </a>

            <a href="#">
                <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                >
                    <path
                        d="M17.1024 18.9011H15.3269V17.0349C15.3269 15.0818 13.7408 13.4957 11.7878 13.4957H6.25216C4.29911 13.4957 2.713 15.0818 2.713 17.0349V18.9011H0.9375V17.0349C0.9375 14.1033 3.32061 11.7202 6.25216 11.7202H11.7878C14.7193 11.7202 17.1024 14.1033 17.1024 17.0349V18.9011Z"
                        fill="currentColor"
                    />
                    <path
                        d="M9.01844 2.69298C10.5177 2.69298 11.7409 3.91215 11.7409 5.41541C11.7409 6.91866 10.5217 8.13784 9.01844 8.13784C7.51518 8.13784 6.29601 6.91866 6.29601 5.41541C6.29601 3.91215 7.51913 2.69298 9.01844 2.69298ZM9.01844 0.91748C6.53668 0.91748 4.52051 2.92971 4.52051 5.41541C4.52051 7.89716 6.53274 9.91334 9.01844 9.91334C11.5002 9.91334 13.5164 7.90111 13.5164 5.41541C13.5164 2.92971 11.5041 0.91748 9.01844 0.91748Z"
                        fill="currentColor"
                    />
                </svg>
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
