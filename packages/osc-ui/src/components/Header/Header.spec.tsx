import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { SpritesheetProvider } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import { Navbar, NavItem, NavLink, NavList } from '../Navbar/Navbar';
import { simpleNav } from '../Navbar/navContent';
import { Header, HeaderActionBar, HeaderNav } from './Header';

describe('header', () => {
    test('renders header component with logo', () => {
        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Header>
                        <Logo />
                    </Header>
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const header = screen.getByRole('banner');
        const logo = screen.getByRole('link', {
            name: 'Open Study College',
        });
        expect(header).toBeInTheDocument();
        expect(logo).toBeInTheDocument();
    });

    test('successfully adds custom class to header', () => {
        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Header className="test-class" />
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const header = screen.getByRole('banner');
        // eslint-disable-next-line jest-dom/prefer-to-have-class
        expect(header).toHaveClass('test-class');
    });

    test('adds a --header-height custom property to the style attribute', () => {
        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Header>
                        <Logo />
                    </Header>
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const header = screen.getByRole('banner');
        // Will be 0 as we aren't rendering a proper DOM
        expect(header).toHaveStyle('--header-height: 0px;');
    });
});

describe('headerNav', () => {
    test('renders headerNav component with a simple nav', () => {
        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Header>
                        <HeaderNav isOpen={false}>
                            <Navbar>
                                <NavList>
                                    {simpleNav.map((item, index) => (
                                        <NavItem key={index}>
                                            <NavLink href={item.href}>{item.label}</NavLink>
                                        </NavItem>
                                    ))}
                                </NavList>
                            </Navbar>
                        </HeaderNav>
                    </Header>
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const headerNav = document.querySelector('.c-header__nav');
        expect(headerNav).toBeInTheDocument();
        expect(headerNav).not.toHaveStyle('overflow-y: auto;');
    });

    test('locks the body when headerNav is open', () => {
        const { rerender } = render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Header>
                        <HeaderNav isOpen={true}>
                            <Navbar>
                                <NavList>
                                    {simpleNav.map((item, index) => (
                                        <NavItem key={index}>
                                            <NavLink href={item.href}>{item.label}</NavLink>
                                        </NavItem>
                                    ))}
                                </NavList>
                            </Navbar>
                        </HeaderNav>
                    </Header>
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const headerNav = document.querySelector('.c-header__nav');
        expect(headerNav).toBeInTheDocument();
        expect(headerNav).toHaveStyle('overflow-y: auto;');
        expect(document.body).toHaveStyle('overflow-y: hidden;');

        rerender(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Header>
                        <HeaderNav isOpen={false}>
                            <Navbar>
                                <NavList>
                                    {simpleNav.map((item, index) => (
                                        <NavItem key={index}>
                                            <NavLink href={item.href}>{item.label}</NavLink>
                                        </NavItem>
                                    ))}
                                </NavList>
                            </Navbar>
                        </HeaderNav>
                    </Header>
                </SpritesheetProvider>
            </MemoryRouter>
        );

        expect(headerNav).not.toHaveStyle('overflow-y: auto;');
        expect(document.body).toHaveStyle('overflow-y: auto;');
    });
});

describe('headerActionBar', () => {
    test('renders the headerAction Bar', () => {
        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Header>
                        <HeaderActionBar>
                            <a href="/">Test link</a>
                        </HeaderActionBar>
                    </Header>
                </SpritesheetProvider>
            </MemoryRouter>
        );

        expect(document.querySelector('.c-header__action-bar')).toBeInTheDocument();
    });
});
