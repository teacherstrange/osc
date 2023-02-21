import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import type { FooterProps } from './Footer';
import { Footer, FooterBottom, FooterGroup } from './Footer';

export default {
    title: 'osc-ui/Footer',
    component: Footer,
    subcomponents: { FooterGroup },
} as Meta;

const Template: Story<FooterProps> = (args) => (
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

        <FooterBottom>
            <a href="/">Terms</a>
            <a href="/">Privacy Policy</a>
        </FooterBottom>
    </Footer>
);

export const Primary = Template.bind({});

Primary.args = {};
