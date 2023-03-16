import type { ActionArgs, ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import type { z } from 'zod';
import { json } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import { useState } from 'react';
import type { DynamicLinksFunction } from 'remix-utils';
import Module, { getComponentStyles } from '~/components/Module';
import Preview from '~/components/Preview';
import getPageData, { shouldRedirect } from '~/models/sanity.server';
import { PAGE_QUERY } from '~/queries/sanity/page';
import type { module, SanityPage } from '~/types/sanity';
import { buildCanonicalUrl } from '~/utils/metaTags/buildCanonicalUrl';
import { buildHtmlMetaTags } from '~/utils/metaTags/buildHtmlMetaTags';
import { contactFormSchema } from '~/utils/schema/zodSchema/contactFormSchema';
import { validateAction } from '~/utils/validation';
import { shapeContactFormData } from '~/utils/hubspot.helpers';
import { hubspotFormsApiRequest } from '~/utils/server/hubspot.server';

const schema = contactFormSchema;
type ActionInput = z.infer<typeof schema>;

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
    const canonicalUrl = buildCanonicalUrl({
        canonical: page?.seo?.canonicalUrl,
        request,
    });

    return json({
        page,
        canonicalUrl,
        isPreview,
        query: isPreview ? PAGE_QUERY : null,
    });
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
    const { formData, errors } = await validateAction<ActionInput>({ request, schema });

    if (errors) {
        return json(errors);
    }

    const hubspotContactData = shapeContactFormData(formData);

    const FORM_ID = process.env.CONTACT_FORM_ID;
    const PORTAL_ID = process.env.CONTACT_PORTAL_ID;

    let res;
    try {
        res = await hubspotFormsApiRequest(
            'post',
            `https://api.hsform1s.com/submissions/v3/integration/secure/submit/${PORTAL_ID}/${FORM_ID}`,
            hubspotContactData
        );
    } catch (error) {
        // TODO - Error monitoring e.g. Sentry - Is this something we will be doing and if so where?
        return json({
            // TODO - Don't seem to be able to pass the error message back to front end... 'error' from the catch doesn't actually pull through to front-end, it's just an empty object..!
            errors: { messages: ['Unknown Error, please try again'] },
        });
    }

    if (!res.ok) {
        return {
            errors: {
                statusText: res.statusText,
                messages: ['There was a problem, please try again'],
                status: res.status,
            },
        };
    }

    return { success: true, status: res.status };
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
