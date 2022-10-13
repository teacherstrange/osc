import { useLoaderData, useParams } from '@remix-run/react';
import { Heading } from '@chakra-ui/react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useState } from 'react';

import Preview from '~/components/Preview';
import getPageData from '~/models/sanity.server';
import { PAGE_QUERY } from '~/queries/sanity/page';
import type { SanityPage } from '~/types/sanity';

interface PageData {
    page: SanityPage;
    isPreview: boolean;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    if (!params.slug) throw new Error('Missing slug');

    // Query the page data
    const data = await getPageData({
        request,
        params,
        query: PAGE_QUERY
    });

    if (!data) {
        throw new Response('`data` is not defined', { status: 500 });
    }

    const { page, isPreview }: PageData = data;

    return json({
        page,
        isPreview,
        query: isPreview ? PAGE_QUERY : null
    });
};

export const meta: MetaFunction = ({ data }) => {
    const { title } = data?.page?.seo?.title ? data?.page?.seo : data?.page;

    return {
        title
    };
};

export default function Index() {
    const { page, isPreview, query } = useLoaderData<typeof loader>();
    const params = useParams();

    // If `preview` mode is active, its component updates this state for us
    const [data, setData] = useState<SanityPage>(page);

    // Make sure to update the page state if the IDs are different!
    if (page?._id !== data?._id) setData(page);

    /**
     * NOTE: For preview mode to work when working with draft content, optionally chain _everything_
     */
    return (
        <div>
            {isPreview ? (
                <Preview data={data} setData={setData} query={query} queryParams={params} />
            ) : null}

            <Heading>{data?.title}</Heading>
        </div>
    );
}
