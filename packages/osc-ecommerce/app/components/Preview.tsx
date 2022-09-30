import React, { useEffect } from 'react';
import { Center } from '@chakra-ui/react';
import type { SanityPage } from '~/types/sanity';
import { usePreviewSubscription } from '~/hooks/usePreviewSubscription';
import type { Params } from '@remix-run/react';

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

    return <Center>Preview Mode</Center>;
}
