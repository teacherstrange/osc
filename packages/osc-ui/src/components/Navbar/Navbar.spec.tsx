import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { SpritesheetProvider } from '../Icon/Icon';
import { Navbar, NavContent, NavItem, NavLink, NavList, NavSubMenu, NavTrigger } from './Navbar';
import { nestedSubMenuNav, simpleNav, subMenuNav, testNestedSubMenuNav } from './navContent';

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
            <SpritesheetProvider>
                <Navbar>
                    <NavList>
                        {simpleNav.map((item, index) => (
                            <NavItem key={index}>
                                <NavLink href={item.href}>{item.label}</NavLink>
                            </NavItem>
                        ))}
                    </NavList>
                </Navbar>
            </SpritesheetProvider>
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
            <SpritesheetProvider>
                <Navbar>
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
            </SpritesheetProvider>
        </MemoryRouter>
    );

    // Setup our user
    const user = userEvent.setup();

    const navTrigger = screen.getByRole('button', { name: 'Courses' });

    expect(screen.getAllByRole('listitem')).toHaveLength(7);

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

    test('renders a nav with a nested submenu', async () => {
        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Navbar>
                        <NavList>
                            {testNestedSubMenuNav.map((item, index) => (
                                <RecursiveNavItemWrapper
                                    key={index}
                                    item={item}
                                    level={0}
                                    value={item.label}
                                />
                            ))}
                        </NavList>
                    </Navbar>
                </SpritesheetProvider>
            </MemoryRouter>
        );

        // Setup our user
        const user = userEvent.setup();

        expect(screen.getAllByRole('listitem')).toHaveLength(16);

        const navTrigger = screen.getByRole('button', { name: 'Courses' });

        expect(navTrigger).toBeInTheDocument();
        expect(navTrigger).toHaveAttribute('aria-expanded', 'false');
        expect(navTrigger).toHaveAttribute('data-state', 'closed');

        await user.click(navTrigger);

        expect(navTrigger).toHaveAttribute('aria-expanded', 'true');
        expect(navTrigger).toHaveAttribute('data-state', 'open');

        const nestedNavTrigger = screen.getByRole('button', { name: 'Childcare & education' });
        expect(nestedNavTrigger).toHaveAttribute('aria-expanded', 'false');
        expect(nestedNavTrigger).toHaveAttribute('data-state', 'closed');

        await user.click(nestedNavTrigger);
        expect(nestedNavTrigger).toHaveAttribute('aria-expanded', 'true');
        expect(nestedNavTrigger).toHaveAttribute('data-state', 'open');
    });

    test("Sets the correct level to the subnav and it's children", async () => {
        render(
            <MemoryRouter>
                <SpritesheetProvider>
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
                </SpritesheetProvider>
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
                <SpritesheetProvider>
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
                </SpritesheetProvider>
            </MemoryRouter>
        );

        // Setup our user
        const user = userEvent.setup();

        const navTrigger = screen.getByRole('button', { name: 'Courses' });

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
                <SpritesheetProvider>
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
                </SpritesheetProvider>
            </MemoryRouter>
        );

        // Setup our user
        const user = userEvent.setup();

        const navTrigger = screen.getByRole('button', { name: 'Courses' });

        expect(navTrigger).toHaveAttribute('aria-expanded', 'false');
        expect(navTrigger).toHaveAttribute('data-state', 'closed');

        await user.click(navTrigger);

        expect(navTrigger).toHaveAttribute('aria-expanded', 'true');
        expect(navTrigger).toHaveAttribute('data-state', 'open');

        await user.keyboard('{Escape}');

        expect(navTrigger).toHaveAttribute('aria-expanded', 'false');
        expect(navTrigger).toHaveAttribute('data-state', 'closed');
    });

    test('opening a submenu sets the correct tabindex', async () => {
        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Navbar>
                        <NavList>
                            {testNestedSubMenuNav.map((item, index) => (
                                <RecursiveNavItemWrapper
                                    key={index}
                                    item={item}
                                    level={0}
                                    value={item.label}
                                />
                            ))}
                        </NavList>
                    </Navbar>
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const navTrigger = screen.getByRole('button', { name: 'Courses' });
        const nestedNavTrigger = screen.getByRole('button', { name: 'Childcare & education' });
        // Top level items should have a tabindex of 0
        expect(navTrigger).toHaveAttribute('tabindex', '0');
        expect(screen.getByRole('link', { name: 'How it works' })).toHaveAttribute('tabindex', '0');
        expect(screen.getByRole('link', { name: 'Special offers' })).toHaveAttribute(
            'tabindex',
            '0'
        );

        for (const item of screen.getAllByRole('link', { name: 'Sub category' })) {
            expect(item).toHaveAttribute('tabindex', '-1');
        }

        const user = userEvent.setup();

        // Click on one of the nested items
        await user.click(nestedNavTrigger);

        for (const item of screen.getAllByRole('link', { name: 'Sub category' })) {
            expect(item).toHaveAttribute('tabindex', '0');
        }
    });
});
