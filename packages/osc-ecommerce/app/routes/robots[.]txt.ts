import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request?.url);
    // The request on Fly seems to return http as the protocol so we're forcing it into https
    const protocol = url.protocol === 'http:' ? 'https:' : url.protocol;
    const host = url.host;

    // The alignment looks a bit funky as indenting it here causes the indentation to be included in the returned file.
    // Which makes the robots.txt invalid.
    // TODO: Update admin to studio or whatever once Sanity lives as a sub directory.
    const robots = `
User-agent: *
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /carts
Disallow: /account
Sitemap: ${protocol}//${host}/sitemap.xml

# Google adsbot ignores robots.txt unless specifically named!
User-agent: adsbot-google
Disallow: /checkouts/
Disallow: /checkout
Disallow: /carts
Disallow: /orders

User-agent: Pinterest
Crawl-delay: 1
    `.trim();

    return new Response(robots, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};
