import { createSanityProductID, extractIdFromGid, stripMarks } from './storefront.helpers';

describe('extractIdFromGid', () => {
    test('should return the id number from the Shopify id', () => {
        expect(extractIdFromGid('gid://shopify/Product/12345')).toBe('12345');
    });
});

describe('createSanityProductID', () => {
    test('should return a Sanity product ID from a Shopify ID', () => {
        expect(createSanityProductID('12345')).toBe('shopifyProduct-12345');
    });
});

describe('stripMarks', () => {
    test("should empty the marks array from a PortableTextBlock's children", () => {
        const portableText = {
            style: 'normal',
            _key: 'd08a7bf98cdc',
            markDefs: [],
            children: [
                {
                    text: 'Stand out from the crowd and develop your accounting career with this AAT Level 2 and 3 Accounting course.',
                    _key: 'f07f4157d0880',
                    _type: 'span',
                    marks: ['span t-font-l'],
                },
            ],
            _type: 'block',
        };

        expect(stripMarks(portableText).children[0].marks).toHaveLength(0);
    });
});
