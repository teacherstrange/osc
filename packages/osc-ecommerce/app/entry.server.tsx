// entry.server.tsx
import type { EntryContext } from '@remix-run/node'; // Depends on the runtime you choose
import { RemixServer } from '@remix-run/react';
import 'dotenv/config';
import { renderToString } from 'react-dom/server';

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    const markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

    responseHeaders.set('Content-Type', 'text/html');

    // We're using the SEO Pane plugin in our Sanity studio to generate Yoast like feedback for the editors.
    // Sanity needs to fetch the site so the plugin can check it for settings like canonical tags, title etc.
    // To do this we need to set the Access-Control-Allow-Origin response header to the url of the studio so we don't get blocked by CORS.
    // See the "Fetching the front-end" section: https://www.sanity.io/plugins/seo-pane

    // Make sure we're setting the correct corsOrigin url depending if we're on developement, viewing a pr url or main
    const requestUrl = new URL(request?.url);
    const prefixRegex = /((pr-)\d+)/g; // This bit of regex finds any text that matches "pr-<n>" e.g. pr-123

    let deployedUrl;

    if (requestUrl.hostname.match(prefixRegex)) {
        const urlPrefix = requestUrl.hostname.match(prefixRegex)?.join('');

        deployedUrl = `https://${urlPrefix}-osc-studio.fly.dev`;
    } else {
        deployedUrl = `https://osc-studio.fly.dev`;
    }

    const corsOrigin =
        process.env.NODE_ENV === 'development' ? `http://localhost:3333` : deployedUrl;

    responseHeaders.set('Access-Control-Allow-Origin', corsOrigin);

    return new Response(`<!DOCTYPE html>${markup}`, {
        status: responseStatusCode,
        headers: responseHeaders
    });
}
