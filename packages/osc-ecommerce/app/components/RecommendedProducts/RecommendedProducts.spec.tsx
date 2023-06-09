import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as hooks from '~/hooks/useRecommendedProducts';
import type { recommendedProductsModule } from '~/types/sanity';
import { RecommendedProducts } from './RecommendedProducts';
import { mockProductData } from './mockProductData';

const module: recommendedProductsModule = {
    heading: 'You may also like',
    rowSettings: {
        backgroundColor: 'neutral-300',
        marginBottom: 'l',
        paddingBottom: 'l',
        paddingTop: 'l',
        container: 'default',
    },
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

const formatNumberString = (num: string) => {
    return parseInt(num, 10).toLocaleString('en-GB').toString();
};

const setup = () => {
    render(
        <MemoryRouter>
            <RecommendedProducts module={module} />
        </MemoryRouter>
    );
};

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

test('renders RecommendedProducts component with cards', () => {
    setup();

    expect(screen.getByText('You may also like')).toBeInTheDocument();
    expect(screen.getAllByRole('group')).toHaveLength(module.numberOfProducts);
    expect(document.querySelectorAll('.c-carousel__arrow')).toHaveLength(2);
    expect(document.querySelector('.c-carousel__dots')).toBeInTheDocument();

    const titles = document.querySelectorAll('.c-card__title');
    const subTitles = document.querySelectorAll('.c-card__sub-ttl');
    const optionElements = document.querySelectorAll('.c-card__body-inner li');
    const price = document.querySelectorAll('.c-card__price-tag');
    const link = document.querySelectorAll('.c-btn');

    titles.forEach((title, i) => {
        expect(title).toHaveTextContent(mockProductData[i].title);
    });
    subTitles.forEach((title) => {
        expect(title).toHaveTextContent('Single course');
    });

    let options = [];
    for (let i = 0; i < mockProductData.length; i++) {
        options.push(
            mockProductData[i].options.filter(
                (option) => option.name === 'Format' || option.name === 'Course Options'
            )
        );
    }

    options.forEach((option, i) => {
        option.forEach((el) => {
            expect(optionElements[i]).toHaveTextContent(el.values[0]);
        });
    });

    price.forEach((el, i) => {
        expect(el).toHaveTextContent(
            `From £${formatNumberString(
                mockProductData[i].priceRange.minVariantPrice.amount
            )} in full`
        );
    });

    link.forEach((el, i) => {
        expect(el).toHaveAttribute('href', `/courses/${mockProductData[i].handle}`);
    });
});

test('adds the correct classes to the component', () => {
    setup();

    expect(screen.getByRole('article')).toHaveClass('u-bg-color-neutral-300 u-mb-l u-pt-l u-pb-l');
});
