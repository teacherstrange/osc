import type { Params } from '@remix-run/react';
import React, { useEffect } from 'react';
import { usePreviewSubscription } from '~/hooks/usePreviewSubscription';
import type { SanityPage } from '~/types/sanity';

interface Props {
    data: SanityPage;
    setData: React.Dispatch<React.SetStateAction<SanityPage>>;
    query: string;
    queryParams: Readonly<Params<string>>;
}

export default function Preview({ data, setData, query, queryParams }: Props) {
    const { data: previewData } = usePreviewSubscription(query, {
        params: queryParams,
        initialData: data
    });

    useEffect(() => {
        if (Array.isArray(previewData)) {
            setData(previewData[0]);
        }
    }, [previewData, setData]);

    return <div>Preview Mode</div>;
}
