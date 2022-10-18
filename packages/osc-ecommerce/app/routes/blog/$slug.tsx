import { useLoaderData, useParams } from '@remix-run/react';
import { Heading, Stack } from '@chakra-ui/react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useState } from 'react';

import Preview from '~/components/Preview';
import getPageData from '~/models/sanity.server';
import { POST_QUERY } from '~/queries/sanity/post';
import type { SanityPage } from '~/types/sanity';
import Module from '~/components/Module';
import type { module } from '~/types/sanity';
import { buildCanonicalUrl } from '~/utils/metaTags/buildCanonicalUrl';

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
        query: POST_QUERY
    });

    if (!data) {
        throw new Response('`data` is not defined', { status: 500 });
    }

    const { page: post, isPreview }: PageData = data;
    const canonicalUrl = buildCanonicalUrl({
        canonical: post?.seo?.canonicalUrl,
        request
    });

    return json({
        post,
        isPreview,
        canonicalUrl,
        query: isPreview ? POST_QUERY : null
    });
};

export const meta: MetaFunction = ({ data }) => {
    console.log(data);

    const { title } = data?.post?.seo?.title ? data?.post?.seo : data?.post;

    return {
        title
    };
};

export default function Index() {
    const { post, isPreview, query } = useLoaderData<typeof loader>();
    const params = useParams();

    // If `preview` mode is active, its component updates this state for us
    const [data, setData] = useState<SanityPage>(post);

    // Make sure to update the page state if the IDs are different!
    if (post?._id !== data?._id) setData(post);

    /**
     * NOTE: For preview mode to work when working with draft content, optionally chain _everything_
     */
    return (
        <div>
            {isPreview ? (
                <Preview data={data} setData={setData} query={query} queryParams={params} />
            ) : null}

            <Heading>{data?.title}</Heading>

            {data?.modules && data?.modules.length > 0 ? (
                <Stack spacing={16}>
                    {data?.modules.map((module: module) =>
                        module ? <Module key={module?._key} module={module} /> : null
                    )}
                </Stack>
            ) : null}
        </div>
    );
}
