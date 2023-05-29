import { render, screen } from '@testing-library/react';
import { mediaQueries as mq } from 'osc-design-tokens';
import { SpritesheetProvider } from 'osc-ui';
import { MemoryRouter } from 'react-router-dom';
import type { tabsModule } from '~/types/sanity';
import { TabsModule } from './Tabs';
import { mockTabData } from './mockTabData';

const setup = () => {
    return (
        <MemoryRouter>
            <SpritesheetProvider>
                <TabsModule module={mockTabData as unknown as tabsModule} />
            </SpritesheetProvider>
        </MemoryRouter>
    );
};

beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query !== `(min-width: ${mq['mob-lrg']}px)`,
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

test('renders the tabs with some content', () => {
    render(setup());

    expect(screen.getAllByRole('tab')).toHaveLength(mockTabData.tabItem.length);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    expect(screen.getByText(mockTabData.tabItem[0].title)).toBeInTheDocument();
});

test('renders as an accordion when breakpoint matches', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query === `(min-width: ${mq['mob-lrg']}px)`,
        media: '',
        onchange: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));

    render(setup());

    expect(document.querySelector('.c-accordion')).toBeInTheDocument();
    expect(document.querySelector('.c-accordion__item')).toBeInTheDocument();
    expect(document.querySelector('.c-accordion__header')).toBeInTheDocument();
    expect(document.querySelector('.c-accordion__content')).toBeInTheDocument();
});
