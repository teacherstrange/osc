import { ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'module.images',
    title: 'Image',
    type: 'object',
    icon: ImageIcon,
    fields: [
        // Modules (Images)
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image.desktop',
        }),
    ],
    preview: {
        select: {
            imageName: 'image.alt',
            imageUrl: 'image.image.secure_url',
        },
        prepare(selection) {
            const { imageUrl, imageName } = selection;

            return {
                media: <img src={imageUrl} alt={imageName} />,
                title: imageName,
                subtitle: 'Images',
            };
        },
    },
});
