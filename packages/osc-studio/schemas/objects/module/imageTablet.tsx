import { ImageIcon } from '@sanity/icons';
import React from 'react';

export default {
    name: 'image.tablet',
    title: 'Tablet Image',
    type: 'object',
    icon: ImageIcon,
    fields: [
        // Image
        {
            type: 'cloudinary.asset',
            name: 'image',
            description: 'This asset is served from Cloudinary'
        }
    ],
    preview: {
        select: {
            imageName: 'image.public_id',
            imageUrl: 'image.secure_url'
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
