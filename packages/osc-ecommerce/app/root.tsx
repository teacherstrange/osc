import type { HeadersFunction, LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useLocation,
    useMatches
} from '@remix-run/react';
import oscUiCarouselStyles from 'osc-ui/dist/src-components-Carousel-carousel.css';
import oscUiSwitchStyles from 'osc-ui/dist/src-components-Switch-switch.css';
import styles from 'osc-ui/dist/src-styles-main.css';
import React, { useEffect } from 'react';
import { DynamicLinks } from 'remix-utils';
import { checkConnectivity } from '~/utils/client/pwa-utils.client';
import { getSettingsData } from './models/sanity.server';
import { SETTINGS_QUERY } from './queries/sanity/settings';
import { getUser } from './session.server';
import { getColorScheme } from './utils/colorScheme';

let isMount = true;
export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: oscUiCarouselStyles },
        { rel: 'stylesheet', href: oscUiSwitchStyles },
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

type LoaderData = {
    user: Awaited<ReturnType<typeof getUser>>;
    colorScheme: string;
    siteSettings: object;
    SANITY_STUDIO_API_PROJECT_ID: string | undefined;
    SANITY_STUDIO_API_DATASET: string | undefined;
};

export const headers: HeadersFunction = () => ({
    'Accept-CH': 'Sec-CH-Prefers-Color-Scheme'
});

export const loader: LoaderFunction = async ({ request }) => {
    const siteSettings = await getSettingsData({
        query: SETTINGS_QUERY
    });

    return json<LoaderData>({
        user: await getUser(request),
        colorScheme: await getColorScheme(request),
        siteSettings,
        SANITY_STUDIO_API_PROJECT_ID: process.env.SANITY_STUDIO_API_PROJECT_ID,
        SANITY_STUDIO_API_DATASET: process.env.SANITY_STUDIO_API_DATASET
    });
};

export const meta: MetaFunction = ({ data }) => {
    const { seo: seoSettings } = data.siteSettings;

    const noindex = seoSettings.robots.noIndex && 'noindex';
    const { asset: organizationAsset } = seoSettings.schema.organizationLogo;
    const facebook = seoSettings.socials.find((social: string) => social.includes('facebook'));
    const twitter = seoSettings.socials.find((social: string) => social.includes('twitter'));
    const twitterHandle = twitter && twitter.substring(twitter.lastIndexOf('/') + 1);

    return {
        charset: 'utf-8',
        viewport: 'width=device-width,initial-scale=1',
        robots: noindex,
        title: seoSettings?.siteTitle,
        description: '', // empty description lets us ensure it always has this position in the DOM
        'og:locale': 'en_GB',
        'og:type': 'website',
        'og:title': seoSettings?.siteTitle,
        'og:url': '',
        'og:site_name': seoSettings.schema?.organizationName,
        'article:publisher': facebook,
        'og:image': organizationAsset?.url,
        'og:image:width': organizationAsset?.dimensions?.width,
        'og:image:height': organizationAsset?.dimensions?.height,
        'twitter:card': 'summary_large_image',
        'twitter:site': twitterHandle
    };
};

interface DocumentProps {
    children: React.ReactNode;
}

const Document = ({ children }: DocumentProps) => {
    const matches = useMatches();

    // The canonicalUrl should be exported from the loader for each page.
    const findCanonical = matches.find((match) => match.data && match.data.canonicalUrl);
    const canonical = findCanonical?.data.canonicalUrl;

    return (
        <html lang="en">
            <head>
                {typeof document === 'undefined' && <Meta />}
                {typeof document === 'undefined' && canonical && (
                    <link rel="canonical" href={canonical} />
                )}
                {typeof document === 'undefined' && <Links />}
                {typeof document === 'undefined' && <DynamicLinks />}
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
    const { SANITY_STUDIO_API_PROJECT_ID, SANITY_STUDIO_API_DATASET } = useLoaderData();
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
            const postMessage = {
                type: 'REMIX_NAVIGATION',
                isMount: mounted,
                location,
                // We need to stringify and parse the matches constant as it includes methods from dynamicLinks which cannot be passed. See https://stackoverflow.com/questions/42376464/uncaught-domexception-failed-to-execute-postmessage-on-window-an-object-co
                matches: JSON.parse(JSON.stringify(matches)),
                manifest: window.__remixManifest
            };

            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller?.postMessage(postMessage);
            } else {
                let listener = async () => {
                    await navigator.serviceWorker.ready;
                    navigator.serviceWorker.controller?.postMessage(postMessage);
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
            <script
                dangerouslySetInnerHTML={{
                    __html: `document.env = ${JSON.stringify({
                        SANITY_STUDIO_API_PROJECT_ID,
                        SANITY_STUDIO_API_DATASET
                    })}`
                }}
            />

            <Outlet />
        </Document>
    );
}
