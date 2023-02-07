// entry.server.tsx
import type { EntryContext } from '@remix-run/node'; // Depends on the runtime you choose
import { RemixServer } from '@remix-run/react';
import 'dotenv/config';
import { SpritesheetProvider } from 'osc-ui';
import spritesheet from 'osc-ui/dist/spritesheet.svg';
import { renderToString } from 'react-dom/server';

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    const markup = renderToString(
        <SpritesheetProvider
            value={{
                spriteSheetPath: spritesheet,
            }}
        >
            <RemixServer context={remixContext} url={request.url} />
        </SpritesheetProvider>
    );

    responseHeaders.set('Content-Type', 'text/html');

    return new Response(`<!DOCTYPE html>${markup}`, {
        status: responseStatusCode,
        headers: responseHeaders,
    });
}
