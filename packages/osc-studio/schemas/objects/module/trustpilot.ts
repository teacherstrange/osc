import { StarIcon } from '@sanity/icons';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

export default {
    name: 'module.trustpilot',
    title: 'Trustpilot',
    type: 'object',
    icon: StarIcon,
    fields: [
        {
            name: 'type',
            title: 'Type',
            type: 'string',
            initialValue: 'slider',
            options: {
                list: [
                    { title: 'Slider', value: 'slider' },
                    { title: 'Grid', value: 'grid' },
                    { title: 'Mini Carousel', value: 'minicarousel' },
                    { title: 'Micro Star', value: 'microstar' }
                ]
            },
            validation: (Rule) => Rule.required()
        },
        {
            name: 'stars',
            title: 'Stars',
            type: 'string',
            initialValue: '4,5',
            validation: (Rule) => Rule.required()
        },
        {
            name: 'height',
            title: 'Height',
            type: 'string',
            initialValue: '240px',
            description: 'Enter a number with a value `px`. E.g. `240px`',
            validation: (Rule) =>
                Rule.required().custom((height, context) => {
                    const { type } = context?.parent;
                    const digitRegex = /(\d+)/g;
                    const digitPxRegex = /(\d+px+)/g;
                    const heightNumber = Number(digitRegex.exec(height)[0]);
                    const endsInPx = digitPxRegex.test(height);

                    if (!endsInPx) {
                        return 'Must be a number ending with `px`';
                    }

                    if (type === 'slider' && heightNumber < 240) {
                        return 'The height is too small which will cause the slider to get cut off';
                    }

                    if (type === 'grid' && heightNumber < 400) {
                        return 'The height is too small which will cause the grid to get cut off';
                    }

                    if (type === 'minicarousel' && heightNumber < 350) {
                        return 'The height is too small which will cause the mini carousel to get cut off';
                    }

                    if (type === 'microstar' && heightNumber < 24) {
                        return 'The height is too small which will cause the micro star to get cut off';
                    }

                    return true;
                })
        }
    ],
    preview: {
        select: {
            subtitle: 'type'
        },
        prepare(selection: Record<string, any>) {
            return {
                title: 'Trustpilot',
                subtitle: capitalizeFirstLetter(selection.subtitle)
            };
        }
    }
};
