/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { Carousel } from './Carousel';
import { render } from '@testing-library/react';

const mediaArray = [
    {
        image: {
            asset: {
                url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                caption: 'test'
            }
        }
    },
    {
        image: {
            asset: {
                url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                caption: 'test'
            }
        }
    },
    {
        image: {
            asset: {
                url: 'https://images.unsplash.com/photo-1646753442357-03c9a927b9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                caption: 'test'
            }
        }
    }
];

// BASIC TEST
test('renders the carousel with three items', () => {
    render(
        <Carousel
            mediaArray={mediaArray}
            active={true} // fine
            delay={'3000'} // fine
            slidesPerPage={2} // fine
            slideGap={10} // fine
            axis={'y'} // fine
            height={'1000'} // fine
            loop={false} // fine
            startIndex={4} // fine
            ssr={false}
        ></Carousel>
    );

    // Use querySelector as an escape hatch as queryByRole won't count hidden elements
    const carouselSlides = document.querySelectorAll('.embla__slide');
    expect(carouselSlides).toHaveLength(3);
});

// if carousel is active when there is less than one page
test('carousel is disabled when active is set to true, but scrollSnaps.length <= 1', () => {
    render(
        <Carousel
            mediaArray={mediaArray}
            active={true} // testing this
            delay={'3000'}
            slidesPerPage={3} // testing this
            slideGap={10} // testing this
            axis={'y'}
            height={'1000'} // testing this
            loop={false}
            startIndex={2}
            ssr={false}
        ></Carousel>
    );

    const indicators = document.querySelector('.indicators').children;
    const embla__navigator = document.querySelector('.embla__navigator').children;
    expect(indicators).toHaveLength(0);
    expect(embla__navigator).toHaveLength(0);
});

// need to test height, it is not part of emblaApi
test('correct carousel height is set', () => {
    render(
        <Carousel
            mediaArray={mediaArray}
            active={false} // fine
            delay={'3000'} // fine
            slidesPerPage={2} // fine
            slideGap={10} // fine
            axis={'y'} // fine
            height={'1000'} // fine
            loop={false} // fine
            startIndex={4} // fine
            ssr={false}
            carouselKey={'1'}
        ></Carousel>
    );

    const embla__slide_wrapper = document.querySelector(`.embla__carousel_wrapper_${'1'}`);
    const height = window
        .getComputedStyle(embla__slide_wrapper)
        .getPropertyValue('--embla__height');
    expect(height).toBe('1000px');
});

// need to test aria hidden, it is custom behavior
test('test aria hidden is set on the correct slides - slidesInView0000', () => {
    render(
        <Carousel
            mediaArray={mediaArray}
            active={false} // fine
            delay={'3000'} // fine
            slidesPerPage={2} // fine
            slideGap={10} // fine
            axis={'y'} // fine
            height={'1000'} // fine
            loop={false} // fine
            startIndex={4} // fine
            ssr={false}
        ></Carousel>
    );

    setTimeout(() => {
        const embla__slides = document.querySelectorAll(`.embla__slide.is-selected`);
        expect(embla__slides.length).toBeGreaterThanOrEqual(1);
        Array.from(embla__slides).forEach((slide) => {
            expect(slide).toHaveAttribute('aria-hidden', 'false');
        });
    }, 50);
});

// need to test aria hidden, it is custom behavior
test('test aria hidden is set on the correct slides - slidesNotInView', () => {
    render(
        <Carousel
            mediaArray={mediaArray}
            active={false} // fine
            delay={'3000'} // fine
            slidesPerPage={2} // fine
            slideGap={10} // fine
            axis={'y'} // fine
            height={'1000'} // fine
            loop={false} // fine
            startIndex={4} // fine
            ssr={false}
        ></Carousel>
    );

    setTimeout(() => {
        const embla__slides = document.querySelectorAll(`.embla__slide:not(.is-selected)`);
        Array.from(embla__slides).forEach((slide) => {
            expect(slide).toHaveAttribute('aria-hidden', 'true');
        });
    }, 50);
});

test('test slides per page', () => {
    const slidesPerPage = 2;

    render(
        <Carousel
            mediaArray={mediaArray}
            active={false} // fine
            delay={'3000'} // fine
            slidesPerPage={slidesPerPage} // fine
            slideGap={10} // fine
            axis={'y'} // fine
            height={'1000'} // fine
            loop={false} // fine
            startIndex={4} // fine
            ssr={false}
        ></Carousel>
    );

    setTimeout(() => {
        const embla__slides = document.querySelectorAll(`.embla__slide.is-selected`);
        expect(Array.from(embla__slides).length).toBe(3);
    }, 50);
});

test('test slideGap', () => {
    const slideGap = 10;

    render(
        <Carousel
            mediaArray={mediaArray}
            active={false} // fine
            delay={'3000'} // fine
            slidesPerPage={1} // fine
            slideGap={slideGap} // fine
            axis={'y'} // fine
            height={'1000'} // fine
            loop={false} // fine
            startIndex={4} // fine
            ssr={false}
            carouselKey={'1'}
        ></Carousel>
    );

    const embla__slide_wrapper = document.querySelector(`.embla__carousel_wrapper_${'1'}`);

    const computedSlideGap = window
        .getComputedStyle(embla__slide_wrapper)
        .getPropertyValue('--embla__slideGap');
    expect(computedSlideGap).toBe(slideGap.toString() + 'px');
});
