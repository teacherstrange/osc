import { render, screen } from '@testing-library/react';
import React from 'react';
import {
    CalloutBanner,
    CalloutBannerTitle,
    CalloutContentGroup,
    CalloutFooter,
} from './CalloutBanner';

test('renders CalloutBanner with content', () => {
    render(
        <CalloutBanner>
            <CalloutBannerTitle className="u-color-gradient-quaternary-90">
                OSC STUDENT DISCOUNT
            </CalloutBannerTitle>
            <CalloutContentGroup>
                <p>
                    We're offering a special price of £29.99 for OSC learners. To purchase the
                    Career Kickstarter package at the discounted price please contact our learner
                    services team via studentsupport@openstudycollege.com
                </p>
            </CalloutContentGroup>
        </CalloutBanner>
    );

    const calloutBannerElement = screen.getByRole('complementary');
    const calloutBannerTitleElement = screen.getByRole('heading', {
        name: /OSC STUDENT DISCOUNT/i,
    });
    const calloutContentGroupElement = document.querySelector('.c-callout-banner__content-group');

    expect(calloutBannerElement).toHaveClass('c-callout-banner');
    expect(calloutBannerTitleElement).toHaveClass('c-callout-banner__ttl');
    expect(calloutContentGroupElement).toBeInTheDocument();
});

test('renders the content group as child element', () => {
    render(
        <CalloutContentGroup asChild>
            <p>Callout content group as child</p>
        </CalloutContentGroup>
    );

    const calloutContent = screen.getByText('Callout content group as child');
    expect(calloutContent.nodeName).toBe('P');
});

test('renders the callout footer as child element', () => {
    render(
        <CalloutFooter asChild>
            <p>Callout footer as child</p>
        </CalloutFooter>
    );

    const calloutContent = screen.getByText('Callout footer as child');
    expect(calloutContent.nodeName).toBe('P');
});
