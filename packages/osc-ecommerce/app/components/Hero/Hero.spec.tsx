import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { heroModule } from '~/types/sanity';
import { Hero } from './Hero';
import { heroCarousel, heroSingle } from './mockHeroData';

beforeEach(() => {
    const mockMatchMedia = vi.fn();
    mockMatchMedia.mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
    window.matchMedia = mockMatchMedia;

    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => vi.fn(),
        unobserve: () => vi.fn(),
        disconnect: () => vi.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

test('renders a single Hero', () => {
    render(
        <MemoryRouter>
            <Hero data={heroSingle as heroModule} />
        </MemoryRouter>
    );

    const hero = document.querySelectorAll('.c-hero');
    const title = screen.getByRole('heading', { level: 1 });
    const content = screen.getByText(
        "With flexible payment plans and a range of special offers it's never been simpler to study."
    );
    const button = screen.getByRole('link');
    const image = screen.getByRole('img');

    expect(hero).toHaveLength(1);
    expect(hero[0]).toHaveClass('c-hero--primary');
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(image).toBeInTheDocument();
});

test("renders multiple Hero's in a carousel", () => {
    render(
        <MemoryRouter>
            <Hero data={heroCarousel as heroModule} />
        </MemoryRouter>
    );

    const carousel = screen.getByRole('region', { name: 'Hero Carousel' });
    const heros = document.querySelectorAll('.c-hero');

    expect(carousel).toBeInTheDocument();
    expect(heros).toHaveLength(heroCarousel.slides.length);
});

test('sets the title as a h1 on the initial slide', () => {
    render(
        <MemoryRouter>
            <Hero data={heroCarousel as heroModule} />
        </MemoryRouter>
    );

    const h1s = screen.getAllByRole('heading', { level: 1 });

    // eslint-disable-next-line jest-dom/prefer-in-document -- want to assert there's no more than 1
    expect(h1s).toHaveLength(1);

    expect(h1s[0]).toHaveTextContent('Black Friday');
});

test('removes the image from the secondary variant', () => {
    // TODO: We can update to use structuredClone() when we update to Node 17
    const clonedData = JSON.parse(JSON.stringify(heroSingle)) as heroModule;
    clonedData.slides[0].variant = 'secondary';

    render(
        <MemoryRouter>
            <Hero data={clonedData} />
        </MemoryRouter>
    );

    const hero = document.querySelector('.c-hero');
    const image = document.querySelector('.c-hero__img');

    expect(hero).toHaveClass('c-hero--secondary');
    expect(image).not.toBeInTheDocument();
});

test('adds the HeroTitleGroup to the Hero when tertiary variant is set', () => {
    // TODO: We can update to use structuredClone() when we update to Node 17
    const clonedData = JSON.parse(JSON.stringify(heroSingle)) as heroModule;
    clonedData.slides[0].variant = 'tertiary';

    render(
        <MemoryRouter>
            <Hero data={clonedData} />
        </MemoryRouter>
    );

    const hero = document.querySelector('.c-hero');
    const titleGroup = document.querySelector('.c-hero-ttl__group');

    expect(hero).toHaveClass('c-hero--tertiary');
    expect(titleGroup).toBeInTheDocument();
});
