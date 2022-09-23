import { Form } from '@remix-run/react';
import { useLoaderData, useLocation, useSubmit } from '@remix-run/react';

import { getColorScheme } from '~/cookie';
import type { LinksFunction, LoaderFunction } from '@remix-run/server-runtime';
import { FormToggle } from '~/components/FormToggle';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Heading } from '@chakra-ui/react';

import { Tabs } from 'osc-ui';
import oscUiTabStyles from 'osc-ui/dist/tabs.css';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: oscUiTabStyles }];
};

export const loader: LoaderFunction = async ({ request }) => {
    const colorScheme = await getColorScheme(request);
    return { colorScheme };
};

export default function Index() {
    const props = useLoaderData() ?? undefined;
    const colorScheme = props ? props.colorScheme : undefined;
    const submit = useSubmit();
    const location = useLocation();
    return (
        <div>
            <Heading>This is the index page</Heading>
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
