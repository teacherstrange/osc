import React from 'react';

export default {
    name: 'contentMediaImage',
    title: 'Content Media Image',
    type: 'object',
    fields: [
        {
            name: 'imageFit',
            title: 'Image Fit',
            type: 'string',
            initialValue: 'contain',
            options: {
                list: ['contain', 'cover'],
                layout: 'radio',
                direction: 'horizontal',
            },
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image.desktop',
        },
    ],
    preview: {
        select: {
            imageName: 'image.image.public_id',
            imageUrl: 'image.image.secure_url',
        },
        prepare(selection) {
            const { imageUrl, imageName } = selection;
            console.log(selection);

            return {
                media: <img src={imageUrl} alt={imageName} />,
                title: imageName,
                subtitle: 'Images',
            };
        },
    },
};
