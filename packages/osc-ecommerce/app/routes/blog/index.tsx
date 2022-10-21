import { useLoaderData, useParams } from '@remix-run/react';
import { Heading, Stack } from '@chakra-ui/react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useState } from 'react';

import Preview from '~/components/Preview';
import getPageData from '~/models/sanity.server';
import { BLOG_QUERY } from '~/queries/sanity/blog';
import type { SanityPage } from '~/types/sanity';
import Module from '~/components/Module';
import type { module } from '~/types/sanity';
import { buildCanonicalUrl } from '~/utils/metaTags/buildCanonicalUrl';
import { buildHtmlMetaTags } from '~/utils/metaTags/buildHtmlMetaTags';

interface PageData {
    page: SanityPage;
    isPreview: boolean;
}

export const loader: LoaderFunction = async ({ request }) => {
    // Query the page data
    const data = await getPageData({
        request,
        query: BLOG_QUERY
    });

    if (!data) {
        throw new Response('`data` is not defined', { status: 500 });
    }

    const { page: blog, isPreview }: PageData = data;
    const canonicalUrl = buildCanonicalUrl({
        canonical: blog?.seo?.canonicalUrl,
        request
    });

    return json({
        blog,
        isPreview,
        canonicalUrl,
        query: isPreview ? BLOG_QUERY : null
    });
};

export const meta: MetaFunction = ({ data, parentsData }) => {
    const globalSeoSettings = parentsData.root.siteSettings.seo;

    const meta = buildHtmlMetaTags({
        pageData: data.blog,
        globalData: globalSeoSettings,
        canonicalUrl: data.canonicalUrl
    });

    return meta;
};

export default function Index() {
    const { blog, isPreview, query } = useLoaderData<typeof loader>();
    const params = useParams();

    // If `preview` mode is active, its component updates this state for us
    const [data, setData] = useState<SanityPage>(blog);

    // Make sure to update the page state if the IDs are different!
    if (blog?._id !== data?._id) setData(blog);

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
