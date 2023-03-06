import { render, screen } from '@testing-library/react';
import { SpritesheetProvider } from 'osc-ui';
import { MemoryRouter } from 'react-router-dom';
import type { SanityNavSettings } from '~/types/sanity';
import { SiteFooter } from './Footer';
import { mockFooterData } from './mockFooterData';

const mq = {
    tab: 768,
};

const setup = () => {
    return (
        <MemoryRouter>
            <SpritesheetProvider>
                <SiteFooter
                    navigationGroups={mockFooterData.navigationGroups as SanityNavSettings[]}
                    bottomNavigation={mockFooterData.bottomNavigation as SanityNavSettings}
                    contactDetails={mockFooterData.contactDetails}
                    socials={mockFooterData.socials}
                    siteName={mockFooterData.siteName}
                />
            </SpritesheetProvider>
        </MemoryRouter>
    );
};

beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query === `(min-width: ${mq.tab}px)`,
        media: '',
        onchange: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));

    window.ResizeObserver = vi.fn().mockImplementation(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    }));
});

test('renders the OSC logo', () => {
    render(setup());

    expect(document.querySelector('.c-logo')).toBeInTheDocument();
});

test('renders the contact details inside the footer', () => {
    render(setup());

    expect(screen.getByText(mockFooterData.contactDetails.phoneNumber)).toBeInTheDocument();
    expect(screen.getByText(mockFooterData.contactDetails.email)).toBeInTheDocument();
});

test('renders the social icons inside the footer', () => {
    render(setup());

    for (const social of mockFooterData.socials) {
        expect(screen.getByText(social.icon)).toBeInTheDocument();
    }
});

test('renders the navigation groups', () => {
    render(setup());

    for (const group of mockFooterData.navigationGroups) {
        expect(screen.getByText(group.title)).toBeInTheDocument();

        for (const link of group.navigationItem) {
            expect(
                screen.getByText(link.navigationLabel || link.internalLink.title)
            ).toBeInTheDocument();
        }
    }
});

test('renders the bottom navigation', () => {
    render(setup());

    expect(screen.getByText(mockFooterData.siteName)).toBeInTheDocument();

    for (const link of mockFooterData.bottomNavigation.navigationItem) {
        expect(
            screen.getByText(link.navigationLabel || link.internalLink.title)
        ).toBeInTheDocument();
    }
});
