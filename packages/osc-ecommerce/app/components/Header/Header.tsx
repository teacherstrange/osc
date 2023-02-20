import { Link } from '@remix-run/react';
import { AccessibleIcon, Burger, Header, HeaderActionBar, HeaderNav, Icon, Logo } from 'osc-ui';
import { useEffect, useState } from 'react';
import type { SanityNavSettings } from '~/types/sanity';
import { Nav } from '../Nav';

interface SiteHeaderProps {
    navSettings: SanityNavSettings;
}

export const SiteHeader = (props: SiteHeaderProps) => {
    const { navSettings } = props;
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    useEffect(() => {
        // Make sure the mobile menu get's closed when we click on a link
        const navLinks = document.querySelectorAll('.c-nav__link');

        const handleClick = () => setMenuIsOpen(false);

        navLinks.forEach((link) => {
            link.addEventListener('click', handleClick);
        });

        return () => {
            navLinks.forEach((link) => {
                link.removeEventListener('click', handleClick);
            });
        };
    }, [menuIsOpen]);

    return (
        <Header>
            <Burger
                id="mob-menu-trigger"
                label="Open mobile menu"
                isOpen={menuIsOpen}
                aria-expanded={menuIsOpen}
                aria-controls="header-nav"
                className="u-hidden-from@desk"
                onClick={() => setMenuIsOpen(!menuIsOpen)}
            />

            <Logo className="c-header__logo" />

            <HeaderActionBar>
                <button className="u-hidden-until@desk">
                    <AccessibleIcon label="Search">
                        <Icon id="search" />
                    </AccessibleIcon>
                </button>

                <Link to="/" className="u-hidden-until@desk">
                    <AccessibleIcon label="My account">
                        <Icon id="user" />
                    </AccessibleIcon>
                </Link>

                <Link to="/" className="u-hidden-until@desk">
                    <AccessibleIcon label="Wishlist">
                        <Icon id="heart" />
                    </AccessibleIcon>
                </Link>

                <button>
                    <AccessibleIcon label="Bag">
                        <Icon id="bag" />
                    </AccessibleIcon>
                </button>
            </HeaderActionBar>

            {navSettings ? (
                <HeaderNav
                    id="header-nav"
                    aria-labelledby="mob-menu-trigger"
                    data-state={menuIsOpen ? 'open' : 'closed'}
                    isOpen={menuIsOpen}
                >
                    <Nav navItems={navSettings?.navigationItem} />
                </HeaderNav>
            ) : null}
        </Header>
    );
};
