import { Form, useLoaderData, useLocation, useParams, useSubmit } from '@remix-run/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Heading } from '@chakra-ui/react';
import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useState } from 'react';
import { FormToggle } from '~/components/FormToggle';
import { getColorScheme } from '~/cookie';

import { Tabs } from 'osc-ui';
import oscUiTabStyles from 'osc-ui/dist/tabs.css';

import Preview from '~/components/Preview';
import getPageData from '~/models/sanity.server';
import { HOME_QUERY } from '~/queries/sanity/home';
import type { SanityPage } from '~/types/sanity';

interface PageData {
    page: SanityPage;
    isPreview: boolean;
}

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: oscUiTabStyles }];
};

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

    return json({
        colorScheme,
        home,
        isPreview,
        query: isPreview ? HOME_QUERY : null
    });
};

export const meta: MetaFunction = ({ data }) => {
    const { title } = data?.home?.seo?.title ? data?.home?.seo : data?.home;

    return {
        title
    };
};

export default function Index() {
    const { colorScheme, home, isPreview, query } = useLoaderData<typeof loader>();
    const params = useParams();

    // If `preview` mode is active, its component updates this state for us
    const [data, setData] = useState<SanityPage>(home);

    const submit = useSubmit();
    const location = useLocation();

    /**
     * NOTE: For preview mode to work when working with draft content, optionally chain _everything_
     */
    return (
        <div>
            {isPreview ? (
                <Preview data={data} setData={setData} query={query} queryParams={params} />
            ) : null}

            <Heading>{data?.title}</Heading>
            <Form action="/logout" method="post">
                <button
                    type="submit"
                    className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                >
                    Logout
                </button>
            </Form>
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
            <Tabs
                tabs={[
                    {
                        key: '1',
                        list: 'One',
                        panel: 'one!'
                    },
                    {
                        key: '2',
                        list: 'Two',
                        panel: 'two!'
                    },
                    {
                        key: '3',
                        list: 'Three',
                        panel: 'three!'
                    }
                ]}
            />
        </div>
    );
}
