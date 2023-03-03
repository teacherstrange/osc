import type { Meta, Story } from '@storybook/react';
import React from 'react';
import breakpoints from '../../../../../tokens/media-queries';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { rem } from '../../utils/rem';
import { Icon } from '../Icon/Icon';
import { List, ListItem } from '../List/List';
import { Logo } from '../Logo/Logo';
import type { FooterProps } from './Footer';
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

export default {
    title: 'osc-ui/Footer',
    component: Footer,
    subcomponents: {
        FooterBottom,
        FooterGroup,
        FooterMenu,
        FooterMenuContent,
        FooterMenuHeader,
        FooterMenuItem,
    },
    parameters: {
        docs: {
            description: {
                component: 'Global footer component for displaying at the bottom of the website.',
            },
        },
    },
} as Meta;

const Template: Story<FooterProps> = (args) => {
    const isDesktop = useMediaQuery(`(min-width: ${rem(breakpoints.tab)}rem)`);

    return (
        <Footer {...args}>
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
                {isDesktop ? (
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
                ) : (
                    <FooterMenu isAccordion collapsible defaultValue="0" type="single">
                        {footerMenuItems.map((item, index) => {
                            return (
                                <FooterMenuItem isAccordion value={`${index}`} key={index}>
                                    <FooterMenuHeader isAccordion>{item.heading}</FooterMenuHeader>
                                    <FooterMenuContent isAccordion>
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
                )}
            </FooterGroup>

            <FooterBottom>
                <a href="/">Terms</a>
                <a href="/">Privacy Policy</a>
            </FooterBottom>
        </Footer>
    );
};

export const Primary = Template.bind({});
Primary.args = {};
