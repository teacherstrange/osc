/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { Carousel } from './Carousel';
import { render } from '@testing-library/react';

const mediaArray = [
    {
        _key: '2abff668951c',
        _type: 'module.images',
        alt: 'A cartoony shoe',
        height: 1250,
        src: 'https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1331,f_auto,q_auto/v1665669942/cld-sample-5.jpg',
        width: 1870
    },
    {
        _key: '2abff668952c',
        _type: 'module.images',
        alt: 'A cartoony shoe',
        height: 1250,
        src: 'https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1331,f_auto,q_auto/v1665669942/cld-sample-5.jpg',
        width: 1870
    },
    {
        _key: '2abff668953c',
        _type: 'module.images',
        alt: 'A cartoony shoe',
        height: 1250,
        src: 'https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1331,f_auto,q_auto/v1665669942/cld-sample-5.jpg',
        width: 1870
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
