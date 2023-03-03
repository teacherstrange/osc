import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SpritesheetProvider } from 'osc-ui';
import { MemoryRouter } from 'react-router-dom';
import { mockCardData } from '~/components/Cards/mockCardData';
import type {
    bioCardModule,
    collectionCardModule,
    courseCardModule,
    postCardModule,
    staticCardModule,
} from '~/types/sanity';
import breakpoints from '../../../../../tokens/media-queries';
import { BioCard } from './BioCard';
import { BlogCard } from './BlogCard';
import { Cards } from './Cards';
import { CollectionCard } from './CollectionCard';
import { CourseCard } from './CourseCard';
import { SimpleCard } from './SimpleCard';

const getCardType = (cardType: string) => {
    return mockCardData.card.filter((card) => card._type === cardType)[0];
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
});

describe('Responsive layout', () => {
    test(`renders cards in a grid layout when screen is greater than ${breakpoints.tab}px`, () => {
        window.matchMedia = vi.fn().mockImplementation((query: string) => ({
            matches: query === `(min-width: ${breakpoints.tab}px)`,
            media: '',
            onchange: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Cards module={mockCardData} />
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const grid = document.querySelector('.o-grid');
        const gridItems = document.querySelectorAll('[class*="o-grid__col"]');

        expect(grid).toBeInTheDocument();
        expect(gridItems).toHaveLength(5);
    });

    test(`renders cards in a carousel layout when screen is less than ${breakpoints.tab}px`, () => {
        window.matchMedia = vi.fn().mockImplementation((query: string) => ({
            matches: query !== `(min-width: ${breakpoints.tab}px)`,
            media: '',
            onchange: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Cards module={mockCardData} />
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const carousel = document.querySelector('.c-carousel');
        const carouselSlide = document.querySelectorAll('.c-carousel__slide');

        expect(carousel).toBeInTheDocument();
        expect(carouselSlide).toHaveLength(5);
    });

    test(`renders cards in a grid layout when screen is less than ${breakpoints.tab}px and number of cards is less than three`, () => {
        window.matchMedia = vi.fn().mockImplementation((query: string) => ({
            matches: query !== `(min-width: ${breakpoints.tab}px)`,
            media: '',
            onchange: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        // TODO: We can update to use structuredClone() when we update to Node 17
        const clonedData = JSON.parse(JSON.stringify(mockCardData)) as typeof mockCardData;
        clonedData.card.splice(0, 3);

        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Cards module={clonedData} />
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const grid = document.querySelector('.o-grid');
        const gridItems = document.querySelectorAll('[class*="o-grid__col"]');

        expect(grid).toBeInTheDocument();
        expect(gridItems).toHaveLength(2);
    });
});

describe('Controlled layout', () => {
    beforeEach(() => {
        window.matchMedia = vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));
    });

    test(`renders cards in a grid layout`, () => {
        // TODO: We can update to use structuredClone() when we update to Node 17
        const clonedData = JSON.parse(JSON.stringify(mockCardData)) as typeof mockCardData;
        clonedData.layout = 'grid';

        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Cards module={clonedData} />
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const grid = document.querySelector('.o-grid');
        const gridItems = document.querySelectorAll('[class*="o-grid__col"]');

        expect(grid).toBeInTheDocument();
        expect(gridItems).toHaveLength(5);
    });

    test(`renders cards in a carousel layout`, () => {
        // TODO: We can update to use structuredClone() when we update to Node 17
        const clonedData = JSON.parse(JSON.stringify(mockCardData)) as typeof mockCardData;
        clonedData.layout = 'carousel';

        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Cards module={clonedData} />
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const carousel = document.querySelector('.c-carousel');
        const carouselSlide = document.querySelectorAll('.c-carousel__slide');

        expect(carousel).toBeInTheDocument();
        expect(carouselSlide).toHaveLength(5);
    });

    test('renders cards in grid island layout', () => {
        // TODO: We can update to use structuredClone() when we update to Node 17
        const clonedData = JSON.parse(JSON.stringify(mockCardData)) as typeof mockCardData;
        clonedData.layout = 'island grid';

        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <Cards module={clonedData} />
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const islandGrid = document.querySelector('.c-island-grid');
        expect(islandGrid).toBeInTheDocument();
    });
});

describe('Card types', () => {
    test('renders the content of the bio card', () => {
        const bioCard = getCardType('card.bio');

        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <BioCard data={bioCard as bioCardModule} />
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const img = screen.getByRole('img');
        const title = screen.getByRole('heading', {
            level: 2,
            name: bioCard.reference?.name,
        });
        const role = screen.getByRole('heading', {
            level: 3,
            name: bioCard.reference?.role,
        });
        const content = document.querySelector('.c-content');

        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('alt', bioCard.image?.alt);
        expect(title).toBeInTheDocument();
        expect(role).toBeInTheDocument();
        expect(content).toBeInTheDocument();
    });

    test('renders the content of the course card', async () => {
        // TODO: Will need to update test to reflect Shopify storekit helpers when in place
        const courseCard = getCardType('card.course');
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <CourseCard data={courseCard as courseCardModule} />
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const title = screen.getByRole('heading', {
            level: 2,
            name: courseCard?.reference?.store?.title,
        });
        const courseOptions = screen.getAllByRole('listitem');
        const minPrice = screen.getByText(/£469 in full/);
        const wishlistButton = screen.getByRole('button', {
            name: 'Save for later',
        });

        expect(title).toBeInTheDocument();
        expect(courseOptions).toHaveLength(2);
        expect(minPrice).toBeInTheDocument();

        await user.click(wishlistButton);

        expect(wishlistButton).toHaveClass('is-active');
    });

    test('renders the content of the collection card', () => {
        // TODO: Will need to update test to reflect Shopify storekit helpers when in place
        const collectionCard = getCardType('card.collection');

        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <CollectionCard data={collectionCard as collectionCardModule} />
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const title = screen.getByRole('heading', {
            level: 2,
            name: collectionCard?.reference?.store?.title,
        });

        expect(title).toBeInTheDocument();
    });

    test('renders the content of the blog card', () => {
        const blogCard = getCardType('card.post');

        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <BlogCard data={blogCard as postCardModule} />
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const title = screen.getByRole('heading', {
            level: 2,
            name: blogCard.reference?.name,
        });

        expect(title).toBeInTheDocument();
    });

    test('renders the content of the simple card', () => {
        const staticCard = getCardType('card.static');

        render(
            <MemoryRouter>
                <SpritesheetProvider>
                    <SimpleCard data={staticCard as staticCardModule} />
                </SpritesheetProvider>
            </MemoryRouter>
        );

        const img = screen.getByRole('img');
        const title = screen.getByRole('heading', {
            level: 2,
            name: staticCard?.heading,
        });
        const role = screen.getByRole('heading', {
            level: 3,
            name: staticCard?.subHeading,
        });
        const content = document.querySelector('.c-content');
        const button = screen.getByRole('button', {
            name: staticCard?.button?.label,
        });

        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('alt', staticCard.image?.alt);
        expect(title).toBeInTheDocument();
        expect(role).toBeInTheDocument();
        expect(content).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });
});
