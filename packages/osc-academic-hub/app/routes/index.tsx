import { useLoaderData, useLocation, useSubmit } from '@remix-run/react';

import { getColorScheme } from '~/utils/colorScheme';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { FormToggle } from '~/components/FormToggle/FormToggle';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Heading } from '@chakra-ui/react';

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
            <Heading as="h1">This is the index page</Heading>
        </>
    );
}
