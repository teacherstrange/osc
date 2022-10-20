/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { Carousel } from './Carousel';
import { screen, render } from '@testing-library/react';

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

test('renders the tabs with three items', () => {
    render(
        <Carousel
            mediaArray={mediaArray}
            active={true} // fine
            delay={'3000'} // fine
            slidesPerPage={2} // fine
            slidesToScroll={true}
            slideGap={10} // fine
            axis={'y'} // fine
            height={'1000'} // fine
            loop={false} // fine
            startIndex={4} // fine
            ssr={false}
        ></Carousel>
    );

    const tabList = screen.queryAllByRole('tab');
    // Use querySelector as an escape hatch as queryByRole won't count hidden elements
    const tabPanels = document.querySelectorAll('embla__slide');
    const tabContainer = document.querySelector('.chakra-tabs');

    expect(tabList).toHaveLength(3);
    expect(tabPanels).toHaveLength(3);
    expect(tabContainer).not.toHaveClass('undefined');
});
