import { Form, useLoaderData, useLocation, useSubmit } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { ThemeSwitcher } from '~/components/ThemeSwitcher/ThemeSwitcher';
import { getColorScheme } from '~/utils/colorScheme';

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
        <>
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
                                action: '/actions/changeTheme'
                            });
                        }}
                    />
                </Form>
            )}
            <h1>This is the index page</h1>
        </>
    );
}
