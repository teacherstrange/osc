import { ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'module.images',
    title: 'Image',
    type: 'object',
    icon: ImageIcon,
    groups: [
        {
            name: 'row',
            title: 'Row',
        },
        {
            name: 'image',
            title: 'Image',
            default: true,
        },
    ],
    fields: [
        defineField({
            name: 'rowSettings',
            title: 'Settings',
            type: 'rowSettings',
            group: 'row',
        }),
        // Modules (Images)
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image.desktop',
            group: 'image',
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
