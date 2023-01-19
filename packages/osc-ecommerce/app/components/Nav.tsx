import { Navbar, NavContent, NavItem, NavLink, NavList, NavSubMenu, NavTrigger } from 'osc-ui';
import type { SanityNavItem } from '~/types/sanity';

interface Props {
    item: SanityNavItem;
    level: number;
    value: string;
}

const RecursiveNavItemWrapper = (props: Props) => {
    const { item, level } = props;

    if (item?._type === 'column' && item?.items) {
        return (
            <NavItem className="c-nav__item--column">
                <NavList>
                    {item?.items.map((subItem) => {
                        return (
                            <RecursiveNavItemWrapper
                                key={subItem?._key}
                                item={subItem}
                                level={level}
                                value={subItem?.navigationLabel}
                            />
                        );
                    })}
                </NavList>
            </NavItem>
        );
    }

    if (item?._type === 'feature' && item?.items) {
        return (
            <NavItem className="c-nav__item--feature">
                <NavList>
                    {item?.items.map((item) => {
                        return (
                            <NavItem key={item?._key}>
                                <NavLink
                                    href={item?.internalLink?.slug ?? item?.externalLink}
                                    isExternal={item?.target === 'External'}
                                >
                                    {item?.navigationLabel ?? item?.internalLink?.title}
                                </NavLink>
                            </NavItem>
                        );
                    })}
                </NavList>
            </NavItem>
        );
    }

    return (
        <NavItem>
            {item?.items ? (
                <NavSubMenu level={level} label={item?.navigationLabel}>
                    <NavTrigger>
                        {item?.navigationLabel}

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
                            {item?.items.map((subItem) => {
                                return (
                                    <RecursiveNavItemWrapper
                                        key={subItem?._key}
                                        item={subItem}
                                        level={level + 1}
                                        value={subItem?.navigationLabel}
                                    />
                                );
                            })}
                        </NavList>
                    </NavContent>
                </NavSubMenu>
            ) : (
                <NavLink
                    href={item?.internalLink?.slug ?? item?.externalLink}
                    isExternal={item?.target === 'External'}
                >
                    {item?.navigationLabel ?? item?.internalLink?.title}
                </NavLink>
            )}
        </NavItem>
    );
};

export const Nav = (props: { navItems: SanityNavItem[] }) => {
    const { navItems } = props;

    return (
        <Navbar>
            <NavList>
                {navItems.map((item) => {
                    return (
                        <RecursiveNavItemWrapper
                            key={item?._key}
                            item={item}
                            level={0}
                            value={item?.navigationLabel}
                        />
                    );
                })}
            </NavList>
        </Navbar>
    );
};
