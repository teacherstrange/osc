import {
    AccessibleIcon,
    Footer,
    FooterBottom,
    FooterGroup,
    FooterMenu,
    FooterMenuContent,
    FooterMenuHeader,
    FooterMenuItem,
    Icon,
    List,
    ListItem,
    Logo,
    NavLink,
    rem,
    useMediaQuery,
} from 'osc-ui';
import { useEffect, useState } from 'react';
import type { SanityContactDetails, SanityNavSettings, SanitySocial } from '~/types/sanity';

interface SiteFooterProps {
    navigationGroups: SanityNavSettings[];
    bottomNavigation: SanityNavSettings;
    contactDetails: SanityContactDetails;
    socials: SanitySocial[];
    siteName: string;
}

export const SiteFooter = (props: SiteFooterProps) => {
    const { bottomNavigation, navigationGroups, contactDetails, socials, siteName } = props;
    // ! TEMPORARY fix for tokens path not matching dev and prod environments
    // ! Once solution in place we can update this to use design token files instead
    const mq = {
        tab: 768,
    };

    const isGreaterThanTab = useMediaQuery(`(min-width: ${rem(mq.tab)}rem)`);
    const [showOnGreaterThanTab, setShowOnGreaterThanTab] = useState(false);

    // We need this useEffect to set the showOnTab state only when the window object exists
    // Otherwise we will receive an SSR warning telling us the markup differs from the server
    useEffect(() => {
        setShowOnGreaterThanTab(isGreaterThanTab);
    }, [isGreaterThanTab]);

    return (
        <Footer>
            <FooterGroup direction="column">
                <Logo className="c-footer__logo" />

                <div>
                    {contactDetails?.phoneNumber ? (
                        <p>
                            Call:{' '}
                            <a href={`tel:${contactDetails?.phoneNumber}`} className="u-text-bold">
                                {contactDetails?.phoneNumber}
                            </a>
                        </p>
                    ) : null}

                    {contactDetails?.email ? (
                        <p>
                            Email:{' '}
                            <a href={`mailto:${contactDetails?.email}`} className="u-text-bold">
                                {contactDetails?.email}
                            </a>
                        </p>
                    ) : null}
                </div>

                {socials && socials?.length > 0 ? (
                    <FooterGroup>
                        {socials.map((social) => (
                            <a href={social?.socialProfile} key={social._key}>
                                <AccessibleIcon label={social?.icon}>
                                    <Icon id={social?.icon} className="c-footer__icon" />
                                </AccessibleIcon>
                            </a>
                        ))}
                    </FooterGroup>
                ) : null}
            </FooterGroup>

            {navigationGroups && navigationGroups.length > 0 ? (
                <FooterGroup>
                    {showOnGreaterThanTab ? (
                        <FooterMenu>
                            {navigationGroups.map((group) => (
                                <FooterMenuItem key={group._id}>
                                    <FooterMenuHeader>{group?.title}</FooterMenuHeader>
                                    <FooterMenuContent>
                                        <List className="is-bare">
                                            {group?.navigationItem?.map((item) => (
                                                <ListItem key={item._key}>
                                                    <NavLink
                                                        href={
                                                            item?.internalLink?.slug ??
                                                            item?.externalLink
                                                        }
                                                        isExternal={item?.target === 'External'}
                                                    >
                                                        {item?.navigationLabel ??
                                                            item?.internalLink?.title}
                                                    </NavLink>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </FooterMenuContent>
                                </FooterMenuItem>
                            ))}
                        </FooterMenu>
                    ) : (
                        <FooterMenu isAccordion collapsible defaultValue="0" type="single">
                            {navigationGroups.map((group, index) => (
                                <FooterMenuItem isAccordion value={`${index}`} key={group._id}>
                                    <FooterMenuHeader isAccordion>{group?.title}</FooterMenuHeader>
                                    <FooterMenuContent isAccordion>
                                        <List className="is-bare">
                                            {group?.navigationItem?.map((item) => (
                                                <ListItem key={item._key}>
                                                    <NavLink
                                                        href={
                                                            item?.internalLink?.slug ??
                                                            item?.externalLink
                                                        }
                                                        isExternal={item?.target === 'External'}
                                                    >
                                                        {item?.navigationLabel ??
                                                            item?.internalLink?.title}
                                                    </NavLink>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </FooterMenuContent>
                                </FooterMenuItem>
                            ))}
                        </FooterMenu>
                    )}
                </FooterGroup>
            ) : null}

            <FooterBottom siteName={siteName}>
                {bottomNavigation && bottomNavigation?.navigationItem.length > 0
                    ? bottomNavigation?.navigationItem?.map((item) => (
                          <FooterMenuItem key={item._key}>
                              <NavLink
                                  href={item?.internalLink?.slug ?? item?.externalLink}
                                  isExternal={item?.target === 'External'}
                              >
                                  {item?.navigationLabel ?? item?.internalLink?.title}
                              </NavLink>
                          </FooterMenuItem>
                      ))
                    : null}
            </FooterBottom>
        </Footer>
    );
};
