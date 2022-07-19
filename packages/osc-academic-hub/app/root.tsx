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
import { Header } from 'header';
import styles from './styles/dest/main.css';
import appHeaderStyles from './components/header.css';
import headerStyles from 'header/dist/index.css';

// import headerStyles from './components/header.css';
import { getUser } from './session.server';
import { useContext, useEffect } from 'react';
import { ServerStyleContext } from './context';

export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: headerStyles },
        { rel: 'stylesheet', href: styles },
        { rel: 'stylesheet', href: appHeaderStyles }
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
};

export const headers: HeadersFunction = () => ({
    'Accept-CH': 'Sec-CH-Prefers-Color-Scheme'
});

export const loader: LoaderFunction = async ({ request }) => {
    return json<LoaderData>({
        user: await getUser(request),
        colorScheme: await getColorScheme(request)
    });
};

interface DocumentProps {
    children: React.ReactNode;
}
const Document = withEmotionCache(({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);

    useEffect(() => {
        emotionCache.sheet.flush();
    }, [emotionCache.sheet]);

    return (
        <html lang="en">
            <head>
                {serverStyleData?.map(({ key, ids, css }) => {
                    return (
                        <style
                            key={key}
                            // data-emotion={`${key} ${ids.join(' ')}`}
                            dangerouslySetInnerHTML={{ __html: css }}
                        />
                    );
                })}
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
});

export default function App() {
    const { colorScheme } = useLoaderData();

    return (
        <Document>
            <ChakraProvider theme={colorScheme === 'light' ? lightTheme : darkTheme}>
                <Header className={'o-header--full'} backgroundColor={'secondary'} />
                <Outlet />
            </ChakraProvider>
        </Document>
    );
}
