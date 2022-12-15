import { render, screen } from '@testing-library/react';
import React from 'react';
import { Carousel } from './Carousel';

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

test('renders the default carousel with three items', () => {
    render(
        <Carousel carouselName="Test">
            <div>1</div>
            <div>2</div>
            <div>3</div>
        </Carousel>
    );

    const carouselContainer = screen.getByRole('region', { name: 'Test' });
    const slides = screen.getAllByRole('group');
    const dots = screen.getAllByRole('button', { name: /Go to slide/i });

    expect(carouselContainer).toBeInTheDocument();
    expect(carouselContainer).toHaveAttribute('aria-live', 'polite');
    expect(carouselContainer).toHaveAttribute('aria-atomic', 'true');
    expect(carouselContainer).toHaveAttribute('aria-roledescription', 'carousel');

    expect(slides).toHaveLength(3);
    slides.forEach((slide, index) => {
        expect(slide).toHaveAccessibleName(`${index + 1} of 3`);
        expect(slide).toHaveAttribute('data-slide-index', `${index}`);
    });

    expect(dots).toHaveLength(3);
    dots.forEach((dot, index) => {
        expect(dot).toHaveAccessibleName(`Go to slide ${index + 1}`);
    });
});

describe('arrow navigation', () => {
    test('renders a carousel with arrows', () => {
        render(
            <Carousel carouselName="Test" arrows={true}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Carousel>
        );

        const prevButton = screen.getByRole('button', { name: 'Previous slide' });
        const nextButton = screen.getByRole('button', { name: 'Next slide' });

        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
    });

    test('first arrow is disabled when loop is false', () => {
        render(
            <Carousel carouselName="Test" arrows={true} loop={false}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Carousel>
        );

        const prevButton = screen.getByRole('button', { name: 'Previous slide' });

        expect(prevButton).toBeDisabled();
    });
});

describe('a11y', () => {
    test('sets aria-live to off when autoplay is active', () => {
        render(
            <Carousel carouselName="Test" autoplay="smooth" loop={true}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Carousel>
        );

        const carouselContainer = screen.getByRole('region', { name: 'Test' });

        expect(carouselContainer).toHaveAttribute('aria-live', 'off');
    });

    test('sets aria-hidden=true when slides are not intersecting with the viewport', () => {
        const mockEntry = { isIntersecting: false };
        const mockIntersectionObserver = vi.fn();

        mockIntersectionObserver.mockReturnValue({
            observe: () => {},
            disconnect: () => vi.fn(),
        });
        window.IntersectionObserver = mockIntersectionObserver;

        render(
            <Carousel carouselName="Test" loop={true}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Carousel>
        );

        const observerCallback = mockIntersectionObserver.mock.calls[0][0];
        observerCallback([mockEntry]);

        // Look for hidden slides
        const slides = screen.getAllByRole('group', { hidden: true });

        expect(slides[2]).toHaveAttribute('aria-hidden', 'true');
    });

    test('carousel inner is in the focus tree', () => {
        render(
            <Carousel carouselName="Test" loop={true}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Carousel>
        );

        const carouselInner = document.querySelector('.c-carousel__inner');
        expect(carouselInner).toHaveAttribute('tabindex', '0');
    });
});

describe('adaptive height', () => {
    test('sets the height of the carousel to the tallest item intersecting the viewport', () => {
        const mockEntry = { isIntersecting: true };
        const mockIntersectionObserver = vi.fn();

        mockIntersectionObserver.mockReturnValue({
            observe: () => {},
            disconnect: () => vi.fn(),
        });
        window.IntersectionObserver = mockIntersectionObserver;

        render(
            <Carousel carouselName="Test" loop={true} adaptiveHeight={true}>
                <div style={{ height: '200px' }}>200px</div>
                <div style={{ height: '100px' }}>100px</div>
                <div style={{ height: '75px' }}>75px</div>
                <div style={{ height: '100px' }}>100px</div>
                <div style={{ height: '150px' }}>150px</div>
            </Carousel>
        );

        const observerCallback = mockIntersectionObserver.mock.calls[0][0];
        observerCallback([mockEntry]);

        const carouselInner = document.querySelector('.c-carousel__inner');

        expect(carouselInner).toHaveStyle('align-items: flex-start;');
    });
});
