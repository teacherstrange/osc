import React, { useEffect } from 'react';
import { useLocation, useMatches } from '@remix-run/react';
import type { HeadersFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getColorScheme } from './cookie';
import lightTheme from './theme/lightTheme';
import darkTheme from './theme/darkTheme';
import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { ChakraProvider } from '@chakra-ui/react';
import { withEmotionCache } from '@emotion/react';
import type { EmotionCache } from '@emotion/react';
import { useEmotionCache } from './hooks/useEmotionCache';
import DOMPurify from 'isomorphic-dompurify';
import styles from 'app/styles/dest/main.css';
import { getUser } from './session.server';
import { checkConnectivity } from '~/utils/client/pwa-utils.client';
import { PushNotification } from '~/utils/server/pwa-utils.server';
import * as gtag from '~/utils/gtags.client';

import tailwindStylesheetUrl from './styles/tailwind.css';

let isMount = true;
export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: styles },
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
            href: '/icons/android-icon-192x192.png'
        },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' }
    ];
};
export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Remix Notes',
    viewport: 'width=device-width,initial-scale=1'
});
type LoaderData = {
    user: Awaited<ReturnType<typeof getUser>>;
    colorScheme: string;
    gaTrackingId: string | undefined;
    googleTagManagerId: string | undefined;
};
export const headers: HeadersFunction = () => ({
    'Accept-CH': 'Sec-CH-Prefers-Color-Scheme'
});
export const loader: LoaderFunction = async ({ request }) => {
    await PushNotification(
        {
            title: 'Remix PWA',
            body: 'A server generated text body.'
        },
        1
    );

    return json<LoaderData>({
        user: await getUser(request),
        colorScheme: await getColorScheme(request),
        gaTrackingId:
            process.env.NODE_ENV === 'development' ? process.env.GA_TRACKING_ID : undefined,
        googleTagManagerId:
            process.env.NODE_ENV === 'development' ? process.env.GTM_TRACKING_ID : undefined
    });
};
interface DocumentProps {
    children: React.ReactNode;
}

const Document = withEmotionCache(({ children }: DocumentProps, emotionCache: EmotionCache) => {
    const serverStyleData = useEmotionCache(emotionCache);
    let location = useLocation();
    let matches = useMatches();

    useEffect(() => {
        let mounted = isMount;
        isMount = false;
        if ('serviceWorker' in navigator) {
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller?.postMessage({
                    type: 'REMIX_NAVIGATION',
                    isMount: mounted,
                    location,
                    matches,
                    manifest: window.__remixManifest
                });
            } else {
                let listener = async () => {
                    await navigator.serviceWorker.ready;
                    navigator.serviceWorker.controller?.postMessage({
                        type: 'REMIX_NAVIGATION',
                        isMount: mounted,
                        location,
                        matches,
                        manifest: window.__remixManifest
                    });
                };
                navigator.serviceWorker.addEventListener('controllerchange', listener);
                return () => {
                    navigator.serviceWorker.removeEventListener('controllerchange', listener);
                };
            }
        }
    }, [location, matches]);
    
    const { gaTrackingId, googleTagManagerId } = useLoaderData<LoaderData>();

    useEffect(() => {
        if (gaTrackingId?.length) {
            gtag.pageview(location.pathname, gaTrackingId);
        }
    }, [location, gaTrackingId]);
    return (
        <html lang="en" className="h-full">
            <head>
                <Links />
                <Meta />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${googleTagManagerId}');`
                    }}
                ></script>
                {serverStyleData.map(({ key, ids, css }) => (
                    <style
                        key={key}
                        data-emotion={`${key} ${ids.join(' ')}`}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(css) }}
                    />
                ))}
            </head>
            <body>
                <noscript>
                    <iframe
                        title="gtm"
                        src="https://www.googletagmanager.com/ns.html?id=GTM-TGRN9Z6"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>
                {process.env.NODE_ENV === 'development' || !gaTrackingId ? null : (
                    <>
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
                        />
                        <script
                            async
                            id="gtag-init"
                            dangerouslySetInnerHTML={{
                                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `
                            }}
                        />
                    </>
                )}
                {children}
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
});

export default function App() {
    const { colorScheme } = useLoaderData();

    const online = () => {
        //..Do something for online state
        console.log('Online');
    };

    const offline = () => {
        //..Do something for offline state
    };

    useEffect(() => {
        // The `console.log` method returns an object with a status of "success" if online and a pass message or a status of "bad" and a fail message if offline
        checkConnectivity(online, offline).then((data) => console.log(data));
    }, []);
    return (
        <Document>
            <ChakraProvider theme={colorScheme === 'light' ? lightTheme : darkTheme}>
                <Outlet />
            </ChakraProvider>
        </Document>
    );
}
