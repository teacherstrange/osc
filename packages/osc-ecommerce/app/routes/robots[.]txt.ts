import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request?.url);
    // The request on Fly seems to return http as the protocol so we're forcing it into https
    const protocol = url.protocol === 'http:' ? 'https:' : url.protocol;
    const host = url.host;

    // The alignment looks a bit funky as indenting it here causes the indentation to be included in the returned file.
    // Which makes the robots.txt invalid.
    const robots = `
User-agent: *

Sitemap: ${protocol}//${host}/sitemap.xml
    `.trim();

    return new Response(robots, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8'
        }
    });
};
