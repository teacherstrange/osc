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

// BASIC TESTS
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

//
test('carousel is disabled when active is set to true, but the length of the slides === slides per page', () => {
    render(
        <Carousel
            mediaArray={mediaArray}
            active={true} // fine
            delay={'3000'} // fine
            slidesPerPage={3} // fine
            slideGap={10} // fine
            axis={'y'} // fine
            height={'1000'} // fine
            loop={false} // fine
            startIndex={2} // fine
            ssr={false}
        ></Carousel>
    );

    const indicators = document.querySelector('.indicators').children;
    const embla__navigator = document.querySelector('.embla__navigator').children;
    expect(indicators).toHaveLength(0);
    expect(embla__navigator).toHaveLength(0);
});

// // need to test height, it is not part of emblaApi
// test('correct carousel height is set', () => {
//     render(
//         <Carousel
//             mediaArray={mediaArray}
//             active={false} // fine
//             delay={'3000'} // fine
//             slidesPerPage={2} // fine
//             slideGap={10} // fine
//             axis={'y'} // fine
//             height={'1000'} // fine
//             loop={false} // fine
//             startIndex={4} // fine
//             ssr={false}
//         ></Carousel>
//     );
// });
