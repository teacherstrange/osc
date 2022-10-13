import { LinkIcon } from '@sanity/icons';
import { PAGE_REFERENCES } from '../../../constants';
import { getPriceRange } from '../../../utils/getPriceRange';

export default {
    title: 'Internal Link',
    name: 'linkInternal',
    type: 'object',
    icon: LinkIcon,
    fields: [
        // Title
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: (Rule) => Rule.required()
        },
        // Reference
        {
            name: 'reference',
            type: 'reference',
            weak: true,
            validation: (Rule) => Rule.required(),
            to: PAGE_REFERENCES
        }
    ],
    preview: {
        select: {
            reference: 'reference',
            referenceProductTitle: 'reference.store.title',
            referenceProductPriceRange: 'reference.store.priceRange',
            referenceTitle: 'reference.title',
            referenceType: 'reference._type',
            title: 'title'
        },
        prepare(selection) {
            const {
                reference,
                referenceProductPriceRange,
                referenceProductTitle,
                referenceTitle,
                referenceType,
                title
            } = selection;

            let subtitle = [];
            if (reference) {
                // @ts-ignore -- expect string to be assigned
                subtitle.push([`→ ${referenceTitle || referenceProductTitle || reference?._id}`]);
                if (referenceType === 'product' && referenceProductPriceRange) {
                    // @ts-ignore -- expect string to be assigned
                    subtitle.push(`(${getPriceRange(referenceProductPriceRange)})`);
                }
            } else {
                // @ts-ignore -- expect string to be assigned
                subtitle.push('(Nonexistent document reference)');
            }

            return {
                // media: image,
                subtitle: subtitle.join(' '),
                title
            };
        }
    }
};
