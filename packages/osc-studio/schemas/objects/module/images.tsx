import { ImageIcon } from '@sanity/icons';
import React from 'react';

export default {
    name: 'module.images',
    title: 'Image',
    type: 'object',
    icon: ImageIcon,
    fields: [
        // Modules (Images)
        {
            name: 'image',
            title: 'Image',
            type: 'image.desktop'
        }
    ],
    preview: {
        select: {
            imageName: 'image.alt',
            imageUrl: 'image.image.secure_url'
        },
        prepare(selection) {
            const { imageUrl, imageName } = selection;

            return {
                media: <img src={imageUrl} alt={imageName} />,
                title: imageName,
                subtitle: 'Images'
            };
        }
    }
};
