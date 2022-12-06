/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import type { Props } from './ImageGallery';
import { ImageGallery } from './ImageGallery';
import { imageGrid2x2, singleImageData } from './imageGalleryData';

describe('Image Gallery Component', () => {
    const setup = ({ images, variant }: Props) => {
        return render(<ImageGallery images={images} variant={variant} />);
    };

    test('should render a single image and a modal without an "lg-show" class when passed one image', () => {
        setup({ images: singleImageData });
        expect(screen.getByAltText(/A cartoony shoe/i)).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByRole('dialog')).not.toHaveClass('lg-show');
    });

    test('should render four images in a 2x2 grid when passed four images with 2x variant', async () => {
        const { container } = setup({ images: imageGrid2x2.images, variant: imageGrid2x2.variant });
        // Expect this to be double as it renders one image for the initial view and one for the carousel
        expect(screen.getAllByRole('img').length).toBe(8);
        const images = container.getElementsByClassName('c-image-gallery__img');
        for (const img of Array.from(images)) {
            expect(img).toHaveClass('c-image-gallery__img--2x2-grid');
        }
    });

    test('should open the lightgallery when the image is clicked', async () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention -- render is in setup function
        const user = userEvent.setup();

        await setup({ images: singleImageData });

        expect(screen.getByRole('dialog')).not.toHaveClass('lg-show');
        expect(screen.getAllByAltText(/A cartoony shoe/i).length).toBe(1);

        await user.click(screen.getByAltText(/A cartoony shoe/i));

        expect(screen.getByRole('dialog')).toHaveClass('lg-show');
        expect(screen.getAllByAltText(/A cartoony shoe/i).length).toBe(2);
    });
});
