import type { Params } from '@remix-run/react';
import { useEffect, useState } from 'react';

import { config } from '~/lib/sanity/config';
import type { SanityPage } from '~/types/sanity';

interface SubscriptionOptions {
    params: Readonly<Params<string>>;
    initialData: SanityPage | SanityPage[];
}

type SanityPageArray = SanityPage[];

export function usePreviewSubscription(query: string, subscriptionOptions: SubscriptionOptions) {
    const { params, initialData } = subscriptionOptions;
    const [data, setData] = useState<SubscriptionOptions['initialData']>(initialData);

    useEffect(() => {
        let sub: any;
        let store: any;

        async function createStore() {
            // For more details about configuring groq-store see:
            // https://www.npmjs.com/package/@sanity/groq-store
            const {
                default: { groqStore }
            } = await import('@sanity/groq-store');

            const { projectId, dataset } = config;

            store = groqStore({
                projectId,
                dataset,
                listen: true,
                overlayDrafts: true,
                documentLimit: 5000 // Will prevent streaming if this value is met: https://www.sanity.io/docs/attribute-limit
            });

            sub = store.subscribe(
                query,
                params ?? {}, // Params
                (err: any, result: SanityPageArray) => {
                    if (err) {
                        console.error('Oh no, an error:', err);
                        return;
                    }

                    setData(result);
                }
            );
        }

        if (!store) {
            createStore();
        }

        return () => {
            if (sub?.unsubscribe()) sub.unsubscribe();
            if (store) store.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want to run this on mount
    }, []);

    return { data };
}
