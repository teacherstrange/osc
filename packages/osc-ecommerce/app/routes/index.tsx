import { Form, useLoaderData, useLocation, useParams, useSubmit } from '@remix-run/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Heading, Stack } from '@chakra-ui/react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useState } from 'react';
import { FormToggle } from '~/components/FormToggle/FormToggle';
import { getColorScheme } from '~/utils/colorScheme';
import Preview from '~/components/Preview';
import getPageData from '~/models/sanity.server';
import { HOME_QUERY } from '~/queries/sanity/home';
import type { SanityPage } from '~/types/sanity';
import Module from '~/components/Module';
import type { module } from '~/types/sanity';
import { buildCanonicalUrl } from '~/utils/metaTags/buildCanonicalUrl';
import { buildHtmlMetaTags } from '~/utils/metaTags/buildHtmlMetaTags';
import { useOptionalUser } from '~/utils/_tmp_/user';

interface PageData {
    page: SanityPage;
    isPreview: boolean;
}

export const loader: LoaderFunction = async ({ request }) => {
    const colorScheme = await getColorScheme(request);

    // Query the page data
    const data = await getPageData({
        request,
        query: HOME_QUERY
    });

    if (!data) {
        throw new Response('`data` is not defined', { status: 500 });
    }

    const { page: home, isPreview }: PageData = data;
    const canonicalUrl = buildCanonicalUrl({
        canonical: home?.seo?.canonicalUrl,
        request
    });

    return json({
        colorScheme,
        home,
        canonicalUrl,
        isPreview,
        query: isPreview ? HOME_QUERY : null
    });
};

export const meta: MetaFunction = ({ data, parentsData }) => {
    const globalSeoSettings = parentsData.root.siteSettings.seo;

    const meta = buildHtmlMetaTags({
        pageData: data.home,
        globalData: globalSeoSettings,
        canonicalUrl: data.canonicalUrl
    });

    return meta;
};

export default function Index() {
    const { colorScheme, home, isPreview, query } = useLoaderData<typeof loader>();
    const user = useOptionalUser();
    const params = useParams();

    // If `preview` mode is active, its component updates this state for us
    const [data, setData] = useState<SanityPage>(home);

    const submit = useSubmit();
    const location = useLocation();

    /**
     * NOTE: For preview mode to work when working with draft content, optionally chain _everything_
     */
    return (
        <>
            {isPreview ? (
                <Preview data={data} setData={setData} query={query} queryParams={params} />
            ) : null}

            {user ? (
                <Form action="/logout" method="post">
                    <button type="submit">Logout</button>
                </Form>
            ) : null}

            {colorScheme && (
                <FormToggle
                    leftIcon={<MoonIcon color={'secondary'} margin={2} />}
                    rightIcon={<SunIcon color={'secondary'} margin={2} />}
                    isChecked={colorScheme === 'light' ? true : false}
                    onToggle={() => {
                        const formData = new FormData();
                        formData.set('pathname', location.pathname);
                        submit(formData, {
                            method: 'post',
                            action: '/actions/changeTheme'
                        });
                    }}
                    id="color-mode-toggle"
                />
            )}

            <Heading as="h1">{data?.title}</Heading>

            {data?.modules && data?.modules.length > 0 ? (
                <Stack spacing={16}>
                    {data?.modules.map((module: module) =>
                        module ? <Module key={module?._key} module={module} /> : null
                    )}
                </Stack>
            ) : null}
        </>
    );
}
