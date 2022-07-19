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
import { useContext } from 'react';
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
    // const clientStyleData = useContext(ClientStyleContext);

    // // Only executed on client
    // useEffect(() => {
    //     // re-link sheet container
    //     emotionCache.sheet.container = document.head;
    //     // re-inject tags
    //     const tags = emotionCache.sheet.tags;
    //     emotionCache.sheet.flush();
    //     tags.forEach((tag) => {
    //         (emotionCache.sheet as any)._insertTag(tag);
    //     });
    //     // reset cache to reapply global styles
    //     clientStyleData?.reset();
    // }, []);

    return (
        <html lang="en">
            <head>
                <Meta />
                {<Links />}
                {serverStyleData?.map(({ key, ids, css }) => {
                    if (
                        key === 'css-global' ||
                        (key !== 'css-global' && typeof document !== 'undefined')
                    ) {
                        return (
                            <style
                                key={key}
                                data-emotion={`${key} ${ids.join(' ')}`}
                                dangerouslySetInnerHTML={{ __html: css }}
                            />
                        );
                    } else {
                        const newCss = css.replace(
                            /background:[^;]+;?|background-color:[^;]+;?|color:[^;]+;?/g,
                            ''
                        );
                        return (
                            <style
                                key={key}
                                // data-emotion={`${key} ${ids.join(' ')}`}
                                dangerouslySetInnerHTML={{ __html: newCss }}
                            />
                        );
                    }
                })}
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
