import type { HeadersFunction, LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLocation,
    useMatches,
} from '@remix-run/react';
import { SkipLink } from 'osc-ui';
import spritesheet from 'osc-ui/dist/spritesheet.svg';
import oscUiSkipLinkStyle from 'osc-ui/dist/src-components-SkipLink-skip-link.css';
import oscUiSwitchStyles from 'osc-ui/dist/src-components-Switch-switch.css';
import styles from 'osc-ui/dist/src-styles-main.css';
import React, { useEffect } from 'react';
import { checkConnectivity } from '~/utils/client/pwa-utils.client';
import { getColorScheme } from './utils/colorScheme';

let isMount = true;
export const links: LinksFunction = () => {
    return [
        // Preload the spritesheet to avoid a flash of unstyled content
        {
            rel: 'preload',
            href: spritesheet,
            as: 'image',
        },
        { rel: 'stylesheet', href: styles },
        { rel: 'stylesheet', href: oscUiSwitchStyles },
        { rel: 'stylesheet', href: oscUiSkipLinkStyle },
        { rel: 'manifest', href: '/resources/manifest.webmanifest' },
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/icons/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/icons/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/icons/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/icons/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/icons/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/icons/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/icons/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/icons/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-icon-180x180.png' },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '192x192',
            href: '/icons/android-icon-192x192.png',
        },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
    ];
};

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'OSC Academic Hub',
    viewport: 'width=device-width,initial-scale=1',
});

type LoaderData = {
    // user: Awaited<ReturnType<typeof getUser>>;
    colorScheme: string;
};

export const headers: HeadersFunction = () => ({
    'Accept-CH': 'Sec-CH-Prefers-Color-Scheme',
});

export const loader: LoaderFunction = async ({ request }) => {
    return json<LoaderData>({
        // user: await getUser(request),
        colorScheme: await getColorScheme(request),
    });
};

interface DocumentProps {
    children: React.ReactNode;
}

const Document = ({ children }: DocumentProps) => {
    return (
        <html lang="en">
            <head>
                {typeof document === 'undefined' && <Meta />}
                {typeof document === 'undefined' && <Links />}
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
};

export default function App() {
    let location = useLocation();
    let matches = useMatches();

    const online = () => {
        //..Do something for online state
    };

    const offline = () => {
        //..Do something for offline state
    };

    useEffect(() => {
        // The `console.log` method returns an object with a status of "success" if online and a pass message or a status of "bad" and a fail message if offline
        checkConnectivity(online, offline).then((data) => console.log(data));
    }, []);

    React.useEffect(() => {
        let mounted = isMount;
        isMount = false;
        if ('serviceWorker' in navigator) {
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller?.postMessage({
                    type: 'REMIX_NAVIGATION',
                    isMount: mounted,
                    location,
                    matches,
                    manifest: window.__remixManifest,
                });
            } else {
                let listener = async () => {
                    await navigator.serviceWorker.ready;
                    navigator.serviceWorker.controller?.postMessage({
                        type: 'REMIX_NAVIGATION',
                        isMount: mounted,
                        location,
                        matches,
                        manifest: window.__remixManifest,
                    });
                };
                navigator.serviceWorker.addEventListener('controllerchange', listener);
                return () => {
                    navigator.serviceWorker.removeEventListener('controllerchange', listener);
                };
            }
        }
    }, [location, matches]);

    return (
        <Document>
            <SkipLink anchor="main-content">Skip to main content</SkipLink>
            <main id="main-content" tabIndex={-1}>
                <Outlet />
            </main>
        </Document>
    );
}
