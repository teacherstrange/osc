import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ContentMediaModule } from './ContentMedia';
import { contentMediaData, contentMediaDataSingle } from './mockContentMediaData';

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

test('renders a single item', () => {
    render(
        <MemoryRouter>
            <ContentMediaModule module={contentMediaDataSingle} />
        </MemoryRouter>
    );

    expect(document.querySelector('.c-content-media')).toBeInTheDocument();
    expect(document.querySelector('.c-content-media__content')).toBeInTheDocument();
    expect(document.querySelector('.c-content-media__media')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
});

test("renders multiple ContentMedia's in a carousel", () => {
    render(
        <MemoryRouter>
            <ContentMediaModule module={contentMediaData} />
        </MemoryRouter>
    );

    const carousel = screen.getByRole('region', { name: 'Content media carousel' });
    const heros = document.querySelectorAll('.c-content-media');

    expect(carousel).toBeInTheDocument();
    expect(heros).toHaveLength(contentMediaData.slides.length);
});
