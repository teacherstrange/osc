import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Icon, SpritesheetProvider } from '../Icon/Icon';
import { List, ListItem } from '../List/List';
import { Logo } from '../Logo/Logo';
import {
    Footer,
    FooterBottom,
    FooterGroup,
    FooterMenu,
    FooterMenuContent,
    FooterMenuHeader,
    FooterMenuItem,
} from './Footer';
import { footerMenuItems } from './footerContent';

test('renders the footer component', () => {
    render(
        <MemoryRouter>
            <SpritesheetProvider>
                <Footer>
                    <FooterGroup direction="column">
                        <Logo className="c-footer__logo" />

                        <div>
                            <p>
                                Call:{' '}
                                <a href="tel:+443308222729" className="u-text-bold">
                                    0330 822 2729
                                </a>
                            </p>
                            <p>
                                Email:{' '}
                                <a href="mailto:info@openstudycollege.com" className="u-text-bold">
                                    info@openstudycollege.com
                                </a>
                            </p>
                        </div>

                        <FooterGroup>
                            <Icon id="facebook" className="c-footer__icon" />
                            <Icon id="instagram" className="c-footer__icon" />
                            <Icon id="twitter" className="c-footer__icon" />
                            <Icon id="linkedin" className="c-footer__icon" />
                            <Icon id="tiktok" className="c-footer__icon" />
                            <Icon id="pinterest" className="c-footer__icon" />
                        </FooterGroup>
                    </FooterGroup>

                    <FooterGroup>
                        <FooterMenu>
                            {footerMenuItems.map((item, index) => {
                                return (
                                    <FooterMenuItem key={index}>
                                        <FooterMenuHeader>{item.heading}</FooterMenuHeader>
                                        <FooterMenuContent>
                                            <List className="is-bare">
                                                {item.items.map((subItem, subIndex) => {
                                                    return (
                                                        <ListItem key={subIndex}>
                                                            <a href="/">{subItem}</a>
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>
                                        </FooterMenuContent>
                                    </FooterMenuItem>
                                );
                            })}
                        </FooterMenu>
                    </FooterGroup>

                    <FooterBottom>
                        <a href="/">Terms</a>
                        <a href="/">Privacy Policy</a>
                    </FooterBottom>
                </Footer>
            </SpritesheetProvider>
        </MemoryRouter>
    );

    const footer = screen.getByRole('contentinfo');
    const logo = screen.getByRole('link', { name: 'Open Study College' });
    const phone = screen.getByRole('link', { name: '0330 822 2729' });
    const email = screen.getByRole('link', { name: 'info@openstudycollege.com' });
    const socialIcons = document.querySelectorAll('.c-footer__icon');
    const itemLinks = document.querySelectorAll('.c-footer__menu-content a');

    expect(footer).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(socialIcons).toHaveLength(6);
    expect(itemLinks).toHaveLength(22);
});

test('FooterBottom renders the correct date', () => {
    const year = new Date().getFullYear();

    render(<FooterBottom />);

    expect(screen.getByText(`© Open Study College ${year}`)).toBeInTheDocument();
});

test('renders FooterMenu components as accordions', () => {
    // Mock resizeObserver
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    }));

    render(
        <FooterMenu isAccordion collapsible defaultValue="0" type="single">
            <FooterMenuItem isAccordion value="0">
                <FooterMenuHeader isAccordion>Accordion item</FooterMenuHeader>
                <FooterMenuContent isAccordion>
                    <List className="is-bare">
                        <ListItem>
                            <a href="/">Accordion link</a>
                        </ListItem>
                    </List>
                </FooterMenuContent>
            </FooterMenuItem>
        </FooterMenu>
    );

    const menu = document.querySelector('.c-footer__menu');
    const menuItem = document.querySelector('.c-footer__menu-item');
    const menuHeader = document.querySelector('.c-footer__menu-header');
    const menuContent = document.querySelector('.c-footer__menu-content');
    const triggers = screen.getByRole('button');

    expect(menu).toHaveClass('c-accordion');
    expect(menuItem).toHaveClass('c-accordion__item');
    expect(document.querySelector('.c-accordion__header')).toBeInTheDocument();
    expect(document.querySelector('.c-accordion__content')).toBeInTheDocument();
    expect(menuHeader).toBeInTheDocument();
    expect(menuContent).toBeInTheDocument();
    expect(triggers).toHaveAttribute('aria-expanded', 'true');
});
