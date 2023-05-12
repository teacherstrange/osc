import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as hooks from '~/hooks/useRecommendedProducts';
import type { recommendedProductsModule } from '~/types/sanity';
import { RecommendedProducts } from './RecommendedProducts';
import { mockProductData } from './mockProductData';

beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = vi.fn();

    mockIntersectionObserver.mockReturnValue({
        observe: () => vi.fn(),
        unobserve: () => vi.fn(),
        disconnect: () => vi.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver;

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: true,
        media: '',
        onchange: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));

    vi.spyOn(hooks, 'useRecommendedProducts').mockReturnValue(mockProductData);
});

test('renders RecommendedProducts component', () => {
    const module: recommendedProductsModule = {
        heading: 'You may also like',
        backgroundColor: 'neutral-300',
        marginBottom: 'l',
        paddingTop: 'l',
        paddingBottom: 'l',
        numberOfProducts: 4,
        carouselSettings: {
            carouselName: 'Recommended Products',
            arrows: true,
            dotNav: true,
            loop: true,
            autoplay: false,
            slidesPerView: {
                mobile: 1,
                tablet: 2,
                desktop: 3,
            },
            startIndex: 1,
        },
    };

    render(
        <MemoryRouter>
            <RecommendedProducts module={module} />
        </MemoryRouter>
    );

    expect(screen.getByText('You may also like')).toBeInTheDocument();
    expect(screen.getAllByRole('group')).toHaveLength(module.numberOfProducts);
    expect(document.querySelectorAll('.c-carousel__arrow')).toHaveLength(2);
    expect(document.querySelector('.c-carousel__dots')).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveClass('u-bg-color-neutral-300 u-mb-l u-pt-l u-pb-l');
});
