import type { LoaderFunction } from '@remix-run/node';
import { getClient } from '~/lib/sanity/getClient.server';
import { buildUrlPath, excludeDrafts } from '~/models/sanity.server';
import { ALL_PAGE_SLUGS } from '~/queries/sanity/allPageSlugs';

interface SanityEntry {
    _id: string;
    _type: string;
    _updatedAt: string;
    slug: string;
}

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request?.url);
    // Query all of the documents in Sanity that have a slug (indicating that it is a page)
    const querySanityDataset: SanityEntry[] = await getClient()
        .fetch(ALL_PAGE_SLUGS)
        .catch((error) => {
            throw new Response(error, {
                status: 500
            });
        });

    // Template out the markup for each individual entry
    const sitemapEntry = (path: SanityEntry['slug'], lastmod: SanityEntry['_updatedAt']) => {
        return `
            <url>
                <loc>${url.origin}${path}</loc>
                <lastmod>${lastmod}</lastmod>
            </url>
        `.trim();
    };

    const filterMapEntries = querySanityDataset
        .filter((entry: SanityEntry) => excludeDrafts(entry))
        .map((entry: SanityEntry) => {
            const path = buildUrlPath({
                type: entry._type,
                url,
                slug: entry.slug
            });

            return sitemapEntry(path, entry._updatedAt);
        })
        .join('');

    // Template out the markup for the doctype and urlset
    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${filterMapEntries}
        </urlset>
    `.trim();

    return new Response(sitemap, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml'
        }
    });
};
