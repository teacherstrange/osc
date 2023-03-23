import { ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'image.mobile',
    title: 'Mobile Image',
    type: 'object',
    icon: ImageIcon,
    fields: [
        // Image
        defineField({
            type: 'cloudinary.asset',
            name: 'image',
            description: 'This asset is served from Cloudinary',
        }),
    ],
    preview: {
        select: {
            imageName: 'image.public_id',
            imageUrl: 'image.secure_url',
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
