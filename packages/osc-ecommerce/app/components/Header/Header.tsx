import { Link } from '@remix-run/react';
import { AccessibleIcon, Burger, Header, HeaderActionBar, HeaderNav, Icon, Logo } from 'osc-ui';
import { useEffect, useState } from 'react';
import type { SanityActionNavSettings, SanityNavSettings } from '~/types/sanity';
import { Nav } from '../Nav';

interface SiteHeaderProps {
    navSettings: SanityNavSettings;
    actionNav?: SanityActionNavSettings;
}

export const SiteHeader = (props: SiteHeaderProps) => {
    const { navSettings, actionNav } = props;
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
                {actionNav?.search?.icon ? (
                    <button className="u-hidden-until@desk">
                        <AccessibleIcon label={actionNav?.search?.label}>
                            <Icon id={actionNav?.search?.icon} />
                        </AccessibleIcon>
                    </button>
                ) : null}

                {actionNav?.account?.icon && actionNav?.account?.link?.slug ? (
                    <Link to={actionNav?.account?.link?.slug} className="u-hidden-until@desk">
                        <AccessibleIcon label={actionNav?.account?.label}>
                            <Icon id={actionNav?.account?.icon} />
                        </AccessibleIcon>
                    </Link>
                ) : null}

                {actionNav?.wishlist?.icon && actionNav?.account?.link?.slug ? (
                    <Link to={actionNav?.wishlist?.link?.slug} className="u-hidden-until@desk">
                        <AccessibleIcon label={actionNav?.wishlist?.label}>
                            <Icon id={actionNav?.wishlist?.icon} />
                        </AccessibleIcon>
                    </Link>
                ) : null}

                {actionNav?.cart?.icon ? (
                    <button>
                        <AccessibleIcon label={actionNav?.cart?.label}>
                            <Icon id={actionNav?.cart?.icon} />
                        </AccessibleIcon>
                    </button>
                ) : null}
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
