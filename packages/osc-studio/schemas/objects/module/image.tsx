import { ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { ColorPicker } from '../../../components/inputs/ColorPicker';

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
                    const isScaled = mode && mode[0] === 'c_scale';

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
        defineField({
            name: 'imageStyles',
            title: 'Image Styles',
            description: 'Apply some art directed styles to your image.',
            type: 'object',
            fields: [
                defineField({
                    name: 'grayscale',
                    title: 'Grayscale',
                    type: 'boolean',
                    initialValue: false,
                }),
                defineField({
                    name: 'opacity',
                    title: 'Opacity',
                    type: 'boolean',
                    initialValue: false,
                }),
                defineField({
                    name: 'overlayColor',
                    title: 'Overlay Color',
                    type: 'string',
                    components: {
                        input: ColorPicker,
                    },
                }),
            ],
            options: {
                columns: 2,
            },
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
