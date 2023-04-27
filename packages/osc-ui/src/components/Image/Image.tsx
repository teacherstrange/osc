import type { ImgHTMLAttributes } from 'react';
import React from 'react';
import { classNames } from '../../utils/classNames';
import {
    addAutoTransformations,
    buildCloudinaryUrl,
    buildSources,
    buildSrcSets,
    CONSTANTS,
    getTransformationString,
    replaceSizeTransformation,
} from './utils';

// We want to overwrite some types that have an overlap with the ImgHTMLAttributes type
// To do this we need to extend that into extend the ImageData from ImgHTMLAttributes
// Then extend out props from that. AFAIK this is the only way to do this without getting an overlap type error.
interface ImageData<T> extends ImgHTMLAttributes<T> {
    _key?: string;
    _type?: string;
    height: number;
    src: string;
    width: number;
}

export interface Props<T> extends ImageData<T> {
    alt: string;
    artDirectedImages?: ImageData<T>[];
    className?: string;
    loading?: 'eager' | 'lazy';
    responsiveWidths?: number[];
    sizes?: string | undefined;
    overlayColor?: string;
    isGrayScale?: boolean;
    hasTransparency?: boolean;
    fit?: 'cover' | 'contain';
}

export const Image = (props: Props<HTMLImageElement>) => {
    const {
        alt,
        artDirectedImages,
        className,
        src,
        height,
        loading = 'lazy',
        responsiveWidths = [640, 768, 1024, 1366, 1600, 1920],
        sizes,
        width,
        overlayColor,
        isGrayScale = false,
        hasTransparency = false,
        fit = 'contain',
        ...attr
    } = props;

    if (!src) {
        console.warn('No `src` provided to `Image`!');
        return null;
    }

    const transformationString = getTransformationString(src);

    // Append our custom width and heights to our transformation part of the url
    let alteredTransformationString: string = transformationString;
    if (transformationString) {
        alteredTransformationString = replaceSizeTransformation(alteredTransformationString, width);
        alteredTransformationString = addAutoTransformations(alteredTransformationString, [
            CONSTANTS.F_AUTO,
            CONSTANTS.Q_AUTO,
        ]);
    } else {
        // If there are no transformations then we want to set some defaults
        alteredTransformationString = `${CONSTANTS.F_AUTO},${CONSTANTS.Q_AUTO},w_${width},h_${height}`;
    }

    let alteredTransformationStringMask: string = transformationString;
    if (transformationString && overlayColor) {
        alteredTransformationStringMask = replaceSizeTransformation(
            alteredTransformationStringMask,
            width
        );
        alteredTransformationStringMask = addAutoTransformations(alteredTransformationStringMask, [
            CONSTANTS.F_AUTO,
            CONSTANTS.Q_S,
        ]);
    } else {
        alteredTransformationStringMask = `${CONSTANTS.F_AUTO},${CONSTANTS.Q_S},w_${width},h_${height}`;
    }

    const cloudinarySrc = buildCloudinaryUrl(src, alteredTransformationString);
    const srcsets = buildSrcSets(src, alteredTransformationString, responsiveWidths);
    // Generate a tiny image we can use as a mask.
    // As we need to load two images if we are applying a css transform we are making the quality as low as possible to reduce the size of the second image.
    const maskSrc = buildCloudinaryUrl(src, alteredTransformationStringMask);

    const maskClasses = classNames(
        'o-img',
        overlayColor ? `o-img--bg u-bg-color-${overlayColor}` : '',
        hasTransparency ? 'o-img--opacity' : ''
    );
    const imgClasses = classNames(
        'o-img__img',
        isGrayScale ? 'o-img__img--grayscale' : '',
        overlayColor ? 'o-img__img--overlay' : '',
        `o-img__img--${fit}`,
        className ? className : ''
    );

    // Set default image
    let image = (
        <div
            className={maskClasses}
            style={{
                mask: overlayColor ? `url(${maskSrc}) no-repeat center / ${fit}` : '',
                WebkitMask: overlayColor ? `url(${maskSrc}) no-repeat center / ${fit}` : '',
            }}
        >
            <img
                src={cloudinarySrc}
                srcSet={srcsets}
                sizes={sizes}
                alt={alt ? alt : ''}
                width={width}
                height={height}
                loading={loading}
                className={imgClasses}
                {...attr}
            />
        </div>
    );

    // Create a <picture> alternative if art directed images have been set
    // We want to give editor full control over the image so we won't make any transformations
    // (except for quality and format) or add a srcset if this is true
    if (artDirectedImages && artDirectedImages.length > 0) {
        const sources = buildSources(src, artDirectedImages);

        image = (
            <picture
                className={maskClasses}
                style={{
                    mask: overlayColor ? `url(${maskSrc}) no-repeat center / contain` : '',
                    WebkitMask: overlayColor ? `url(${maskSrc}) no-repeat center / contain` : '',
                }}
            >
                {sources}
                <img
                    src={cloudinarySrc}
                    alt={alt ? alt : ''}
                    width={width}
                    height={height}
                    loading={loading}
                    className={imgClasses}
                    {...attr}
                />
            </picture>
        );
    }

    return <>{image}</>;
};
