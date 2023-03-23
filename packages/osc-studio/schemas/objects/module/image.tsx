import { ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'image.desktop',
    title: 'Image',
    type: 'object',
    icon: ImageIcon,
    fields: [
        // Image
        defineField({
            type: 'cloudinary.asset',
            name: 'image',
            description: 'This asset is served from Cloudinary',
        }),
        defineField({
            name: 'responsiveImages',
            title: 'Responsive Images',
            description:
                "We can see you're using a mode transformation, you might want to consider adding a responsive version of the image.",
            type: 'array',
            of: [{ type: 'image.mobile' }, { type: 'image.tablet' }],
            hidden: ({ parent }) => {
                if (parent?.image?.derived) {
                    const modeRegex = /c_\w+/;
                    const mode = modeRegex.exec(parent?.image?.derived[0]?.raw_transformation);
                    const isScaled = mode[0] === 'c_scale';

                    if (!isScaled) {
                        return false;
                    }
                }

                return true;
            },
        }),
        // Alt Text
        defineField({
            name: 'alt',
            title: 'Alt text',
            type: 'string',
            validation: (Rule) => Rule.required(),
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
