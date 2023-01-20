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
import { Burger, Header, HeaderActionBar, HeaderNav, Icon, Logo, SkipLink } from 'osc-ui';
import spritesheet from 'osc-ui/dist/spritesheet.svg';
import oscUiBurgerStyles from 'osc-ui/dist/src-components-Burger-burger.css';
import oscUiCarouselStyles from 'osc-ui/dist/src-components-Carousel-carousel.css';
import oscHeaderStyles from 'osc-ui/dist/src-components-Header-header.css';
import oscNavStyles from 'osc-ui/dist/src-components-Navbar-navbar.css';
import oscUiSkipLinkStyle from 'osc-ui/dist/src-components-SkipLink-skip-link.css';
import oscUiSwitchStyles from 'osc-ui/dist/src-components-Switch-switch.css';
import styles from 'osc-ui/dist/src-styles-main.css';
import React, { useEffect, useState } from 'react';
import { DynamicLinks } from 'remix-utils';
import { checkConnectivity } from '~/utils/client/pwa-utils.client';
import { Nav } from './components/Nav';
import { getSettingsData } from './models/sanity.server';
import { NAV_QUERY } from './queries/sanity/navigation';
import { SETTINGS_QUERY } from './queries/sanity/settings';
import { getUser } from './session.server';
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
        { rel: 'stylesheet', href: oscUiCarouselStyles },
        { rel: 'stylesheet', href: oscUiSwitchStyles },
        { rel: 'stylesheet', href: oscUiSkipLinkStyle },
        { rel: 'stylesheet', href: oscHeaderStyles },
        { rel: 'stylesheet', href: oscNavStyles },
        { rel: 'stylesheet', href: oscUiBurgerStyles },
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
    user: Awaited<ReturnType<typeof getUser>>;
    colorScheme: string;
    siteSettings: object;
    navSettings: object;
    SANITY_STUDIO_API_PROJECT_ID: string | undefined;
    SANITY_STUDIO_API_DATASET: string | undefined;
};

export const headers: HeadersFunction = () => ({
    'Accept-CH': 'Sec-CH-Prefers-Color-Scheme',
});

