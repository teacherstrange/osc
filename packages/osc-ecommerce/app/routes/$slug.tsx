import type { ActionArgs, ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import { useState } from 'react';
import type { DynamicLinksFunction } from 'remix-utils';
import type { HubspotFormData, HubspotFormFieldGroups } from '~/components/Forms/types';
import Module, { getComponentStyles } from '~/components/Module';
import Preview from '~/components/Preview';
import getPageData, { shouldRedirect } from '~/models/sanity.server';
import { PAGE_QUERY } from '~/queries/sanity/page';
import type { formModule, module, SanityPage } from '~/types/sanity';
import { validateAndSubmitHubspotForm } from '~/utils/hubspot.helpers';
import { buildCanonicalUrl } from '~/utils/metaTags/buildCanonicalUrl';
import { buildHtmlMetaTags } from '~/utils/metaTags/buildHtmlMetaTags';
import { getHubspotFormData } from '~/utils/server/hubspot.server';

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
        query: PAGE_QUERY,
    });

    if (!data?.page) {
        const redirect = await shouldRedirect(request);

        if (redirect) {
            return redirect;
        } else {
            throw new Response('Not found', { status: 404 });
        }
    }

    const { page, isPreview }: PageData = data;

    const { formId } = page.modules.find((module) => module._type === 'module.forms') as formModule;
    let formFieldGroups: HubspotFormFieldGroups[] | [] = [];
    try {
        const formData = (await getHubspotFormData(formId)) as HubspotFormData;
        formFieldGroups = formData?.formFieldGroups;
    } catch (error) {
        console.error('Unable to load form!');
    }

    const canonicalUrl = buildCanonicalUrl({
        canonical: page?.seo?.canonicalUrl,
        request,
    });

    return json({
        page,
        canonicalUrl,
        isPreview,
        query: isPreview ? PAGE_QUERY : null,
        formFieldGroups,
    });
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
    const formfieldData = Object.fromEntries(await request.formData());

    if (formfieldData._action === 'submitHubspotForm') {
        let response;
        try {
            response = await validateAndSubmitHubspotForm(formfieldData);
        } catch (error) {
            let message = 'Unknown Error';
            if (error instanceof Error) message = error.message;
            return json({ formErrors: { messages: [message] } });
        }

        if (!response?.ok) {
            console.error(
                `Error submitting form! Status: ${response.status}. StatusText: ${response.statusText}`
            );
            return {
                formErrors: {
                    statusText: response?.statusText,
                    messages: ['There was a problem, please try again'],
                    status: response?.status,
                },
            };
        }

        const result = await response.json();

        if (result.validationErrors || result.formErrors) {
            result.success = false;
        } else {
            result.success = true;
        }

        return result;
    }
};

// https://github.com/sergiodxa/remix-utils#dynamiclinks
const dynamicLinks: DynamicLinksFunction = ({ data }) => {
    return getComponentStyles(data.page);
};

export const handle = { dynamicLinks };

export const meta: MetaFunction = ({ data, parentsData }) => {
    const globalSeoSettings = parentsData.root.siteSettings.seo;

    const meta = buildHtmlMetaTags({
        pageData: data.page,
        globalData: globalSeoSettings,
        canonicalUrl: data.canonicalUrl,
    });

    return meta;
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
        <>
            {isPreview ? (
                <Preview data={data} setData={setData} query={query} queryParams={params} />
            ) : null}

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
