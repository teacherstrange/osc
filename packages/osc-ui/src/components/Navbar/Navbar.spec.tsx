import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar, NavContent, NavItem, NavLink, NavList, NavSubMenu, NavTrigger } from './Navbar';
import { nestedSubMenuNav, simpleNav, subMenuNav } from './navContent';

beforeEach(() => {
    // Mock resizeObserver
    // Needed as we're using Radix's NavigationMenu.Viewport component to place the submenu items
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    }));
});

test('renders a single level Nav', () => {
    render(
        <MemoryRouter>
            <Navbar>
                <NavList>
                    {simpleNav.map((item, index) => (
                        <NavItem key={index}>
                            <NavLink href={item.href}>{item.label}</NavLink>
                        </NavItem>
                    ))}
                </NavList>
            </Navbar>
        </MemoryRouter>
    );

    const nav = screen.getByRole('navigation');
    const navList = screen.getByRole('list');
    const navItems = screen.getAllByRole('listitem');

    expect(nav).toBeInTheDocument();
    expect(navList).toBeInTheDocument();
    expect(navItems).toHaveLength(3);
});

test('renders a nav with a submenu', async () => {
    render(
        <MemoryRouter>
            <Navbar>
                <NavList>
                    {subMenuNav.map((item, index) => (
                        <NavItem key={index}>
                            {item.subMenu ? (
                                <NavSubMenu level={0}>
                                    <NavTrigger>{item.label}</NavTrigger>
                                    <NavContent level={0}>
                                        <NavList>
                                            {item.subMenu.map((subItem, subIndex) => (
                                                <NavItem key={subIndex}>
                                                    <NavLink href={subItem.href}>
                                                        {subItem.label}
                                                    </NavLink>
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
        </MemoryRouter>
    );

    // Setup our user
    const user = userEvent.setup();

    const navTrigger = screen.getByRole('button');

    expect(screen.getAllByRole('listitem')).toHaveLength(6);

    expect(navTrigger).toBeInTheDocument();
    expect(navTrigger).toHaveAttribute('aria-expanded', 'false');
    expect(navTrigger).toHaveAttribute('data-state', 'closed');

    await user.click(navTrigger);

    expect(navTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(navTrigger).toHaveAttribute('data-state', 'open');
});

describe('Nested sub menus', () => {
    type Item = {
        label: string;
        href?: string;
        isExternal?: boolean;
        subMenu?: Item[];
    };
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
                                        value={subItem.label}
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

    test('renders a nav with a nested submenu', async () => {
        render(
            <MemoryRouter>
                <Navbar>
                    <NavList>
                        {nestedSubMenuNav.map((item, index) => (
                            <RecursiveNavItemWrapper
                                key={index}
                                item={item}
                                level={0}
                                value={item.label}
                            />
                        ))}
                    </NavList>
                </Navbar>
            </MemoryRouter>
        );

        // Setup our user
        const user = userEvent.setup();

        expect(screen.getAllByRole('listitem')).toHaveLength(13);

        const navTrigger = screen.getByRole('button', { name: 'Item 1' });

        expect(navTrigger).toBeInTheDocument();
        expect(navTrigger).toHaveAttribute('aria-expanded', 'false');
        expect(navTrigger).toHaveAttribute('data-state', 'closed');

        await user.click(navTrigger);

        expect(navTrigger).toHaveAttribute('aria-expanded', 'true');
        expect(navTrigger).toHaveAttribute('data-state', 'open');

        const nestedNavTrigger = screen.getByRole('button', { name: 'Sub Item 2' });
        expect(nestedNavTrigger).toHaveAttribute('aria-expanded', 'false');
        expect(nestedNavTrigger).toHaveAttribute('data-state', 'closed');

        await user.click(nestedNavTrigger);
        expect(nestedNavTrigger).toHaveAttribute('aria-expanded', 'true');
        expect(nestedNavTrigger).toHaveAttribute('data-state', 'open');
    });

    test("Sets the correct level to the subnav and it's children", async () => {
        render(
            <MemoryRouter>
                <Navbar>
                    <NavList>
                        {nestedSubMenuNav.map((item, index) => (
                            <RecursiveNavItemWrapper
                                key={index}
                                item={item}
                                level={0}
                                value={item.label}
                            />
                        ))}
                    </NavList>
                </Navbar>
            </MemoryRouter>
        );

        const subMenu = document.querySelector('.c-nav__submenu');
        const content = document.querySelector('.c-nav__content');
        expect(subMenu).toHaveAttribute('data-level', '0');
        expect(content).toHaveAttribute('data-level', '0');
    });

    test('clicking outside the nav closes the submenus', async () => {
        render(
            <MemoryRouter>
                <Navbar>
                    <NavList>
                        {nestedSubMenuNav.map((item, index) => (
                            <RecursiveNavItemWrapper
                                key={index}
                                item={item}
                                level={0}
                                value={item.label}
                            />
                        ))}
                    </NavList>
                </Navbar>
            </MemoryRouter>
        );

        // Setup our user
        const user = userEvent.setup();

        const navTrigger = screen.getByRole('button', { name: 'Item 1' });

        expect(navTrigger).toHaveAttribute('aria-expanded', 'false');
        expect(navTrigger).toHaveAttribute('data-state', 'closed');

        await user.click(navTrigger);

        expect(navTrigger).toHaveAttribute('aria-expanded', 'true');
        expect(navTrigger).toHaveAttribute('data-state', 'open');

        await user.click(document.body);
        expect(navTrigger).toHaveAttribute('aria-expanded', 'false');
        expect(navTrigger).toHaveAttribute('data-state', 'closed');
    });

    test('clicking escape with the keyboard closes the submenus', async () => {
        render(
            <MemoryRouter>
                <Navbar>
                    <NavList>
                        {nestedSubMenuNav.map((item, index) => (
                            <RecursiveNavItemWrapper
                                key={index}
                                item={item}
                                level={0}
                                value={item.label}
                            />
                        ))}
                    </NavList>
                </Navbar>
            </MemoryRouter>
        );

        // Setup our user
        const user = userEvent.setup();

        const navTrigger = screen.getByRole('button', { name: 'Item 1' });

        expect(navTrigger).toHaveAttribute('aria-expanded', 'false');
        expect(navTrigger).toHaveAttribute('data-state', 'closed');

        await user.click(navTrigger);

        expect(navTrigger).toHaveAttribute('aria-expanded', 'true');
        expect(navTrigger).toHaveAttribute('data-state', 'open');

        await user.keyboard('{Escape}');

        expect(navTrigger).toHaveAttribute('aria-expanded', 'false');
        expect(navTrigger).toHaveAttribute('data-state', 'closed');
    });
});
