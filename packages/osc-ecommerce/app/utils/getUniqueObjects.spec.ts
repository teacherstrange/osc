import { getUniqueObjects } from './getUniqueObjects';

test('removes duplicate objects from the array', () => {
    const stylesheets = [
        { rel: 'stylesheet', href: 'accordionStyles' },
        { rel: 'stylesheet', href: 'contentStyles' },
        { rel: 'stylesheet', href: 'cardStyles' },
        { rel: 'stylesheet', href: 'carouselStyles' },
        { rel: 'stylesheet', href: 'popoverStyles' },
        { rel: 'stylesheet', href: 'islandGrid' },
        { rel: 'stylesheet', href: 'contentStyles' },
        { rel: 'stylesheet', href: 'buttonStyles' },
        { rel: 'stylesheet', href: 'heroStyles' },
        { rel: 'stylesheet', href: 'carouselStyles' },
        { rel: 'stylesheet', href: 'contentStyles' },
        { rel: 'stylesheet', href: 'buttonStyles' },
    ];

    const uniqueStyleSheets = getUniqueObjects(stylesheets, 'href');

    expect(uniqueStyleSheets).toHaveLength(8);

    expect(uniqueStyleSheets).toEqual(
        expect.arrayContaining([expect.objectContaining({ href: expect.any(String) })])
    );
});
