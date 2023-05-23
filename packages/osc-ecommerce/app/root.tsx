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
    useMatches,
} from '@remix-run/react';
import type { Cart } from '@shopify/hydrogen/storefront-api-types';
import { SkipLink } from 'osc-ui';
import spritesheet from 'osc-ui/dist/spritesheet.svg';
import oscUiAccordionStyles from 'osc-ui/dist/src-components-Accordion-accordion.css';
import oscUiBurgerStyles from 'osc-ui/dist/src-components-Burger-burger.css';
import oscUiDrawerStyles from 'osc-ui/dist/src-components-Drawer-drawer.css';
import oscFooterStyles from 'osc-ui/dist/src-components-Footer-footer.css';
import oscHeaderStyles from 'osc-ui/dist/src-components-Header-header.css';
import oscLogoStyles from 'osc-ui/dist/src-components-Logo-logo.css';
import oscNavStyles from 'osc-ui/dist/src-components-Navbar-navbar.css';
import oscUiPriceStyles from 'osc-ui/dist/src-components-Price-price.css';
import oscUiSkipLinkStyle from 'osc-ui/dist/src-components-SkipLink-skip-link.css';
import oscUiSwitchStyles from 'osc-ui/dist/src-components-Switch-switch.css';
import styles from 'osc-ui/dist/src-styles-main.css';
import React, { useEffect } from 'react';
import { DynamicLinks } from 'remix-utils';
import { getCart } from '~/utils/cart.helpers';
import { checkConnectivity } from '~/utils/client/pwa-utils.client';
import { SiteFooter } from './components/Footer/Footer';
import { SiteHeader } from './components/Header/Header';
import { PATHS } from './constants';
import { getSettingsData } from './models/sanity.server';
import { NAV_QUERY } from './queries/sanity/navigation';
import { SETTINGS_QUERY } from './queries/sanity/settings';
import type { SanityNavSettings, SanitySocial } from './types/sanity';
import { getColorScheme } from './utils/colorScheme';
import { getPageType } from './utils/getPageType';

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
        { rel: 'stylesheet', href: oscHeaderStyles },
        { rel: 'stylesheet', href: oscNavStyles },
        { rel: 'stylesheet', href: oscLogoStyles },
        { rel: 'stylesheet', href: oscUiBurgerStyles },
        { rel: 'stylesheet', href: oscUiAccordionStyles },
        { rel: 'stylesheet', href: oscFooterStyles },
        { rel: 'stylesheet', href: oscUiDrawerStyles },
        { rel: 'stylesheet', href: oscUiPriceStyles },
        {
            rel: 'preconnect',
            href: 'https://cdn.shopify.com',
        },
        {
            rel: 'preconnect',
            href: 'https://shop.app',
        },
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

type LoaderData = {
    colorScheme: string;
    siteSettings: object;
    navSettings: SanityNavSettings;
    footerNavSettings: SanityNavSettings[];
    footerBottomNav: SanityNavSettings;
    SANITY_STUDIO_API_PROJECT_ID: string | undefined;
    SANITY_STUDIO_API_DATASET: string | undefined;
    cart: Cart | undefined;
};

export const headers: HeadersFunction = () => ({
    'Accept-CH': 'Sec-CH-Prefers-Color-Scheme',
});

export const loader: LoaderFunction = async ({ request, context }) => {
    const [cartId, siteSettings] = await Promise.all([
        context.session.get('cartId'),
        getSettingsData({
            query: SETTINGS_QUERY,
        }),
    ]);

    // If the mainNavigationId is returned from the settings then run the navigation query
    const navSettings =
        siteSettings?.mainNavigationId &&
        (await getSettingsData({
            query: NAV_QUERY,
            params: {
                id: siteSettings?.mainNavigationId,
            },
        }));

    // Loop through the footer nav items and query each id
    const footerNavSettings = [];
    if (siteSettings?.footer?.footerNavigation.length > 0) {
        for await (const navId of siteSettings?.footer?.footerNavigation) {
            footerNavSettings.push(
                await getSettingsData({
                    query: NAV_QUERY,
                    params: {
                        id: navId,
                    },
                })
            );
        }
    }

    const footerBottomNav =
        siteSettings?.footer?.footerBottomNav &&
        (await getSettingsData({
            query: NAV_QUERY,
            params: { id: siteSettings?.footer?.footerBottomNav },
        }));

    // We want to expose the cart across the whole site so we can access it from anywhere
    // For example for use in the minicart.
    const cart = cartId ? await getCart(context, cartId) : undefined;

    return json<LoaderData>({
        colorScheme: await getColorScheme(request),
        siteSettings,
        navSettings,
        footerNavSettings,
        footerBottomNav,
        SANITY_STUDIO_API_PROJECT_ID: process.env.SANITY_STUDIO_API_PROJECT_ID,
        SANITY_STUDIO_API_DATASET: process.env.SANITY_STUDIO_API_DATASET,
        cart,
    });
};

export const meta: MetaFunction = ({ data }) => {
    const { seo: seoSettings } = data.siteSettings;

    const noindex = seoSettings.robots.noIndex && 'noindex';
    const { asset: organizationAsset } = seoSettings.schema.organizationLogo;

    const socials = seoSettings.socials as SanitySocial[];
    const facebook = socials.find((social) => social.socialProfile.includes('facebook'));
    const twitter = socials.find((social) => social.socialProfile.includes('twitter'));
    const twitterHandle =
        twitter && twitter?.socialProfile.substring(twitter?.socialProfile.lastIndexOf('/') + 1);

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
        'article:publisher': facebook?.socialProfile,
        'og:image': organizationAsset?.url,
        'og:image:width': organizationAsset?.dimensions?.width,
        'og:image:height': organizationAsset?.dimensions?.height,
        'twitter:card': 'summary_large_image',
        'twitter:site': twitterHandle,
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
                <Meta />
                {canonical && <link rel="canonical" href={canonical} />}
                <Links />
                <DynamicLinks />
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
    const {
        SANITY_STUDIO_API_PROJECT_ID,
        SANITY_STUDIO_API_DATASET,
        navSettings,
        siteSettings,
        footerNavSettings,
        footerBottomNav,
    } = useLoaderData();
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

    useEffect(() => {
        let mounted = isMount;
        isMount = false;
        if ('serviceWorker' in navigator) {
            const postMessage = {
                type: 'REMIX_NAVIGATION',
                isMount: mounted,
                location,
                // We need to stringify and parse the matches constant as it includes methods from dynamicLinks which cannot be passed. See https://stackoverflow.com/questions/42376464/uncaught-domexception-failed-to-execute-postmessage-on-window-an-object-co
                matches: JSON.parse(JSON.stringify(matches)),
                manifest: window.__remixManifest,
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
                        SANITY_STUDIO_API_DATASET,
                    })}`,
                }}
            />

            <SkipLink anchor="main-content">Skip to main content</SkipLink>

            <div className="o-page">
                <SiteHeader navSettings={navSettings} actionNav={siteSettings?.actionNav} />

                <main
                    id="main-content"
                    className={
                        getPageType(location) === PATHS.PRODUCTS ? 'u-bg-color-neutral-100' : ''
                    }
                    tabIndex={-1}
                >
                    <Outlet />
                </main>

                <SiteFooter
                    navigationGroups={footerNavSettings}
                    bottomNavigation={footerBottomNav}
                    contactDetails={siteSettings?.contactDetails}
                    socials={siteSettings?.seo?.socials}
                    siteName={siteSettings?.seo?.siteTile}
                />
            </div>
        </Document>
    );
}
