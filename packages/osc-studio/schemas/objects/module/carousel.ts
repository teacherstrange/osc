import { StarIcon } from '@sanity/icons';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

// TODO: ak - to add fields in when creating modules, modules are shown on pages, they are spit out in order
export default {
    name: 'module.carousel',
    title: 'Carousel',
    type: 'object',
    icon: StarIcon,
    groups: [
        {
            name: 'carousel',
            title: 'Carousel Properties'
        },
        {
            name: 'slide',
            title: 'Slide Properties'
        }
    ],
    fields: [
        {
            title: 'Active',
            name: 'active',
            type: 'boolean',
            description: 'Whether or not the Carousel is active',
            group: 'carousel'
        },
        {
            title: 'Loop',
            name: 'loop',
            type: 'boolean',
            description: 'Whether the Carousel should loop when it reaches the last slide',
            group: 'carousel'
        },
        {
            group: 'carousel',
            title: 'Height',
            name: 'height',
            type: 'number',
            validation: (Rule) =>
                Rule.min(200)
                    .max(3000)
                    .custom((height, context) => {
                        if (context.parent.axis === 'y' && !height) return 'Height is required';
                        return true;
                    }),
            description:
                'The height of the images carosuel, leave this blank to use the Autoheight feature. The autoheight feature changes the height of the carousel container to fit the height of the highest slide in view. Please note, if the carousel axis is set to vertical, the height must be set.'
        },
        {
            group: 'carousel',
            title: 'Axis',
            name: 'axis',
            type: 'string',
            options: {
                layout: 'radio',
                list: [
                    { title: 'Horizontal', value: 'x' },
                    { title: 'Vertical', value: 'y' }
                ]
            },
            description: 'Whether the Carousel should scroll horizontally or vertically'
        },
        {
            group: 'slide',
            title: 'Images',
            name: 'mediaArray',
            type: 'array',
            of: [{ type: 'module.images' }],
            description: 'The images and text within the Carousel'
        },
        {
            group: 'slide',
            title: 'Starting slide',
            name: 'startIndex',
            type: 'number',
            description: 'The image the Carousel will start at when the page loads',
            validation: (Rule) =>
                Rule.min(1).custom((startIndex, context) => {
                    console.log(context);
                    if (startIndex - 1 >= context.parent.mediaArray.length)
                        return 'Starting item must be less than or equal to the number of slides';
                    return true;
                })
        },
        // TODO: ak- add range slider
        {
            group: 'carousel',
            title: 'Delay',
            name: 'delay',
            type: 'string',
            validation: (Rule) => Rule.min(0).max(10000),
            description:
                'Assigning a value to this field will cause the Carousel to automatically play when the page loads, a value of 0 means that the Carousel will not be played automatically',
            options: {
                layout: 'radio',
                list: ['0', '2000', '4000', '8000', '10000']
            }
        },
        {
            group: 'carousel',
            title: 'Slides Per Page',
            name: 'slidesPerPage',
            type: 'number',
            validation: (Rule) => Rule.min(1).max(5),
            description: 'The number of images to show per Carousel slide'
        },
        {
            group: 'slide',
            title: 'Slide Gap',
            name: 'slideGap',
            type: 'number',
            validation: (Rule) => Rule.min(0).max(20),
            description: 'The margin of each image inside a slide'
        }
    ],
    preview: {
        select: {
            subtitle: 'type'
        },
        prepare(selection: Record<string, any>) {
            return {
                title: 'Carousel',
                subtitle: capitalizeFirstLetter(selection.subtitle)
            };
        }
    }
};
