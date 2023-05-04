import { createRequestHandler } from '@remix-run/express';
import type { Session, SessionStorage } from '@remix-run/node';
import { createCookieSessionStorage } from '@remix-run/node';
import { createStorefrontClient } from '@shopify/hydrogen';
import compression from 'compression';
import type { Request } from 'express';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

const BUILD_DIR = path.join(process.cwd(), 'build');

const app = express();
const port = process.env.PORT || 3000;

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

// Remix fingerprints its assets so we can cache forever.
app.use('/build', express.static('public/build', { immutable: true, maxAge: '1y' }));

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('public', { maxAge: '1h' }));

app.use(morgan('tiny'));

/**
 * Set trust proxy to true so we can access buyer ip using req.ip
 * @see https://expressjs.com/en/4x/api.html#req.ip
 */
app.set('trust proxy', true);

app.all('*', async (req, res, next) => {
    try {
        process.env.NODE_ENV === 'development' && purgeRequireCache();

        /**
         * Open a cache instance in the worker and a custom session instance.
         */
        if (!process.env?.SESSION_SECRET) {
            throw new Error('SESSION_SECRET environment variable is not set');
        }
        // TODO: Add caching here
        const [
            // cache,
            session,
        ] = await Promise.all([
            // caches.open('hydrogen'), <--- Not supported in Node environments but instance must follow api? https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data#step-1-create-and-inject-the-storefront-client
            HydrogenSession.init(req, [process.env.SESSION_SECRET]),
        ]);

        /**
         * Create Hydrogen's Storefront client.
         */
        const { storefront } = createStorefrontClient({
            /* Cache API instance */
            // cache, // TODO: Pass cache instance here
            /* Storefront headers include buyer IP address to avoid Storefront API rate limit */
            storefrontHeaders: {
                requestGroupId: req.get('request-id') ?? null,
                buyerIp: req.ip ?? null,
                cookie: req.get('cookie') ?? null,
            },
            /* Public Storefront API token for your store */
            publicStorefrontToken: process.env.PUBLIC_STOREFRONT_API_TOKEN,
            /* Private Storefront API token for your store */
            privateStorefrontToken: process.env.PRIVATE_STOREFRONT_API_TOKEN,
            /* Your store domain: "https://{shop}.myshopify.com" */
            storeDomain: `https://${process.env.PUBLIC_STORE_DOMAIN}`,
            /* Desired Storefront API version to use */
            storefrontApiVersion: process.env.PUBLIC_STOREFRONT_API_VERSION || '2023-01',
            /* Your storefront id */
            storefrontId: process.env.PUBLIC_STOREFRONT_ID,
        });

        /**
         * Create a Remix request handler and pass
         * Hydrogen's Storefront client to the loader context.
         */
        return createRequestHandler({
            build: require(BUILD_DIR),
            mode: process.env.NODE_ENV,
            getLoadContext: () => ({
                // cache, // TODO: Pass cache instance here
                session,
                storefront,
            }),
        })(req, res, next);
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`🚀 Express server listening on http://localhost:${port}`);
});

function purgeRequireCache() {
    // purge require cache on requests for "server side HMR" this won't let
    // you have in-memory objects between requests in development,
    // alternatively you can set up nodemon/pm2-dev to restart the server on
    // file changes, but then you'll have to reconnect to databases/etc on each
    // change. We prefer the DX of this, so we've included it for you by default
    for (const key in require.cache) {
        if (key.startsWith(BUILD_DIR)) {
            delete require.cache[key];
        }
    }
}

/**
 * This is a custom session implementation for your Hydrogen shop.
 * Feel free to customize it to your needs, add helper methods, or
 * swap out the cookie-based implementation with something else!
 */
export class HydrogenSession {
    constructor(private sessionStorage: SessionStorage, private session: Session) {}

    static async init(request: Request, secrets: string[]) {
        const storage = createCookieSessionStorage({
            cookie: {
                name: 'session',
                httpOnly: true,
                path: '/',
                sameSite: 'lax',
                secrets,
            },
        });

        const session = await storage.getSession(request.get('Cookie'));

        return new this(storage, session);
    }

    get(key: string) {
        return this.session.get(key);
    }

    destroy() {
        return this.sessionStorage.destroySession(this.session);
    }

    flash(key: string, value: any) {
        this.session.flash(key, value);
    }

    unset(key: string) {
        this.session.unset(key);
    }

    set(key: string, value: any) {
        this.session.set(key, value);
    }

    commit() {
        return this.sessionStorage.commitSession(this.session);
    }
}
