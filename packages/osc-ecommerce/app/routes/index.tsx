import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useLoaderData, useLocation, useParams, useSubmit } from '@remix-run/react';
import { useState } from 'react';
import type { DynamicLinksFunction } from 'remix-utils';
import Module, { getComponentStyles } from '~/components/Module';
import Preview from '~/components/Preview';
import { ThemeSwitcher } from '~/components/ThemeSwitcher/ThemeSwitcher';
import getPageData from '~/models/sanity.server';
import { HOME_QUERY } from '~/queries/sanity/home';
import type { module, SanityPage } from '~/types/sanity';
import { getColorScheme } from '~/utils/colorScheme';
import { getHubspotForms } from '~/utils/hubspot.helpers';
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
        query: HOME_QUERY,
    });

    if (!data?.page) {
        throw new Response('Not found', { status: 404 });
    }

    const { page: home, isPreview }: PageData = data;

    const hubspotFormData = await getHubspotForms(home);

    const canonicalUrl = buildCanonicalUrl({
        canonical: home?.seo?.canonicalUrl,
        request,
    });

    return json({
        colorScheme,
        home,
        hubspotFormData: hubspotFormData ? hubspotFormData : null,
        canonicalUrl,
        isPreview,
        query: isPreview ? HOME_QUERY : null,
    });
};

// https://github.com/sergiodxa/remix-utils#dynamiclinks
const dynamicLinks: DynamicLinksFunction = ({ data }) => {
    return getComponentStyles(data.home);
};

export const handle = { dynamicLinks };

export const meta: MetaFunction = ({ data, parentsData }) => {
    const globalSeoSettings = parentsData.root.siteSettings.seo;

    const meta = buildHtmlMetaTags({
        pageData: data.home,
        globalData: globalSeoSettings,
        canonicalUrl: data.canonicalUrl,
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
                <Form method="post">
                    <ThemeSwitcher
                        label="Toggle colour scheme"
                        isChecked={colorScheme === 'light' ? true : false}
                        onToggle={() => {
                            const formData = new FormData();
                            formData.set('pathname', location.pathname);
                            submit(formData, {
                                method: 'post',
                                action: '/actions/changeTheme',
                            });
                        }}
                    />
                </Form>
            )}

            <h1>{data?.title}</h1>

            {data?.modules && data?.modules.length > 0 ? (
                <>
                    {data?.modules.map((module: module) =>
                        module ? <Module key={module?._key} module={module} /> : null
                    )}
                </>
            ) : null}
        </>
    );
}