export const loader: LoaderFunction = async ({ request }) => {
    const siteSettings = await getSettingsData({
        query: SETTINGS_QUERY,
    });

    // If the mainNavigationId is returned from the settings then run the navigation query
    const navSettings =
        siteSettings?.mainNavigationId &&
        (await getSettingsData({
            query: NAV_QUERY,
            params: {
                id: siteSettings?.mainNavigationId,
            },
        }));

    return json<LoaderData>({
        user: await getUser(request),
        colorScheme: await getColorScheme(request),
        siteSettings,
        navSettings,
        SANITY_STUDIO_API_PROJECT_ID: process.env.SANITY_STUDIO_API_PROJECT_ID,
        SANITY_STUDIO_API_DATASET: process.env.SANITY_STUDIO_API_DATASET,
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
    const { SANITY_STUDIO_API_PROJECT_ID, SANITY_STUDIO_API_DATASET, navSettings } =
        useLoaderData();
    let location = useLocation();
    let matches = useMatches();
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    const online = () => {
        //..Do something for online state
    };

    const offline = () => {
        //..Do something for offline state
    };

    useEffect(() => {
        // The `console.log` method returns an object with a status of "success" if online and a pass message or a status of "bad" and a fail message if offline
        checkConnectivity(online, offline).then((data) => console.log(data));

        // Make sure the mobile menu get's closed when we click on a link
        const navLinks = document.querySelectorAll('.c-nav__link');

        const handleClick = () => setMenuIsOpen(false);

        navLinks.forEach((link) => {
            link.addEventListener('click', handleClick);
        });

        return () => {
            navLinks.forEach((link) => {
                link.removeEventListener('click', handleClick);
            });
        };
    }, [menuIsOpen]);

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

            <Header>
                <Burger
                    id="mob-menu-trigger"
                    label="Open mobile menu"
                    isOpen={menuIsOpen}
                    aria-expanded={menuIsOpen}
                    aria-controls="header-nav"
                    className="u-hidden-from@desk"
                    onClick={() => setMenuIsOpen(!menuIsOpen)}
                />

                <Logo />

                <HeaderActionBar>
                    <button className="u-hidden-until@desk">
                        <Icon label="Search">
                            {/* // TODO: Update icon with Icon component */}
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden
                            >
                                <path
                                    d="M19.8576 18.6229L16.0817 14.847C17.3561 13.2964 18.1176 11.3118 18.1176 9.14572C18.1176 4.17827 14.0892 0.153809 9.1257 0.153809C4.1622 0.153809 0.133789 4.17827 0.133789 9.14572C0.133789 14.1132 4.1622 18.1376 9.1257 18.1376C11.2879 18.1376 13.2764 17.3722 14.827 16.1017L18.6029 19.8776L19.8576 18.6229ZM9.1257 16.3621C7.19633 16.3621 5.38532 15.6125 4.02016 14.2473C2.655 12.8822 1.90534 11.0711 1.90534 9.14177C1.90534 7.2124 2.655 5.40139 4.02016 4.03623C5.38532 2.67107 7.19633 1.92142 9.1257 1.92142C11.0551 1.92142 12.8661 2.67107 14.2312 4.03623C15.5964 5.40139 16.3461 7.2124 16.3461 9.14177C16.3461 11.0711 15.5964 12.8822 14.2312 14.2473C12.8661 15.6125 11.0551 16.3621 9.1257 16.3621Z"
                                    fill="#062134"
                                />
                            </svg>
                        </Icon>
                    </button>

                    <a href="#" className="u-hidden-until@desk">
                        <Icon label="My account">
                            {/* // TODO: Update icon with Icon component */}
                            <svg
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M17.1024 18.9011H15.3269V17.0349C15.3269 15.0818 13.7408 13.4957 11.7878 13.4957H6.25216C4.29911 13.4957 2.713 15.0818 2.713 17.0349V18.9011H0.9375V17.0349C0.9375 14.1033 3.32061 11.7202 6.25216 11.7202H11.7878C14.7193 11.7202 17.1024 14.1033 17.1024 17.0349V18.9011Z"
                                    fill="#062134"
                                />
                                <path
                                    d="M9.01844 2.69298C10.5177 2.69298 11.7409 3.91215 11.7409 5.41541C11.7409 6.91866 10.5217 8.13784 9.01844 8.13784C7.51518 8.13784 6.29601 6.91866 6.29601 5.41541C6.29601 3.91215 7.51913 2.69298 9.01844 2.69298ZM9.01844 0.91748C6.53668 0.91748 4.52051 2.92971 4.52051 5.41541C4.52051 7.89716 6.53274 9.91334 9.01844 9.91334C11.5002 9.91334 13.5164 7.90111 13.5164 5.41541C13.5164 2.92971 11.5041 0.91748 9.01844 0.91748Z"
                                    fill="#062134"
                                />
                            </svg>
                        </Icon>
                    </a>

                    <a href="#" className="u-hidden-until@desk">
                        <Icon label="Wishlist">
                            {/* // TODO: Update icon with Icon component */}
                            <svg
                                width="20"
                                height="18"
                                viewBox="0 0 20 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.2092 9.11036L10.0424 17.4743L1.89373 9.12889C-0.034889 7.15372 -0.034889 3.93712 1.89373 1.95824C3.81511 -0.00951818 6.93781 -0.00951818 8.85919 1.95824L10.0424 3.17003L11.2075 1.97677C13.1362 0.00159907 16.2806 0.00159907 18.2092 1.97677C20.1306 3.94453 20.1306 7.1426 18.2092 9.11036ZM10.0424 15.1174L17.0585 7.93193C18.3431 6.61639 18.3431 4.47445 17.0585 3.1552C15.7631 1.82854 13.6536 1.82854 12.3582 3.1552L10.0424 5.52689L7.70853 3.13667C6.42399 1.82113 4.33255 1.82113 3.04439 3.13667C1.74899 4.46334 1.74899 6.6238 3.04439 7.95046L10.0424 15.1174Z"
                                    fill="#062134"
                                />
                            </svg>
                        </Icon>
                    </a>

                    <button>
                        <Icon label="Bag">
                            {/* // TODO: Update icon with Icon component */}
                            <svg
                                width="17"
                                height="20"
                                viewBox="0 0 17 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.5784 5.49994V3.68893C12.5784 1.71615 10.9726 0.114258 9.00375 0.114258H7.18485C5.21207 0.114258 3.61018 1.7201 3.61018 3.68893V5.49599H0V19.8854H16.1886V5.49994H12.5784ZM5.38173 3.68893C5.38173 2.69465 6.19057 1.88976 7.1809 1.88976H8.9998C9.99408 1.88976 10.799 2.69859 10.799 3.68893V5.49599H5.38173V3.68893ZM14.4092 18.1139H1.7755V7.27543H14.4131V18.1139H14.4092Z"
                                    fill="#062134"
                                />
                            </svg>
                        </Icon>
                    </button>
                </HeaderActionBar>

                {navSettings ? (
                    <HeaderNav
                        id="header-nav"
                        aria-labelledby="mob-menu-trigger"
                        data-state={menuIsOpen ? 'open' : 'closed'}
                        isOpen={menuIsOpen}
                    >
                        <Nav navItems={navSettings?.navigationItem} />
                    </HeaderNav>
                ) : null}
            </Header>

            <main id="main-content" tabIndex={-1}>
                <Outlet />
            </main>
        </Document>
    );
}
