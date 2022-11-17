/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { Image } from './Image';
import { imageData, largeImageData, noImageWidthData, imageDataNoTransforms } from './imageData';
import { screen, render } from '@testing-library/react';

test('renders the default image', () => {
    render(
        <Image
            src={imageData.src}
            alt={imageData.alt}
            width={imageData.width}
            height={imageData.height}
        />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'A cartoony shoe');
    expect(img).toHaveAttribute(
        'src',
        'https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1331,f_auto,q_auto/v1665669942/cld-sample-5.jpg'
    );
    expect(img).toHaveAttribute(
        'srcset',
        'https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_640,f_auto,q_auto/v1665669942/cld-sample-5.jpg 640w, https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_768,f_auto,q_auto/v1665669942/cld-sample-5.jpg 768w, https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1024,f_auto,q_auto/v1665669942/cld-sample-5.jpg 1024w, https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1366,f_auto,q_auto/v1665669942/cld-sample-5.jpg 1366w, https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1600,f_auto,q_auto/v1665669942/cld-sample-5.jpg 1600w, https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1920,f_auto,q_auto/v1665669942/cld-sample-5.jpg 1920w'
    );
    expect(img).toHaveAttribute('width');
    expect(img).toHaveAttribute('height');
    expect(img).toHaveAttribute('loading', 'lazy');
});

test('renders image with sizes attribute', () => {
    render(
        <Image
            src={imageData.src}
            alt={imageData.alt}
            width={imageData.width}
            height={imageData.height}
            sizes="(min-width: 500px) 50vw, 100vw"
        />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('sizes', '(min-width: 500px) 50vw, 100vw');
});

test('renders image with transformed src when image size is > 1600px', () => {
    render(
        <Image
            src={largeImageData.src}
            alt={largeImageData.alt}
            width={largeImageData.width}
            height={largeImageData.height}
        />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
        'src',
        'https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_870,f_auto,q_auto/v1665669942/cld-sample-5.jpg'
    );
});

test('renders image with a width transformation if one is not created by cloudinary', () => {
    render(
        <Image
            src={noImageWidthData.src}
            alt={noImageWidthData.alt}
            width={noImageWidthData.width}
            height={noImageWidthData.height}
        />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
        'src',
        'https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_870,f_auto,q_auto/v1665669942/cld-sample-5.jpg'
    );
});

test('renders image when cloudinary object has no derived transformations', () => {
    render(
        <Image
            src={imageDataNoTransforms.src}
            alt={imageDataNoTransforms.alt}
            width={imageDataNoTransforms.width}
            height={imageDataNoTransforms.height}
        />
    );

    const img = screen.getByRole('img');
    const imgsrc = document.querySelector('img').src;

    expect(img).toHaveAttribute('alt', 'Some food');
    expect(img).toHaveAttribute(
        'src',
        'https://res.cloudinary.com/de2iu8gkv/image/upload/f_auto,q_auto,w_1870,h_1250/v1665669942/cld-sample-4.jpg'
    );
    expect(img).toHaveAttribute(
        'srcset',
        'https://res.cloudinary.com/de2iu8gkv/image/upload/f_auto,q_auto,w_640/v1665669942/cld-sample-4.jpg 640w, https://res.cloudinary.com/de2iu8gkv/image/upload/f_auto,q_auto,w_768/v1665669942/cld-sample-4.jpg 768w, https://res.cloudinary.com/de2iu8gkv/image/upload/f_auto,q_auto,w_1024/v1665669942/cld-sample-4.jpg 1024w, https://res.cloudinary.com/de2iu8gkv/image/upload/f_auto,q_auto,w_1366/v1665669942/cld-sample-4.jpg 1366w, https://res.cloudinary.com/de2iu8gkv/image/upload/f_auto,q_auto,w_1600/v1665669942/cld-sample-4.jpg 1600w, https://res.cloudinary.com/de2iu8gkv/image/upload/f_auto,q_auto,w_1920/v1665669942/cld-sample-4.jpg 1920w'
    );
    expect(img).toHaveAttribute('width');
    expect(img).toHaveAttribute('height');

    expect(imgsrc).toContain('f_auto,q_auto,w_1870');
});

test('renders picture with alternate source elements', () => {
    render(
        <Image
            src={imageData.src}
            artDirectedImages={imageData.responsiveImages}
            alt={imageData.alt}
            width={imageData.width}
            height={imageData.height}
        />
    );

    const img = screen.getByRole('img');
    const sources = document.querySelectorAll('source');

    expect(sources[0]).toHaveAttribute('media', '(max-width: 425px)');
    expect(sources[0]).toHaveAttribute(
        'srcset',
        'https://res.cloudinary.com/de2iu8gkv/image/upload/a_hflip.vflip,e_bgremoval,f_auto,q_auto/v1665669942/cld-sample-5.jpg'
    );
    expect(sources[1]).toHaveAttribute('media', '(max-width: 834px)');
    expect(sources[1]).toHaveAttribute(
        'srcset',
        'https://res.cloudinary.com/de2iu8gkv/image/upload/v1665669942/cld-sample-4.jpg'
    );
    expect(img).toHaveAttribute('alt', 'A cartoony shoe');
    expect(img).toHaveAttribute(
        'src',
        'https://res.cloudinary.com/de2iu8gkv/image/upload/c_scale,e_cartoonify,w_1331,f_auto,q_auto/v1665669942/cld-sample-5.jpg'
    );
    expect(img).toHaveAttribute('width');
    expect(img).toHaveAttribute('height');
    expect(img).toHaveAttribute('loading', 'lazy');
});
