import {
    Icon,
    Navbar,
    NavContent,
    NavItem,
    NavLink,
    NavList,
    NavSubMenu,
    NavTrigger,
} from 'osc-ui';
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
                                    <Icon id="chevron-right" />
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

                        <Icon
                            id="chevron-down"
                            className={`c-nav__trigger-icon ${level === 0 && 'u-hidden-from@desk'}`} // Only show the icon if the level is > 0 or were not on a desktop
                            aria-hidden
                        />
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
