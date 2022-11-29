import { render, screen } from '@testing-library/react';
import React from 'react';
import { Avatar } from './Avatar';

const DELAY = 300;
const IMAGE_URL =
    'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80';
const NAME = 'Colm Tuite';

describe('Avatar component', () => {
    const originalGlobalImage = window.Image;
    const initial = NAME.split(' ')
        .map((x) => x.charAt(0).toUpperCase())
        .join('');

    beforeAll(() => {
        (window.Image as any) = class MockImage {
            onload: () => void = () => {};
            src: string = '';
            constructor() {
                setTimeout(() => {
                    this.onload();
                }, DELAY);
                return this;
            }
        };
    });

    afterAll(() => {
        window.Image = originalGlobalImage;
    });

    test('should render fallback initially ', () => {
        render(<Avatar name={NAME} src={IMAGE_URL} />);
        const result = screen.queryByText(initial);
        expect(result).toBeInTheDocument();
    });
    test('should not render image initially', () => {
        render(<Avatar name={NAME} src={IMAGE_URL} />);
        const result = screen.queryByRole('img');
        expect(result).not.toBeInTheDocument();
    });
    test('should render an image after it has loaded', async () => {
        render(<Avatar name={NAME} src={IMAGE_URL} />);
        const result = await screen.findByRole('img');
        expect(result).toBeInTheDocument();
    });
    test('should render a fallback when no Image is provided', () => {
        render(<Avatar name={NAME} />);
        const result = screen.queryByText(initial);
        expect(result).toBeInTheDocument();
    });
});
