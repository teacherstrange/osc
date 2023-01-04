import React from 'react';
import { Image } from '../Image/Image';

import LightGallery from 'lightgallery/react';
import { useModifier } from '../../hooks/useModifier';
import { classNames } from '../../utils/classNames';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import './imageGallery.scss';

interface Images {
    src: string;
    alt: string;
    height: number;
    width: number;
}
export interface Props {
    className?: string;
    images: Images[];
    variant?: string;
}

export const ImageGallery = (props: Props) => {
    const { images, variant } = props;

    const variantClass = useModifier('c-image-gallery__img', variant);
    const imageClasses = classNames('c-image-gallery__img', variantClass);

    // More info can be found about this lightbox at www.lightgalleryjs.com
    // There are a variety of methods (e.g. onInit, onBeforeSlide), modes and plugins that can be
    // utilised if required. All documentation is available on the website.
    return (
        <LightGallery plugins={[lgThumbnail, lgZoom]} elementClassNames="c-image-gallery">
            {images.map((image, index) => {
                return (
                    <a
                        key={index}
                        href={image.src}
                        data-sub-html={image.alt}
                        className={imageClasses}
                    >
                        <Image
                            alt={image.alt}
                            height={image.height}
                            src={image.src}
                            width={image.width}
                        />
                    </a>
                );
            })}
        </LightGallery>
    );
};
