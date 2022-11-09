import React from 'react';
import type { Props as ImageProps } from './Image';

export const CONSTANTS = {
    MAX_MOBILE_WIDTH: '425px',
    MAX_TABLET_WIDTH: '834px',
    MAX_IMG_WIDTH: 1600,
    F_AUTO: 'f_auto',
    Q_AUTO: 'q_auto'
};

export const getTransformationString = (cloudinaryUrl: string) => {
    // https://cloudinary.com/documentation/image_transformations#transformation_url_structure
    // Cloudinary URL structure: https://res.cloudinary.com/<cloud_name>/<asset_type>/<delivery_type>/<transformations>/<version>/<public_id>.<extension>
    const parts = cloudinaryUrl.split('/');
    // An array of likey dlivery types we will encounter, "upload" is probably the most likey in this case
    // but just to be safe I've included these other options
    const deliveryTypes = ['upload', 'private', 'authenticated', 'fetch', 'multi', 'text'];
    const includedDeliveryType = parts.filter((deliveryType) =>
        deliveryTypes.includes(deliveryType)
    )[0];
    const deliveryTypeIndex = parts.indexOf(includedDeliveryType);

    const vRegex = /v+\d+/; // matches v{n}
    const version = vRegex.exec(cloudinaryUrl)[0];
    const versionIndex = parts.indexOf(version);

    const transformationString = parts.slice(deliveryTypeIndex + 1, versionIndex).join('/'); // join any chained transformations back together

    return transformationString;
};

export const buildCloudinaryUrl = (src: string, transformationString: string) => {
    const originalTransformationString = getTransformationString(src);
    let alteredSrc: string;

    if (originalTransformationString) {
        alteredSrc = src.replace(originalTransformationString, transformationString);
    } else {
        const parts = src.split('/');
        // Insert the transformation string after the delivery type
        // We can safely assume the index will be 6 as the cloudinary url always has the same shape
        parts.splice(6, 0, transformationString);
        alteredSrc = parts.join('/');
    }

    return alteredSrc;
};

export const replaceTransformation = ({
    regex,
    target,
    transformationString
}: {
    regex: RegExp;
    target: string;
    transformationString: string;
}) => transformationString.replace(regex, target);

const addTransformation = (transformationString: string, target: string) => {
    let alteredTransformation: string | string[] = transformationString;

    alteredTransformation = alteredTransformation.split(',');

    alteredTransformation.push(target);

    alteredTransformation = alteredTransformation.join(',');

    return alteredTransformation;
};

export const replaceSizeTransformation = (transformationString: string, width: number) => {
    const widthRegex = /w_+\d+/g; // matches any instance of `w_{n}`
    const hasWidth = widthRegex.exec(transformationString);

    let alteredTransformation: string | string[] = transformationString;

    const w = hasWidth ? hasWidth[0].split('_') : null; // This is a transitory value will return an array like this ['w', '{n}']
    const wValue = hasWidth ? Number(w[w.length - 1]) : null;

    // Replace or add width
    // if w_ has been set we don't want to replace the width unless it is greater than 1600
    if (hasWidth) {
        if (wValue > CONSTANTS.MAX_IMG_WIDTH) {
            alteredTransformation = replaceTransformation({
                regex: widthRegex,
                transformationString: alteredTransformation,
                target: `w_${width}`
            });
        }
    } else {
        alteredTransformation = addTransformation(alteredTransformation, `w_${width}`);
    }

    return alteredTransformation;
};

export const addAutoTransformations = (transformationString: string, targets: string[]) => {
    let alteredTransformation: string | string[] = transformationString;

    for (const target of targets) {
        const hasTransform = transformationString.includes(target);

        if (!hasTransform) {
            alteredTransformation = addTransformation(alteredTransformation, target);
        }
    }

    return alteredTransformation;
};

export const buildSrcSets = (
    src: string,
    alteredTransformationString: string,
    responsiveWidths: ImageProps<HTMLImageElement>['responsiveWidths']
) => {
    const transformations = getTransformationString(src);

    const srcsets = responsiveWidths
        .map((size) => {
            if (transformations) {
                // We can assume that a width will always be present
                // If not then the original string will be returned and nothing will happen
                const widthRegex = /w_+\d+/g; // matches any instance of `w_{n}`

                alteredTransformationString = replaceTransformation({
                    transformationString: alteredTransformationString,
                    regex: widthRegex,
                    target: `w_${size}`
                });
            } else {
                alteredTransformationString = `${CONSTANTS.F_AUTO},${CONSTANTS.Q_AUTO},w_${size}`;
            }

            const url = buildCloudinaryUrl(src, alteredTransformationString);

            const srcSetValue = `${url} ${size}w`;

            return srcSetValue;
        })
        .join(', ');

    return srcsets;
};

export const buildSources = (
    src: string,
    artDirectedImages: ImageProps<HTMLImageElement>['artDirectedImages']
) => {
    const sources = artDirectedImages.map((artDirectedImage) => {
        let responsiveImageSrc = artDirectedImage.src;
        let mediaQuery: string;

        const transformations = getTransformationString(responsiveImageSrc);
        if (transformations) {
            let alteredTransformationString = transformations;

            alteredTransformationString = addAutoTransformations(alteredTransformationString, [
                CONSTANTS.F_AUTO,
                CONSTANTS.Q_AUTO
            ]);

            responsiveImageSrc = buildCloudinaryUrl(src, alteredTransformationString);
        }

        if (artDirectedImage._type === 'image.mobile') {
            mediaQuery = `(max-width: ${CONSTANTS.MAX_MOBILE_WIDTH})`;
        } else if (artDirectedImage._type === 'image.tablet') {
            mediaQuery = `(max-width: ${CONSTANTS.MAX_TABLET_WIDTH})`;
        }

        return (
            <source key={artDirectedImage._key} srcSet={responsiveImageSrc} media={mediaQuery} />
        );
    });

    return sources;
};
